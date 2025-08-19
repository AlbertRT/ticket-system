/*
  Warnings:

  - A unique constraint covering the columns `[referal_code]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `member_name` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "member_name" TEXT NOT NULL,
ADD COLUMN     "referal_code" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Member_referal_code_key" ON "Member"("referal_code");
