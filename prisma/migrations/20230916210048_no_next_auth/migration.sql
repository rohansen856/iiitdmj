/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon` to the `club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "club" ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "roll" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "year" INTEGER,
ALTER COLUMN "semester" DROP NOT NULL,
ALTER COLUMN "branch" DROP NOT NULL,
ALTER COLUMN "group" DROP NOT NULL,
ALTER COLUMN "programme" DROP NOT NULL;

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification_tokens";
