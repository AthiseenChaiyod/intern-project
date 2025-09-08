import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async (responseEvent) => {
  const response = await fetch(
    "https://intern-encore-production.up.railway.app/initial-service/athiseen",
    { method: "GET" }
  );

  responseEvent.json(200, await response.json());
};
