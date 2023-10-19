/*
  Warnings:

  - You are about to drop the `Variants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Variants" DROP CONSTRAINT "Variants_productId_fkey";

-- DropTable
DROP TABLE "Variants";

-- CreateTable
CREATE TABLE "Colors" (
    "id" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Colors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Colors" ADD CONSTRAINT "Colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
