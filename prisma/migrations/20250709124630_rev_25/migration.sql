/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `EventInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "CustomerBooking" ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EventInvoice" ADD COLUMN     "bookingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "paymentMethodId";

-- DropTable
DROP TABLE "PaymentMethod";

-- CreateTable
CREATE TABLE "OrgPaymentChannel" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "paymentChannelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrgPaymentChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TicketPaymentChannels" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TicketPaymentChannels_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TicketPaymentChannels_B_index" ON "_TicketPaymentChannels"("B");

-- AddForeignKey
ALTER TABLE "OrgPaymentChannel" ADD CONSTRAINT "OrgPaymentChannel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgPaymentChannel" ADD CONSTRAINT "OrgPaymentChannel_paymentChannelId_fkey" FOREIGN KEY ("paymentChannelId") REFERENCES "PaymentChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TicketPaymentChannels" ADD CONSTRAINT "_TicketPaymentChannels_A_fkey" FOREIGN KEY ("A") REFERENCES "OrgPaymentChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TicketPaymentChannels" ADD CONSTRAINT "_TicketPaymentChannels_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
