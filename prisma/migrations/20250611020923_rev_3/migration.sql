/*
  Warnings:

  - You are about to drop the column `booking_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `gov_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `ended_at` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `is_fullybooked` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `is_promo` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `labels` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `max_capacity` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `organizer` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `promo_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `started_at` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `tickets_count` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `joined_at` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method_id` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `promo_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `sales_ended_at` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `sales_start_at` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Ticket` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `bank_name` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `card_type` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `expired_month` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `expired_year` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `is_card` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the `CustomerBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromoCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardName` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardNumber` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredDate` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomerBooking" DROP CONSTRAINT "CustomerBooking_event_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomerBooking" DROP CONSTRAINT "CustomerBooking_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomerBooking" DROP CONSTRAINT "CustomerBooking_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_promo_id_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_payment_method_id_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_payment_method_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_promo_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPaymentMethod" DROP CONSTRAINT "UserPaymentMethod_user_id_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "booking_id",
DROP COLUMN "first_name",
DROP COLUMN "gender",
DROP COLUMN "gov_id",
DROP COLUMN "last_name",
DROP COLUMN "phone",
DROP COLUMN "user_id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "ended_at",
DROP COLUMN "is_fullybooked",
DROP COLUMN "is_promo",
DROP COLUMN "labels",
DROP COLUMN "max_capacity",
DROP COLUMN "organization_id",
DROP COLUMN "organizer",
DROP COLUMN "promo_id",
DROP COLUMN "started_at",
DROP COLUMN "tickets_count",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "organizerId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "joined_at",
DROP COLUMN "location",
DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "booking_id",
DROP COLUMN "event_id",
DROP COLUMN "payment_method_id",
DROP COLUMN "payment_status",
DROP COLUMN "ticket_id",
DROP COLUMN "user_id",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "PaymentStatus" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "event_id",
DROP COLUMN "name",
DROP COLUMN "payment_method_id",
DROP COLUMN "promo_id",
DROP COLUMN "sales_ended_at",
DROP COLUMN "sales_start_at",
DROP COLUMN "total_price",
ADD COLUMN     "eventId" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "UserPaymentMethod" DROP COLUMN "bank_name",
DROP COLUMN "card_number",
DROP COLUMN "card_type",
DROP COLUMN "created_at",
DROP COLUMN "expired_month",
DROP COLUMN "expired_year",
DROP COLUMN "is_card",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "cardName" TEXT NOT NULL,
ADD COLUMN     "cardNumber" TEXT NOT NULL,
ADD COLUMN     "encrypted" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "expiredDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CustomerBooking";

-- DropTable
DROP TABLE "PaymentMethod";

-- DropTable
DROP TABLE "PromoCode";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomersBooking" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "paymentId" TEXT,
    "userId" TEXT,

    CONSTRAINT "CustomersBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_userId_key" ON "Organization"("userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersBooking" ADD CONSTRAINT "CustomersBooking_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersBooking" ADD CONSTRAINT "CustomersBooking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersBooking" ADD CONSTRAINT "CustomersBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersBooking" ADD CONSTRAINT "CustomersBooking_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
