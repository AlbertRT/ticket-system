/*
  Warnings:

  - You are about to drop the column `credentialId` on the `Credential` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[credentialID]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credentialID` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Credential_credentialId_key";

-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "credentialId",
ADD COLUMN     "credentialID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Credential_credentialID_key" ON "Credential"("credentialID");
