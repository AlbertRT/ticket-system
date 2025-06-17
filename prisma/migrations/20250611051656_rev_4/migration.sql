/*
  Warnings:

  - You are about to drop the column `customerId` on the `CustomersBooking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `CustomersBooking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `cardName` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `encrypted` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `expiredDate` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `CustomersBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `CustomersBooking` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `CustomersBooking` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ended_at` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_fullybooked` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_promo` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_capacity` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started_at` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_count` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organizationId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joined_at` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPaymentMethodId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_ended_at` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_start_at` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `is_card` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPaymentMethod" DROP CONSTRAINT "UserPaymentMethod_userId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropIndex
DROP INDEX "Organization_userId_key";

-- AlterTable
ALTER TABLE "CustomersBooking" DROP COLUMN "customerId",
DROP COLUMN "paymentId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "payment_status" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
DROP COLUMN "location",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ended_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_fullybooked" BOOLEAN NOT NULL,
ADD COLUMN     "is_promo" BOOLEAN NOT NULL,
ADD COLUMN     "labels" TEXT[],
ADD COLUMN     "max_capacity" INTEGER NOT NULL,
ADD COLUMN     "promo_id" TEXT,
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ticket_count" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "organizationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "joined_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "amount",
DROP COLUMN "createdAt",
DROP COLUMN "status",
ADD COLUMN     "bookingId" TEXT NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "payment_status" TEXT NOT NULL,
ADD COLUMN     "ticketId" TEXT NOT NULL,
ADD COLUMN     "userPaymentMethodId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentMethodId" TEXT NOT NULL,
ADD COLUMN     "sales_ended_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sales_start_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserPaymentMethod" DROP COLUMN "cardName",
DROP COLUMN "cardNumber",
DROP COLUMN "encrypted",
DROP COLUMN "expiredDate",
ADD COLUMN     "bank_name" TEXT,
ADD COLUMN     "card_number" TEXT,
ADD COLUMN     "card_type" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expired_month" INTEGER,
ADD COLUMN     "expired_year" INTEGER,
ADD COLUMN     "is_card" BOOLEAN NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "verification_tokens";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "TicketStatus";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "session_token" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "code" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "valid_thru" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "max_promo_used_per_user" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAnalytics" (
    "id" TEXT NOT NULL,
    "total_event" TEXT NOT NULL,
    "ticket_sold" INTEGER NOT NULL,
    "revenue_per_ticket" DOUBLE PRECISION NOT NULL,
    "total_revenue" DOUBLE PRECISION NOT NULL,
    "tickets_made" INTEGER NOT NULL,
    "customers_total" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,

    CONSTRAINT "EventAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDevice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "session_token" TEXT,
    "device_name" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "last_used_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT,
    "userId" TEXT NOT NULL,
    "is_readed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventAnalytics_eventId_key" ON "EventAnalytics"("eventId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAnalytics" ADD CONSTRAINT "EventAnalytics_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersBooking" ADD CONSTRAINT "CustomersBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersBooking" ADD CONSTRAINT "CustomersBooking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "CustomersBooking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_userPaymentMethodId_fkey" FOREIGN KEY ("userPaymentMethodId") REFERENCES "UserPaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDevice" ADD CONSTRAINT "UserDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
