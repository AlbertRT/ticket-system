/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventInvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrgPaymentChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromoCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TicketPaymentChannels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_promo_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventAnalytics" DROP CONSTRAINT "EventAnalytics_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventAnalytics" DROP CONSTRAINT "EventAnalytics_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventInvoice" DROP CONSTRAINT "EventInvoice_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventInvoice" DROP CONSTRAINT "EventInvoice_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrgPaymentChannel" DROP CONSTRAINT "OrgPaymentChannel_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrgPaymentChannel" DROP CONSTRAINT "OrgPaymentChannel_paymentChannelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Organization" DROP CONSTRAINT "Organization_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PaymentHistory" DROP CONSTRAINT "PaymentHistory_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PaymentHistory" DROP CONSTRAINT "PaymentHistory_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TicketPaymentChannels" DROP CONSTRAINT "_TicketPaymentChannels_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TicketPaymentChannels" DROP CONSTRAINT "_TicketPaymentChannels_B_fkey";

-- DropTable
DROP TABLE "public"."Event";

-- DropTable
DROP TABLE "public"."EventAnalytics";

-- DropTable
DROP TABLE "public"."EventInvoice";

-- DropTable
DROP TABLE "public"."Media";

-- DropTable
DROP TABLE "public"."Notification";

-- DropTable
DROP TABLE "public"."OrgPaymentChannel";

-- DropTable
DROP TABLE "public"."Organization";

-- DropTable
DROP TABLE "public"."PaymentChannel";

-- DropTable
DROP TABLE "public"."PromoCode";

-- DropTable
DROP TABLE "public"."Ticket";

-- DropTable
DROP TABLE "public"."_TicketPaymentChannels";

-- DropEnum
DROP TYPE "public"."TicketStatus";
