/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `UserPaymentChannel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPaymentChannel" DROP COLUMN "expiredAt";
