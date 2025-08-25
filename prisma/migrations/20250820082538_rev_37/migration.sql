-- CreateEnum
CREATE TYPE "public"."UserDefaultVerificationMethod" AS ENUM ('BIOMETRIC', 'PIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "default_verification" "public"."UserDefaultVerificationMethod";

-- CreateTable
CREATE TABLE "public"."PinBlocks" (
    "id" TEXT NOT NULL,
    "blocks" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PinBlocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PinBlocks_userId_key" ON "public"."PinBlocks"("userId");

-- AddForeignKey
ALTER TABLE "public"."PinBlocks" ADD CONSTRAINT "PinBlocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
