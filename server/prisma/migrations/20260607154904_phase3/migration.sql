/*
  Warnings:

  - You are about to drop the column `includes` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "attractions" JSONB,
ADD COLUMN     "cities" JSONB,
ADD COLUMN     "guides" JSONB;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "includes",
ADD COLUMN     "badge" TEXT,
ADD COLUMN     "extras" TEXT,
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "included" TEXT[],
ADD COLUMN     "meetingPoint" TEXT,
ADD COLUMN     "oldPrice" DOUBLE PRECISION,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviewsCount" INTEGER,
ALTER COLUMN "duration" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteContent_key_key" ON "SiteContent"("key");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
