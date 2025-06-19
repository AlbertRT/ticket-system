/*
  Warnings:

  - Added the required column `challenge` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "challenge" TEXT NOT NULL;
