import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas';
import { createSupabaseClient } from '$lib/supabase';

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(303, '/');
	}

	try {
		const form = await superValidate(zod(loginSchema));
		return { form };
	} catch (error) {
		console.error('Load error:', error);
		return { form: { data: {}, errors: {} } };
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		try {
			const form = await superValidate(request, zod(loginSchema));
			if (!form.valid) return fail(400, { form });

			const { email, password } = form.data;
			const supabase = createSupabaseClient(cookies);
			const { error } = await supabase.auth.signInWithPassword({ email, password });

			if (error) {
				form.errors._errors = [error.message];
				return fail(401, { form });
			}

			throw redirect(303, '/');
		} catch (error) {
			// 리디렉션은 에러로 처리하지 않음
			if (error.status === 303) {
				throw error; // 리디렉션 그대로 전달
			}
			console.error('Action error:', error);
			return fail(500, {
				form: { data: {}, errors: { _errors: ['서버 오류가 발생했습니다.'] } }
			});
		}
	}
};
