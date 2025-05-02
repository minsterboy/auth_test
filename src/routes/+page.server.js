export async function load({ locals, depends }) {
	depends('supabase:auth');
	return { user: locals.user || null };
}
