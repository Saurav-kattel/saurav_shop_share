/*
  Warnings:

  - Made the column `productId` on table `Variants` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Variants" DROP CONSTRAINT "Variants_productId_fkey";

-- AlterTable
ALTER TABLE "Variants" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Variants" ADD CONSTRAINT "Variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
