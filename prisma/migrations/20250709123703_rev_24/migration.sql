/*
  Warnings:

  - You are about to drop the column `merchantId` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMerchant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invoiceId` to the `CustomerBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_merchantId_fkey";

-- AlterTable
ALTER TABLE "CustomerBooking" ADD COLUMN     "invoiceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "merchantId";

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "merchantId";

-- DropTable
DROP TABLE "PaymentMerchant";

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentChannel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PaymentCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPaymentChannel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentChannelId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPaymentChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgLegalDocument" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "is_suspended" BOOLEAN NOT NULL DEFAULT false,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrgLegalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventInvoice" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventInvoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerBooking" ADD CONSTRAINT "CustomerBooking_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "EventInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentChannel" ADD CONSTRAINT "UserPaymentChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentChannel" ADD CONSTRAINT "UserPaymentChannel_paymentChannelId_fkey" FOREIGN KEY ("paymentChannelId") REFERENCES "PaymentChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgLegalDocument" ADD CONSTRAINT "OrgLegalDocument_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInvoice" ADD CONSTRAINT "EventInvoice_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInvoice" ADD CONSTRAINT "EventInvoice_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
