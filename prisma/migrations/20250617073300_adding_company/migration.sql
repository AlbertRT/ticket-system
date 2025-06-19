/*
  Warnings:

  - Added the required column `company` to the `PaymentMerchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentMerchant" ADD COLUMN     "company" TEXT NOT NULL;
