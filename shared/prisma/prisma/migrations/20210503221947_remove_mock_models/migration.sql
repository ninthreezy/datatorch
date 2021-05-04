-- CreateTable
CREATE TABLE "TestModel" (
    "id" TEXT NOT NULL,
    "testField" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestModel.testField_unique" ON "TestModel"("testField");
