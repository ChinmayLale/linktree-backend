/*
  Warnings:

  - You are about to drop the column `backDropBlur` on the `ThemeSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ThemeSettings" DROP COLUMN "backDropBlur",
ADD COLUMN     "backdropBlur" TEXT NOT NULL DEFAULT '0px';
