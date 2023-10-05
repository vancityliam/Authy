import { json, redirect } from '@sveltejs/kit';

const target = "https://github.com/login/oauth/authorize"
const clientId = import.meta.env.VITE_CLIENT_ID

export async function GET(request) {
    const sessionId = "1234"

    throw redirect(302, `${target}?client_id=${clientId}&state=${sessionId}`)
}