/*
  Warnings:

  - You are about to drop the column `color` on the `ProductRequest` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductRequest` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProductRequest` table. All the data in the column will be lost.
  - Made the column `productId` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userEmail` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zipcode` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cartId` on table `ProductRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Qunatity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductRequest" DROP COLUMN "color",
DROP COLUMN "price",
DROP COLUMN "size",
ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "userEmail" SET NOT NULL,
ALTER COLUMN "zipcode" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "province" SET NOT NULL,
ALTER COLUMN "cartId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Qunatity" ALTER COLUMN "size" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductRequest" ADD CONSTRAINT "ProductRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
