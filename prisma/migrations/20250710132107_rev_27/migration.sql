/*
  Warnings:

  - You are about to drop the column `paymentChannelId` on the `UserPaymentChannel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPaymentChannel" DROP CONSTRAINT "UserPaymentChannel_paymentChannelId_fkey";

-- AlterTable
ALTER TABLE "UserPaymentChannel" DROP COLUMN "paymentChannelId",
ADD COLUMN     "issuer_name" TEXT,
ADD COLUMN     "masked_number" TEXT,
ADD COLUMN     "scheme" TEXT,
ALTER COLUMN "card_expired" SET DATA TYPE TEXT;
