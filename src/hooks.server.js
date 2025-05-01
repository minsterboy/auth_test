/** @type {import('@sveltejs/kit').Handle} */
import { createSupabaseClient } from '$lib/supabase';

export async function handle({ event, resolve }) {
	// Supabase 클라이언트 초기화
	event.locals.supabase = createSupabaseClient(event.cookies);

	// 세션 가져오기 및 JWT 검증
	const {
		data: { session }
	} = await event.locals.supabase.auth.getSession();
	event.locals.session = session;
	console.log('event.locals.session in hooks:', event.locals.session);

	const response = await resolve(event);
	return response;
}
