/*
  Warnings:

  - You are about to drop the column `userId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `ctr` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `linksCount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `totalClicks` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "ctr",
DROP COLUMN "linksCount",
DROP COLUMN "themeId",
DROP COLUMN "totalClicks";

-- DropTable
DROP TABLE "pages";
