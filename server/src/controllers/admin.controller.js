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
    countryId: l.countryId,
    categoryId: l.categoryId,
  };
}

// --- LISTINGS ---

export const getAdminListings = async (req, res) => {
  try {
    const { offset, limit, search } = req.query;
    const take = Math.min(parseInt(limit) || 50, 100);
    const skip = parseInt(offset) || 0;
    const where = search ? {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ],
    } : {};
    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take,
        include: { country: true, category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.listing.count({ where }),
    ]);
    res.json({ listings: listings.map(formatListing), total });
  } catch (error) {
    console.error("getAdminListings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createListing = async (req, res) => {
  try {
    const data = req.body;
    const maxExp = await prisma.listing.findFirst({ orderBy: { expId: "desc" } });
    const listing = await prisma.listing.create({
      data: {
        expId: (maxExp?.expId || 0) + 1,
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
        title: data.title,
        description: data.description || "",
        badge: data.badge || null,
        images: data.images || [],
        gallery: data.gallery || [],
        price: parseFloat(data.price) || 0,
        oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
        duration: data.duration || null,
        location: data.location || null,
        extras: data.extras || null,
        rating: data.rating ? parseFloat(data.rating) : null,
        reviewsCount: data.reviewsCount ? parseInt(data.reviewsCount) : 0,
        highlights: data.highlights || [],
        included: data.included || [],
        meetingPoint: data.meetingPoint || null,
        cancellationPolicy: data.cancellationPolicy || null,
        countryId: data.countryId,
        categoryId: data.categoryId,
      },
      include: { country: true, category: true },
    });
    res.status(201).json({ listing: formatListing(listing) });
  } catch (error) {
    console.error("createListing error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateListing = async (req, res) => {
  try {
    const expId = parseInt(req.params.id);
    const data = req.body;
    const updateData = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.badge !== undefined) updateData.badge = data.badge;
    if (data.images !== undefined) updateData.images = data.images;
    if (data.gallery !== undefined) updateData.gallery = data.gallery;
    if (data.price !== undefined) updateData.price = parseFloat(data.price);
    if (data.oldPrice !== undefined) updateData.oldPrice = data.oldPrice ? parseFloat(data.oldPrice) : null;
    if (data.duration !== undefined) updateData.duration = data.duration;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.extras !== undefined) updateData.extras = data.extras;
    if (data.highlights !== undefined) updateData.highlights = data.highlights;
    if (data.included !== undefined) updateData.included = data.included;
    if (data.meetingPoint !== undefined) updateData.meetingPoint = data.meetingPoint;
    if (data.cancellationPolicy !== undefined) updateData.cancellationPolicy = data.cancellationPolicy;
    if (data.countryId !== undefined) updateData.countryId = data.countryId;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    const listing = await prisma.listing.update({
      where: { expId },
      data: updateData,
      include: { country: true, category: true },
    });
    res.json({ listing: formatListing(listing) });
  } catch (error) {
    console.error("updateListing error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const expId = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({ where: { expId } });
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    await prisma.listing.delete({ where: { expId } });
    res.json({ message: "Listing deleted" });
  } catch (error) {
    console.error("deleteListing error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- USERS ---

export const getAdminUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ users });
  } catch (error) {
    console.error("getAdminUsers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["customer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });
    res.json({ user });
  } catch (error) {
    console.error("updateUserRole error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("deleteUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- SITE CONTENT ---

export const updateSiteContent = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const content = await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    res.json({ content });
  } catch (error) {
    console.error("updateSiteContent error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
