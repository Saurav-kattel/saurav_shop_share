-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DEFAULT 'general';

-- CreateTable
CREATE TABLE "ProductRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "requestedQuantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductRequest_pkey" PRIMARY KEY ("id")
);
