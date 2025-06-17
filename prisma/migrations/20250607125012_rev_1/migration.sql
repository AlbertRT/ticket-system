/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethodId` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PromoCode` table. All the data in the column will be lost.
  - You are about to drop the column `maxPromoUsedPerUser` on the `PromoCode` table. All the data in the column will be lost.
  - You are about to drop the column `validThru` on the `PromoCode` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `cardType` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `expiredMonth` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `expiredYear` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `isCard` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the `Customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomersBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joined_at` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_id` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method_id` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_id` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `PromoCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_promo_used_per_user` to the `PromoCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_thru` to the `PromoCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_name` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_number` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_type` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired_month` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired_year` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_card` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_eventId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersBooking" DROP CONSTRAINT "CustomersBooking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_promoCodeId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_eventId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_promoId_fkey";

-- DropForeignKey
ALTER TABLE "UserPaymentMethod" DROP CONSTRAINT "UserPaymentMethod_userId_fkey";

-- DropIndex
DROP INDEX "PromoCode_code_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "createdAt",
DROP COLUMN "joinedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "joined_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "bookingId",
DROP COLUMN "eventId",
DROP COLUMN "paymentMethodId",
DROP COLUMN "paymentStatus",
DROP COLUMN "ticketId",
DROP COLUMN "userId",
ADD COLUMN     "booking_id" TEXT NOT NULL,
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "payment_method_id" TEXT NOT NULL,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL,
ADD COLUMN     "ticket_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PromoCode" DROP COLUMN "createdAt",
DROP COLUMN "maxPromoUsedPerUser",
DROP COLUMN "validThru",
ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "max_promo_used_per_user" INTEGER NOT NULL,
ADD COLUMN     "valid_thru" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserPaymentMethod" DROP COLUMN "bankName",
DROP COLUMN "cardNumber",
DROP COLUMN "cardType",
DROP COLUMN "createdAt",
DROP COLUMN "expiredMonth",
DROP COLUMN "expiredYear",
DROP COLUMN "isCard",
DROP COLUMN "userId",
ADD COLUMN     "bank_name" TEXT NOT NULL,
ADD COLUMN     "card_number" TEXT NOT NULL,
ADD COLUMN     "card_type" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expired_month" INTEGER NOT NULL,
ADD COLUMN     "expired_year" INTEGER NOT NULL,
ADD COLUMN     "is_card" BOOLEAN NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Customers";

-- DropTable
DROP TABLE "CustomersBooking";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "Tickets";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tickets_count" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "organizer" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3) NOT NULL,
    "promo_id" TEXT,
    "is_fullybooked" BOOLEAN NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "is_promo" BOOLEAN NOT NULL,
    "labels" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "sales_start_at" TIMESTAMP(3) NOT NULL,
    "sales_ended_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "event_id" TEXT NOT NULL,
    "promo_id" TEXT,
    "payment_method_id" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "gov_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "booking_id" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerBooking" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "CustomerBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "PromoCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "PromoCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerBooking" ADD CONSTRAINT "CustomerBooking_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerBooking" ADD CONSTRAINT "CustomerBooking_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerBooking" ADD CONSTRAINT "CustomerBooking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
