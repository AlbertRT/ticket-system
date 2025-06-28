/*
  Warnings:

  - A unique constraint covering the columns `[device_token]` on the table `UserDevice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserDevice_device_token_key" ON "UserDevice"("device_token");
