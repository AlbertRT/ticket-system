-- CreateEnum
CREATE TYPE "MerchantType" AS ENUM ('BANK', 'EWALLET');

-- CreateTable
CREATE TABLE "PaymentMerchant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MerchantType" NOT NULL,
    "logo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentMerchant_pkey" PRIMARY KEY ("id")
);
