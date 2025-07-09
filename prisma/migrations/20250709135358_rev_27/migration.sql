-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "UserDevice" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
