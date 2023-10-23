/*
  Warnings:

  - You are about to drop the column `colorId` on the `ProductRequest` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `ProductRequest` table. All the data in the column will be lost.
  - Added the required column `qunatityId` to the `ProductRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductRequest" DROP COLUMN "colorId",
DROP COLUMN "sizeId",
ADD COLUMN     "qunatityId" TEXT NOT NULL;
