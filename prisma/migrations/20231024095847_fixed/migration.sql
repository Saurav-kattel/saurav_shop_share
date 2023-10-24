/*
  Warnings:

  - You are about to drop the column `lasname` on the `ProductRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductRequest" DROP COLUMN "lasname",
ADD COLUMN     "lastname" TEXT;
