export type Project = {
   name: string,
   description: string,
   visibility: string,
}

export type EndpointData = {
    name: string;
    description: string;
    url: string;
    method: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
    queryParams: Record<string, string>;
    projectId: string;
  }