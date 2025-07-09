/*
  Warnings:

  - You are about to drop the column `userPaymentMethodId` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the `UserPaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userPaymentChannelId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `UserPaymentChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserPaymentChannel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_userPaymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "UserPaymentMethod" DROP CONSTRAINT "UserPaymentMethod_userId_fkey";

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "userPaymentMethodId",
ADD COLUMN     "userPaymentChannelId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserPaymentChannel" ADD COLUMN     "card_expired" TIMESTAMP(3),
ADD COLUMN     "design" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "type" "PaymentCategory" NOT NULL;

-- DropTable
DROP TABLE "UserPaymentMethod";

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_userPaymentChannelId_fkey" FOREIGN KEY ("userPaymentChannelId") REFERENCES "UserPaymentChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
