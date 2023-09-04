-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('THEORY', 'TUTORIAL', 'LAB');

-- CreateEnum
CREATE TYPE "Group" AS ENUM ('A', 'B');

-- CreateTable
CREATE TABLE "Routine" (
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

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Routine_subject_code_key" ON "Routine"("subject_code");

-- CreateIndex
CREATE UNIQUE INDEX "Routine_subject_name_key" ON "Routine"("subject_name");
