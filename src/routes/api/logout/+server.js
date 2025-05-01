import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, cookies }) {
	try {
		locals.user = null;
		// 쿠키 삭제
		cookies.delete('user', { path: '/', httpOnly: true });
		return json({ success: true });
	} catch (error) {
		return json({ error: '로그아웃에 실패했습니다.' }, { status: 500 });
	}
}
