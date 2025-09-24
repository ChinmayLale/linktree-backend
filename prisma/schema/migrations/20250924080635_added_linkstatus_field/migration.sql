-- CreateEnum
CREATE TYPE "LinkStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "status" "LinkStatus" NOT NULL DEFAULT 'DRAFT';
