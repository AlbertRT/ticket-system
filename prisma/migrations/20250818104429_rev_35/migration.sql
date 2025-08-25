/*
  Warnings:

  - The values [BASIC,WORLD] on the enum `MemberTier` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberTier_new" AS ENUM ('CLASSIC', 'PLATINUM', 'SIGNATURE', 'INFINTE', 'WORLD_ELITE');
ALTER TABLE "Member" ALTER COLUMN "tier" DROP DEFAULT;
ALTER TABLE "Member" ALTER COLUMN "tier" TYPE "MemberTier_new" USING ("tier"::text::"MemberTier_new");
ALTER TYPE "MemberTier" RENAME TO "MemberTier_old";
ALTER TYPE "MemberTier_new" RENAME TO "MemberTier";
DROP TYPE "MemberTier_old";
ALTER TABLE "Member" ALTER COLUMN "tier" SET DEFAULT 'CLASSIC';
COMMIT;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "tier" SET DEFAULT 'CLASSIC';
