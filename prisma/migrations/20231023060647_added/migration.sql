/*
  Warnings:

  - Added the required column `colorId` to the `ProductRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `ProductRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductRequest" ADD COLUMN     "colorId" TEXT NOT NULL,
ADD COLUMN     "sizeId" TEXT NOT NULL;
