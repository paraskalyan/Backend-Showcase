type Visibility = "PUBLIC" | "PRIVATE";
type Endpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description?: string;
};

export type CreateProjectData = {
    name: string,
    description: string,
    visibility: Visibility,
    stack: string[],
    userId: string,
    endpoints: Endpoint[],
}