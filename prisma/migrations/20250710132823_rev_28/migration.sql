/*
  Warnings:

  - The values [CARD] on the enum `PaymentCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentCategory_new" AS ENUM ('DEBIT', 'CREDIT', 'BANK_TRANSFER', 'VA', 'QRIS', 'EWALLET');
ALTER TABLE "PaymentChannel" ALTER COLUMN "type" TYPE "PaymentCategory_new" USING ("type"::text::"PaymentCategory_new");
ALTER TABLE "UserPaymentChannel" ALTER COLUMN "type" TYPE "PaymentCategory_new" USING ("type"::text::"PaymentCategory_new");
ALTER TYPE "PaymentCategory" RENAME TO "PaymentCategory_old";
ALTER TYPE "PaymentCategory_new" RENAME TO "PaymentCategory";
DROP TYPE "PaymentCategory_old";
COMMIT;
