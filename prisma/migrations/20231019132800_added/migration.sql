/*
  Warnings:

  - Added the required column `name` to the `Colors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Colors" ADD COLUMN     "name" TEXT NOT NULL;
