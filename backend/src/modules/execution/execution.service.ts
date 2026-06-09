// services/execution.service.ts
import { prisma } from "../../lib/prisma.js";
import axios from "axios";
import { ensureObject } from "../../utils/helpers.js";

export const runExecution = async (endpointId: string, userId?: string) => {
  // 1️⃣ Get endpointl
  const endpoint = await prisma.endpoint.findUnique({
    where: { id: endpointId },
  });

  if (!endpoint) {
    throw new Error("ENDPOINT_NOT_FOUND");
  }

  const execution = await prisma.execution.create({
    data: {
      endpointId,
      triggeredBy: userId ?? null,
      status: "RUNNING",
    },
  });

  const startTime = Date.now();

  try {
    const response = await axios({
      method: endpoint.method,
      url: endpoint.url,
      headers: ensureObject(endpoint.headers),
      data: endpoint.body ?? {},
      params: ensureObject(endpoint.queryParams),
    });

    const responseTime = Date.now() - startTime;

    await prisma.executionLog.create({
      data: {
        endpointId,
        executionId: execution.id,
        status: "SUCCESS",
        statusCode: response.status,
        responseTime,
        response: response.data,
      },
    });

    await prisma.execution.update({
      where: { id: execution.id },
      data: { status: "SUCCESS" },
    });

    return {
      executionId: execution.id,
      status: "SUCCESS",
      responseBody: response.data,
      responseTime,
      statusCode: response.status,
      responseSize: response.headers["content-length"] + " bytes"
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;

    await prisma.executionLog.create({
      data: {
        endpointId,
        executionId: execution.id,
        status: "FAILED",
        statusCode: error.response?.status,
        responseTime,
        errorMessage: error.message,
        response: error.response?.data,
      },
    });

    await prisma.execution.update({
      where: { id: execution.id },
      data: { status: "FAILED" },
    });

    return {
      executionId: execution.id,
      status: "FAILED",
      error: error.message,
      responseTime,
    };
  }
};
