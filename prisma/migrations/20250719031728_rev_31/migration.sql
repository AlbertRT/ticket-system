/*
  Warnings:

  - The values [BANK_TRANSFER] on the enum `PaymentCategory` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `card_expired` on table `UserPaymentChannel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `masked_number` on table `UserPaymentChannel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scheme` on table `UserPaymentChannel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `issuer_bank` on table `UserPaymentChannel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo` on table `UserPaymentChannel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tier` on table `UserPaymentChannel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentCategory_new" AS ENUM ('DEBIT', 'CREDIT', 'VA', 'QRIS', 'EWALLET');
ALTER TABLE "PaymentChannel" ALTER COLUMN "type" TYPE "PaymentCategory_new" USING ("type"::text::"PaymentCategory_new");
ALTER TABLE "UserPaymentChannel" ALTER COLUMN "type" TYPE "PaymentCategory_new" USING ("type"::text::"PaymentCategory_new");
ALTER TYPE "PaymentCategory" RENAME TO "PaymentCategory_old";
ALTER TYPE "PaymentCategory_new" RENAME TO "PaymentCategory";
DROP TYPE "PaymentCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserPaymentChannel" ALTER COLUMN "card_expired" SET NOT NULL,
ALTER COLUMN "masked_number" SET NOT NULL,
ALTER COLUMN "scheme" SET NOT NULL,
ALTER COLUMN "issuer_bank" SET NOT NULL,
ALTER COLUMN "logo" SET NOT NULL,
ALTER COLUMN "tier" SET NOT NULL;

-- DropEnum
DROP TYPE "MerchantType";
