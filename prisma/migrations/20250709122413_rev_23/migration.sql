/*
  Warnings:

  - You are about to drop the column `credentialID` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `expired_month` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `expired_year` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the `CustomersBooking` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[credentialId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credentialId` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `PaymentMethod` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `UserPaymentMethod` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('AVAILABLE', 'SOLD_OUT', 'INACTIVE');

-- CreateEnum
CREATE TYPE "PaymentCategory" AS ENUM ('CARD', 'VA', 'QRIS', 'EWALLET');

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_eventId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_bookingId_fkey";

-- DropIndex
DROP INDEX "Credential_credentialID_key";

-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "credentialID",
ADD COLUMN     "credentialId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "type",
ADD COLUMN     "type" "PaymentCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "status",
ADD COLUMN     "status" "TicketStatus" NOT NULL;

-- AlterTable
ALTER TABLE "UserPaymentMethod" DROP COLUMN "expired_month",
DROP COLUMN "expired_year",
ADD COLUMN     "expiryMonth" INTEGER,
ADD COLUMN     "expiryYear" INTEGER,
DROP COLUMN "type",
ADD COLUMN     "type" "PaymentCategory" NOT NULL;

-- DropTable
DROP TABLE "CustomersBooking";

-- CreateTable
CREATE TABLE "CustomerBooking" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_credentialId_key" ON "Credential"("credentialId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "PromoCode"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAnalytics" ADD CONSTRAINT "EventAnalytics_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerBooking" ADD CONSTRAINT "CustomerBooking_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerBooking" ADD CONSTRAINT "CustomerBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerBooking" ADD CONSTRAINT "CustomerBooking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "CustomerBooking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
