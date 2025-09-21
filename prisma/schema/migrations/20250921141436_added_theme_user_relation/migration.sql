-- AlterTable
ALTER TABLE "ThemeSettings" ALTER COLUMN "cardPadding" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "themeId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "ThemeSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
