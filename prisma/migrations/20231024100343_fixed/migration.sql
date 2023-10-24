/*
  Warnings:

  - You are about to drop the column `provice` on the `ProductRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductRequest" DROP COLUMN "provice",
ADD COLUMN     "province" TEXT;
