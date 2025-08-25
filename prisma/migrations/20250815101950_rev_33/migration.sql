-- CreateEnum
CREATE TYPE "MemberTier" AS ENUM ('BASIC', 'PLATINUM', 'SIGNATURE', 'INFINTE', 'WORLD', 'WORLD_ELITE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_member" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "member_number" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "joined_since" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tier" "MemberTier" NOT NULL DEFAULT 'BASIC',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_member_number_key" ON "Member"("member_number");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
