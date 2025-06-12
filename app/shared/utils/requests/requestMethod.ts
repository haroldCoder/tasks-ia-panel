import { HttpMethod } from "../../enums/httpmethods.enum";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const version = 'v1';

export const createRequest = (method: HttpMethod, path: string, body?: any, headers?: Record<string, string>) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${API_URL}/${version}/${path}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    })
    .catch(error => {
      console.error('Request failed:', error);
      throw error;
    });
}