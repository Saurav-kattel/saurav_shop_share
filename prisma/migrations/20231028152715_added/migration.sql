/*
  Warnings:

  - Added the required column `price` to the `ProductRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductRequest" ADD COLUMN     "price" TEXT NOT NULL;
