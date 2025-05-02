import { json } from '@sveltejs/kit';
import { createSupabaseClient } from '$lib/supabase';

export async function POST({ cookies }) {
	try {
		const supabase = createSupabaseClient(cookies);
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error('Logout error:', error);
			return json({ error: '로그아웃에 실패했습니다.' }, { status: 500 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('Logout error:', error);
		return json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
	}
}
