/*
  Warnings:

  - You are about to drop the column `deviceName` on the `Credential` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "deviceName",
ADD COLUMN     "deviceId" TEXT;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "UserDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
