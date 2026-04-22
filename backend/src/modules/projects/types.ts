type Visibility = "PUBLIC" | "PRIVATE";
type EndpointInput = {
  name: string;
  description: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: any;
  body?: any;
  queryParams?: any;
};

export type CreateProjectData = {
    name: string,
    description: string,
    visibility: Visibility,
    stack: string[],
    userId: string,
    endpoints: EndpointInput[],
}