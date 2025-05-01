import { json } from '@sveltejs/kit';
import { createSupabaseClient } from '$lib/supabase';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	try {
		const { email, password } = await request.json();
		if (!email || !password) {
			return json({ error: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 });
		}

		const supabase = createSupabaseClient(cookies);
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: 'http://localhost:5173/login'
			}
		});

		if (error) {
			return json({ error: error.message }, { status: 400 });
		}

		console.log('Signed up user:', data.user);
		return json({ success: true });
	} catch (error) {
		console.error('Signup error:', error);
		return json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
	}
}
