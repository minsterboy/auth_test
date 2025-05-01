/** @type {import('@sveltejs/kit').Handle} */
import { parse, serialize } from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = parse(event.request.headers.get('cookie') || '');

	// 쿠키에서 user 정보 읽기
	event.locals.user = cookies.user ? JSON.parse(cookies.user) : null;
	// {}는 null로 간주
	if (event.locals.user && Object.keys(event.locals.user).length === 0) {
		event.locals.user = null;
	}

	const response = await resolve(event);

	// locals.user가 null이거나 빈 객체일 때 쿠키 삭제
	if (!event.locals.user || Object.keys(event.locals.user).length === 0) {
		response.headers.set(
			'set-cookie',
			serialize('user', '', {
				path: '/',
				httpOnly: true,
				expires: new Date(0) // 즉시 만료
			})
		);
	} else {
		// 유효한 user일 때 쿠키 설정
		response.headers.set(
			'set-cookie',
			serialize('user', JSON.stringify(event.locals.user), {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 // 1시간
			})
		);
	}

	return response;
}
