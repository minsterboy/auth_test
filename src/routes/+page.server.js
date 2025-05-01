/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, depends }) {
	depends('supabase:auth');
	return { user: locals.session?.user || null };
}
