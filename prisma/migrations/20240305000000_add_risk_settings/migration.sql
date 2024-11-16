-- CreateTable
CREATE TABLE "RiskSettings" (
    "id" TEXT NOT NULL,
    "stopOutLevel" INTEGER NOT NULL,
    "marginCallLevel" INTEGER NOT NULL,
    "warningLevel" INTEGER NOT NULL,
    "maxPositionSize" JSONB NOT NULL,
    "maxDrawdown" INTEGER NOT NULL,
    "maxLeverage" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "RiskSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RiskSettings_isActive_idx" ON "RiskSettings"("isActive");

-- AddForeignKey
ALTER TABLE "RiskSettings" ADD CONSTRAINT "RiskSettings_updatedBy_fkey" 
FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;