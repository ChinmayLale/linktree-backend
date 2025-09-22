/*
  Warnings:

  - The values [SOLID,GRADIENT,IMAGE,GLASS] on the enum `BackgroundType` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `cardPadding` on table `ThemeSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BackgroundType_new" AS ENUM ('solid', 'gradient', 'image', 'glass');
ALTER TABLE "ThemeSettings" ALTER COLUMN "backgroundType" TYPE "BackgroundType_new" USING ("backgroundType"::text::"BackgroundType_new");
ALTER TYPE "BackgroundType" RENAME TO "BackgroundType_old";
ALTER TYPE "BackgroundType_new" RENAME TO "BackgroundType";
DROP TYPE "BackgroundType_old";
COMMIT;

-- AlterTable
ALTER TABLE "ThemeSettings" ALTER COLUMN "name" SET DEFAULT 'clean',
ALTER COLUMN "backgroundColor" SET DEFAULT '#ffffff',
ALTER COLUMN "backgroundType" SET DEFAULT 'solid',
ALTER COLUMN "primaryColor" SET DEFAULT '#2563eb',
ALTER COLUMN "textColor" SET DEFAULT '#111827',
ALTER COLUMN "secondaryText" SET DEFAULT '#6b7280',
ALTER COLUMN "fontFamily" SET DEFAULT 'Inter, sans-serif',
ALTER COLUMN "borderRadius" SET DEFAULT 8,
ALTER COLUMN "cardStyle" SET DEFAULT 'clean',
ALTER COLUMN "layout" SET DEFAULT 'GRID',
ALTER COLUMN "cardBackground" SET DEFAULT '#ffffff',
ALTER COLUMN "cardBorderColor" SET DEFAULT '#e5e7eb',
ALTER COLUMN "cardShadow" SET DEFAULT '0 1px 3px rgba(0, 0, 0, 0.1)',
ALTER COLUMN "cardPadding" SET NOT NULL,
ALTER COLUMN "cardPadding" SET DEFAULT '16px',
ALTER COLUMN "cardBorder" SET DEFAULT '#e5e7eb',
ALTER COLUMN "backDropBlur" SET DEFAULT '0px',
ALTER COLUMN "shadow" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "themeId" SET DEFAULT 'clean';
