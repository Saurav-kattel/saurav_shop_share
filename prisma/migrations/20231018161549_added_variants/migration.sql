-- CreateTable
CREATE TABLE "Variants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Variants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Variants" ADD CONSTRAINT "Variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
