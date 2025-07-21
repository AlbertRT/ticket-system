/*
  Warnings:

  - You are about to drop the column `issuer_name` on the `UserPaymentChannel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPaymentChannel" DROP COLUMN "issuer_name",
ADD COLUMN     "issuer_bank" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "tier" TEXT;
