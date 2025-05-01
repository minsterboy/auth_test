import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { username } = await request.json();
	if (!username) {
		return json({ error: 'Username is required' }, { status: 400 });
	}
	// 간단히 username만 저장 (실제로는 인증 로직 추가)
	locals.user = { username };
	return json({ success: true });
}
