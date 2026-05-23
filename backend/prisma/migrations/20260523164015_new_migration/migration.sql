-- DropForeignKey
ALTER TABLE "Endpoint" DROP CONSTRAINT "Endpoint_projectId_fkey";

-- DropIndex
DROP INDEX "Project_userId_key";

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
