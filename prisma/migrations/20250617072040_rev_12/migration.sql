/*
  Warnings:

  - Added the required column `merchantId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentHistory" ADD COLUMN     "merchantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "merchantId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "PaymentMerchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "PaymentMerchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
