/*
  Warnings:

  - You are about to drop the column `eventMetadataId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `galleryMetadataId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `musicMetadataId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `videoMetadataId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the `EventMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GalleryMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MusicMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_eventMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_galleryMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_musicMetadataId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_videoMetadataId_fkey";

-- DropIndex
DROP INDEX "Link_eventMetadataId_key";

-- DropIndex
DROP INDEX "Link_galleryMetadataId_key";

-- DropIndex
DROP INDEX "Link_musicMetadataId_key";

-- DropIndex
DROP INDEX "Link_videoMetadataId_key";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "eventMetadataId",
DROP COLUMN "galleryMetadataId",
DROP COLUMN "musicMetadataId",
DROP COLUMN "videoMetadataId",
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "metadata" JSONB,
ALTER COLUMN "type" SET DEFAULT 'default',
ALTER COLUMN "color" SET DEFAULT '#000000',
ALTER COLUMN "style" SET DEFAULT 'default',
ALTER COLUMN "clicks" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ThemeSettings" ALTER COLUMN "layout" DROP NOT NULL;

-- DropTable
DROP TABLE "EventMetadata";

-- DropTable
DROP TABLE "GalleryMetadata";

-- DropTable
DROP TABLE "MusicMetadata";

-- DropTable
DROP TABLE "VideoMetadata";

-- DropEnum
DROP TYPE "EventType";

-- CreateIndex
CREATE INDEX "Link_userId_idx" ON "Link"("userId");

-- CreateIndex
CREATE INDEX "Link_type_idx" ON "Link"("type");

-- CreateIndex
CREATE INDEX "Link_active_idx" ON "Link"("active");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
