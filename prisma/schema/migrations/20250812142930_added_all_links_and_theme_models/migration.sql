-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('concert', 'conference', 'meetup');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('music', 'video', 'event', 'gallery', 'contact', 'social', 'default');

-- CreateEnum
CREATE TYPE "BackgroundType" AS ENUM ('SOLID', 'GRADIENT', 'IMAGE', 'GLASS');

-- CreateEnum
CREATE TYPE "CardLayout" AS ENUM ('STACK', 'GRID', 'MASONRY');

-- CreateTable
CREATE TABLE "EventMetadata" (
    "id" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "EventMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryMetadata" (
    "id" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "GalleryMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "type" "LinkType" NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "style" TEXT NOT NULL,
    "thumbnail" TEXT,
    "clicks" INTEGER,
    "musicMetadataId" TEXT NOT NULL,
    "videoMetadataId" TEXT NOT NULL,
    "eventMetadataId" TEXT NOT NULL,
    "galleryMetadataId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicMetadata" (
    "id" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "duration" TEXT,

    CONSTRAINT "MusicMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThemeSettings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "backgroundType" "BackgroundType" NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "secondaryText" TEXT NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "borderRadius" INTEGER NOT NULL,
    "cardStyle" TEXT NOT NULL,
    "layout" "CardLayout" NOT NULL,
    "cardBackground" TEXT NOT NULL,
    "cardBorderColor" TEXT NOT NULL,
    "cardShadow" TEXT NOT NULL,
    "cardPadding" TEXT NOT NULL,
    "cardBorder" TEXT NOT NULL,
    "backDropBlur" TEXT NOT NULL,
    "shadow" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThemeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoMetadata" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "duration" TEXT,
    "embedUrl" TEXT,

    CONSTRAINT "VideoMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_musicMetadataId_key" ON "Link"("musicMetadataId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_videoMetadataId_key" ON "Link"("videoMetadataId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_eventMetadataId_key" ON "Link"("eventMetadataId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_galleryMetadataId_key" ON "Link"("galleryMetadataId");

-- CreateIndex
CREATE UNIQUE INDEX "ThemeSettings_name_key" ON "ThemeSettings"("name");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_musicMetadataId_fkey" FOREIGN KEY ("musicMetadataId") REFERENCES "MusicMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_videoMetadataId_fkey" FOREIGN KEY ("videoMetadataId") REFERENCES "VideoMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_eventMetadataId_fkey" FOREIGN KEY ("eventMetadataId") REFERENCES "EventMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_galleryMetadataId_fkey" FOREIGN KEY ("galleryMetadataId") REFERENCES "GalleryMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
