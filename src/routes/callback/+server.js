import { json, redirect } from "@sveltejs/kit";
import fetch from "node-fetch";

const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_CLIENT_SECRET;
const tokenURL = "https://github.com/login/oauth/access_token";
const userURL = "https://api.github.com/user";

export async function GET({ url, cookies}) {
  const code = url.searchParams.get("code");

  const token = await getToken(code);
  const user = await getUser(token);
  cookies.set("user", user.login, {domain: "localhost"})

  console.log("here", cookies.getAll())

  throw redirect(302, "/")
}

function getToken(code) {
  return fetch(tokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: secret,
      code,
    }),
  })
    .then((response) => response.json())
    .then((response) => response.access_token);
}

function getUser(token) {
  return fetch(userURL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}
