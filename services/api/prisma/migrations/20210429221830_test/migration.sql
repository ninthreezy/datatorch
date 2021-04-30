/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProjectOwner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[login]` on the table `ProjectOwner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `ProjectOwner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERUSER', 'ADMIN', 'MODERATOR', 'USER', 'ANNOTATOR', 'GUEST');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq";

-- AlterTable
ALTER TABLE "ProjectOwner" DROP CONSTRAINT "ProjectOwner_pkey",
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "ProjectOwner_id_seq";

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test.name_unique" ON "Test"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectOwner.login_unique" ON "ProjectOwner"("login");

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("ownerId") REFERENCES "ProjectOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
