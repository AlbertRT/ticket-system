/*
  Warnings:

  - You are about to drop the column `is_card` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `iv` on the `UserPaymentMethod` table. All the data in the column will be lost.
  - You are about to alter the column `card_number` on the `UserPaymentMethod` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - Changed the type of `payment_status` on the `CustomersBooking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `payment_status` on the `PaymentHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `is_card_payment` to the `UserPaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED');

-- AlterTable
ALTER TABLE "CustomersBooking" DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "UserPaymentMethod" DROP COLUMN "is_card",
DROP COLUMN "iv",
ADD COLUMN     "is_card_payment" BOOLEAN NOT NULL,
ALTER COLUMN "card_number" SET DATA TYPE VARCHAR(512);
