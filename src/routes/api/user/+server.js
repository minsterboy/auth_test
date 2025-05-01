import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
	return json({ user: locals.user });
}
