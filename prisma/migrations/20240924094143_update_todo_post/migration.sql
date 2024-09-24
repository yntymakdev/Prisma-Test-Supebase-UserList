/*
  Warnings:

  - You are about to drop the column `creatAr` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "creatAr",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
