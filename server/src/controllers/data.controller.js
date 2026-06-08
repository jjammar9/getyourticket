import { PrismaClient } from "@prisma/client";

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

// --- LISTINGS ---

export const getListings = async (req, res) => {
  try {
    const { country, category, location, search, limit, offset, sort } = req.query;
    const where = {};

    if (country) where.country = { slug: country };
    if (category) where.category = { slug: category };
    if (location) where.location = { contains: location, mode: "insensitive" };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { extras: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy =
      sort === "price-asc"
        ? { price: "asc" }
        : sort === "price-desc"
          ? { price: "desc" }
          : sort === "rating"
            ? { rating: "desc" }
            : sort === "title"
              ? { title: "asc" }
              : { expId: "asc" };

    const listings = await prisma.listing.findMany({
      where,
      include: { country: true, category: true },
      orderBy,
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined,
    });

    const total = await prisma.listing.count({ where });

    res.json({ listings: listings.map(formatListing), total });
  } catch (error) {
    console.error("getListings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getListingById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({
      where: { expId: id },
      include: { country: true, category: true, reviews: true },
    });

    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.json({ listing: { ...formatListing(listing), reviewItems: listing.reviews } });
  } catch (error) {
    console.error("getListingById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- COUNTRIES ---

export const getCountries = async (req, res) => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" },
    });
    res.json({ countries });
  } catch (error) {
    console.error("getCountries error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCountryBySlug = async (req, res) => {
  try {
    const country = await prisma.country.findUnique({
      where: { slug: req.params.slug },
      include: { listings: { include: { category: true }, orderBy: { expId: "asc" } } },
    });

    if (!country) return res.status(404).json({ message: "Country not found" });

    res.json({
      country: {
        ...country,
        cities: country.cities || [],
        attractions: country.attractions || [],
        guides: country.guides || [],
        listings: country.listings.map(formatListing),
      },
    });
  } catch (error) {
    console.error("getCountryBySlug error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- CATEGORIES ---

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    res.json({ categories });
  } catch (error) {
    console.error("getCategories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- REVIEWS ---

export const getReviews = async (req, res) => {
  try {
    const { expId } = req.query;
    const where = {};
    if (expId) {
      const listing = await prisma.listing.findUnique({ where: { expId: parseInt(expId) } });
      if (listing) where.listingId = listing.id;
    }

    const reviews = await prisma.review.findMany({ where, orderBy: { createdAt: "desc" } });
    res.json({ reviews });
  } catch (error) {
    console.error("getReviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- SITE CONTENT ---

export const getSiteContent = async (req, res) => {
  try {
    const { key } = req.params;
    const content = await prisma.siteContent.findUnique({ where: { key } });
    if (!content) return res.status(404).json({ message: "Content not found" });
    return res.json({ content: { key: content.key, value: content.value } });
  } catch (error) {
    console.error("getSiteContent error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSiteContent = async (req, res) => {
  try {
    const all = await prisma.siteContent.findMany();
    const grouped = {};
    for (const item of all) {
      grouped[item.key] = item.value;
    }
    res.json({ siteContent: grouped });
  } catch (error) {
    console.error("getAllSiteContent error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return res.json({ message: "Already subscribed" });
    }
    await prisma.newsletterSubscriber.create({ data: { email } });
    res.status(201).json({ message: "Subscribed" });
  } catch (error) {
    console.error("subscribeNewsletter error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getListingAvailability = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({ where: { expId: id } });
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    const bookings = await prisma.booking.findMany({
      where: { listingId: listing.id, status: "confirmed" },
      select: { date: true, guests: true },
    });
    res.json({ availability: bookings });
  } catch (error) {
    console.error("getListingAvailability error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
