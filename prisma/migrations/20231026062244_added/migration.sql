/*
  Warnings:

  - You are about to drop the column `total` on the `ProductRequest` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'admin');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Success', 'Rejected');

-- AlterTable
ALTER TABLE "ProductRequest" DROP COLUMN "total",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
