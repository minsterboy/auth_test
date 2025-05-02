import { createSupabaseClient } from '$lib/supabase';

export async function handle({ event, resolve }) {
	event.locals.supabase = createSupabaseClient(event.cookies);

	const {
		data: { user }
	} = await event.locals.supabase.auth.getUser();
	event.locals.user = user;

	// 사용자 프로필 정보 조회
	let userProfile = null;
	if (user) {
		const { data, error } = await event.locals.supabase
			.from('profiles')
			.select('id, username')
			.eq('id', user.id)
			.single();

		if (error) {
			console.error('Error fetching user profile:', error);
		} else {
			userProfile = data;
		}
	}
	event.locals.userProfile = userProfile;

	const response = await resolve(event);
	return response;
}
