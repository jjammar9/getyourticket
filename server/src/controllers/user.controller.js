import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import generateToken from "../utils/generateToken.js";

const prisma = new PrismaClient();

function formatListing(l) {
  return {
    id: l.expId,
    slug: l.slug,
    title: l.title,
    description: l.description,
    badge: l.badge,
    image: l.images?.[0] || null,
    images: l.images,
    gallery: l.gallery,
    price: l.price,
    oldPrice: l.oldPrice,
    duration: l.duration,
    location: l.location,
    extras: l.extras,
    rating: l.rating,
    reviews: l.reviewsCount,
    reviewsCount: l.reviewsCount,
    highlights: l.highlights,
    included: l.included,
    meetingPoint: l.meetingPoint,
    cancellationPolicy: l.cancellationPolicy,
    category: l.category?.slug || null,
    categoryName: l.category?.name || null,
  };
}

// --- PROFILE ---

export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(password, salt);
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
      select: { id: true, name: true, email: true, avatar: true, role: true },
    });

    const token = generateToken(user);

    res.json({ user, token });
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- WISHLIST LISTS ---

export const getWishlistLists = async (req, res) => {
  try {
    const lists = await prisma.wishlistList.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { listing: { include: { category: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    res.json({
      lists: lists.map((list) => ({
        id: list.id,
        name: list.name,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
        itemCount: list.items.length,
        previewImage: list.items[0]?.listing?.images?.[0] || null,
        previewLocation: list.items[0]?.listing?.location || null,
        items: list.items.map((item) => ({
          id: item.id,
          listingId: item.listingId,
          createdAt: item.createdAt,
          listing: formatListing(item.listing),
        })),
      })),
    });
  } catch (error) {
    console.error("getWishlistLists error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWishlistList = async (req, res) => {
  try {
    const list = await prisma.wishlistList.findFirst({
      where: { id: req.params.id, userId: req.user.id },
      include: {
        items: {
          include: { listing: { include: { category: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json({
      list: {
        id: list.id,
        name: list.name,
        createdAt: list.createdAt,
        updatedAt: list.updatedAt,
        itemCount: list.items.length,
        items: list.items.map((item) => ({
          id: item.id,
          listingId: item.listingId,
          createdAt: item.createdAt,
          listing: formatListing(item.listing),
        })),
      },
    });
  } catch (error) {
    console.error("getWishlistList error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createWishlistList = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "List name is required" });
    }

    const list = await prisma.wishlistList.create({
      data: { name: name.trim(), userId: req.user.id },
    });

    res.status(201).json({ list });
  } catch (error) {
    console.error("createWishlistList error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteWishlistList = async (req, res) => {
  try {
    const list = await prisma.wishlistList.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    await prisma.wishlistItem.deleteMany({ where: { wishlistListId: list.id } });
    await prisma.wishlistList.delete({ where: { id: list.id } });

    res.json({ message: "List deleted" });
  } catch (error) {
    console.error("deleteWishlistList error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- WISHLIST ITEMS ---

export const addToWishlistList = async (req, res) => {
  try {
    const { listingId } = req.body;
    const { listId } = req.params;

    const list = await prisma.wishlistList.findFirst({
      where: { id: listId, userId: req.user.id },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const listing = await prisma.listing.findUnique({
      where: { expId: parseInt(listingId) },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: { wishlistListId_listingId: { wishlistListId: listId, listingId: listing.id } },
    });

    if (existing) {
      return res.status(400).json({ message: "Already in this list" });
    }

    const item = await prisma.wishlistItem.create({
      data: { wishlistListId: listId, listingId: listing.id },
    });

    res.status(201).json({ wishlistItem: item });
  } catch (error) {
    console.error("addToWishlistList error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromWishlistList = async (req, res) => {
  try {
    const { listId, listingId } = req.params;

    const list = await prisma.wishlistList.findFirst({
      where: { id: listId, userId: req.user.id },
    });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const listing = await prisma.listing.findUnique({
      where: { expId: parseInt(listingId) },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const item = await prisma.wishlistItem.findUnique({
      where: { wishlistListId_listingId: { wishlistListId: listId, listingId: listing.id } },
    });

    if (!item) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    await prisma.wishlistItem.delete({ where: { id: item.id } });

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error("removeFromWishlistList error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- BOOKINGS ---

export const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { listing: { include: { category: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      bookings: bookings.map((b) => ({
        id: b.id,
        listingId: b.listingId,
        date: b.date,
        guests: b.guests,
        totalPrice: b.totalPrice,
        status: b.status,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
        listing: formatListing(b.listing),
      })),
    });
  } catch (error) {
    console.error("getBookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { listingId, date, guests } = req.body;

    if (!listingId || !date || !guests) {
      return res.status(400).json({ message: "listingId, date, and guests are required" });
    }

    const listing = await prisma.listing.findUnique({
      where: { expId: parseInt(listingId) },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const totalPrice = listing.price * parseInt(guests);

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        listingId: listing.id,
        date,
        guests: parseInt(guests),
        totalPrice,
      },
    });

    res.status(201).json({ booking });
  } catch (error) {
    console.error("createBooking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const updated = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status: "cancelled" },
    });

    res.json({ booking: updated });
  } catch (error) {
    console.error("cancelBooking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- REVIEWS ---

export const createReview = async (req, res) => {
  try {
    const { listingId, rating, text } = req.body;

    if (!listingId || !rating || !text) {
      return res.status(400).json({ message: "listingId, rating, and text are required" });
    }

    const listing = await prisma.listing.findUnique({
      where: { expId: parseInt(listingId) },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const review = await prisma.review.create({
      data: {
        listingId: listing.id,
        userId: req.user.id,
        name: req.user.name,
        date: new Date().toISOString().split("T")[0],
        rating: parseInt(rating),
        text,
      },
    });

    res.status(201).json({ review });
  } catch (error) {
    console.error("createReview error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
