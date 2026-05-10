import { prisma } from "../../lib/prisma.js";

export const getDashboardStats = async (userId: string) => {
  const totalProjects = await prisma.project.count({
    where: {
      userId,
    },
  });

  const totalEndpoints = await prisma.endpoint.count({
    where: {
      Project: { userId },
    },
  });

  const successfulExecutions = await prisma.execution.count({
    where: {
      status: "SUCCESS",
      endpoint: {
        project: {
          userId,
        },
      },
    },
  });

  const totalExecutions = await prisma.execution.count({
    where: {
      Endpoint: {
        Project: {
          userId,
        },
      },
    },
  });

  const successRate =
    totalExecutions === 0 ? 0 : (successfulExecutions / totalExecutions) * 100;
};
