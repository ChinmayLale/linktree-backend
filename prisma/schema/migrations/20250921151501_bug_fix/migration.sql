/*
  Warnings:

  - The values [STACK,GRID,MASONRY] on the enum `CardLayout` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardLayout_new" AS ENUM ('stack', 'grid', 'masonry');
ALTER TABLE "ThemeSettings" ALTER COLUMN "layout" DROP DEFAULT;
ALTER TABLE "ThemeSettings" ALTER COLUMN "layout" TYPE "CardLayout_new" USING ("layout"::text::"CardLayout_new");
ALTER TYPE "CardLayout" RENAME TO "CardLayout_old";
ALTER TYPE "CardLayout_new" RENAME TO "CardLayout";
DROP TYPE "CardLayout_old";
ALTER TABLE "ThemeSettings" ALTER COLUMN "layout" SET DEFAULT 'grid';
COMMIT;

-- AlterTable
ALTER TABLE "ThemeSettings" ALTER COLUMN "layout" SET DEFAULT 'grid';
