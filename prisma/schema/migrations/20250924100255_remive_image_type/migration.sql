/*
  Warnings:

  - The values [image] on the enum `LinkType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LinkType_new" AS ENUM ('music', 'video', 'event', 'gallery', 'contact', 'social', 'default');
ALTER TABLE "Link" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Link" ALTER COLUMN "type" TYPE "LinkType_new" USING ("type"::text::"LinkType_new");
ALTER TYPE "LinkType" RENAME TO "LinkType_old";
ALTER TYPE "LinkType_new" RENAME TO "LinkType";
DROP TYPE "LinkType_old";
ALTER TABLE "Link" ALTER COLUMN "type" SET DEFAULT 'default';
COMMIT;
