-- CreateTable
CREATE TABLE "Market" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Market_symbol_key" ON "Market"("symbol");

-- CreateIndex
CREATE INDEX "Market_isActive_idx" ON "Market"("isActive");