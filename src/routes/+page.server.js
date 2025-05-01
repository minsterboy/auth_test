/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch, depends }) {
	depends('data:user');
	const response = await fetch('/api/user', { cache: 'no-store' });
	const { user } = await response.json();
	return { user };
}
