/*
  Warnings:

  - You are about to drop the `Routine` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('CSE', 'ECE', 'ME', 'SM', 'DS');

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropTable
DROP TABLE "Routine";

-- CreateTable
CREATE TABLE "routine" (
    "id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "subject_code" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "group" "Group" NOT NULL,
    "day" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "room" TEXT NOT NULL,
    "type" "SubjectType" NOT NULL,

    CONSTRAINT "routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coordinator" JSONB NOT NULL,
    "cocoordinator" JSONB,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "semester" INTEGER NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "branch" "Branch" NOT NULL,
    "group" "Group" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "club_title_key" ON "club"("title");

-- CreateIndex
CREATE UNIQUE INDEX "students_id_key" ON "students"("id");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
