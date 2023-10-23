/*
  Warnings:

  - You are about to drop the column `qunatityId` on the `ProductRequest` table. All the data in the column will be lost.
  - Added the required column `quantityId` to the `ProductRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductRequest" DROP COLUMN "qunatityId",
ADD COLUMN     "quantityId" TEXT NOT NULL;
