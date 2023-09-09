/*
  Warnings:

  - The values [CSE,ECE] on the enum `Branch` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `end` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `students` table. All the data in the column will be lost.
  - Added the required column `website` to the `club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programme` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Programme" AS ENUM ('B', 'M', 'P');

-- AlterEnum
BEGIN;
CREATE TYPE "Branch_new" AS ENUM ('CS', 'EC', 'ME', 'SM', 'DS');
ALTER TABLE "students" ALTER COLUMN "branch" TYPE "Branch_new" USING ("branch"::text::"Branch_new");
ALTER TYPE "Branch" RENAME TO "Branch_old";
ALTER TYPE "Branch_new" RENAME TO "Branch";
DROP TYPE "Branch_old";
COMMIT;

-- DropIndex
DROP INDEX "students_id_key";

-- AlterTable
ALTER TABLE "club" ADD COLUMN     "website" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "programme" "Programme" NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");
