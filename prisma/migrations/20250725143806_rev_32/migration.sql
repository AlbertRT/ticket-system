/*
  Warnings:

  - The primary key for the `PromoCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_agent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CustomerBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrgLegalDocument` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `PromoCode` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CustomerBooking" DROP CONSTRAINT "CustomerBooking_eventId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerBooking" DROP CONSTRAINT "CustomerBooking_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerBooking" DROP CONSTRAINT "CustomerBooking_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerBooking" DROP CONSTRAINT "CustomerBooking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_promo_id_fkey";

-- DropForeignKey
ALTER TABLE "OrgLegalDocument" DROP CONSTRAINT "OrgLegalDocument_orgId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_bookingId_fkey";

-- AlterTable
ALTER TABLE "PromoCode" DROP CONSTRAINT "PromoCode_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_agent";

-- DropTable
DROP TABLE "CustomerBooking";

-- DropTable
DROP TABLE "OrgLegalDocument";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "PromoCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
