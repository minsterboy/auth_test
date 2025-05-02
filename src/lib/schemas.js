import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(1, '이메일을 입력해주세요.').email('유효한 이메일 주소를 입력해주세요.'),
	password: z
		.string()
		.min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
		.max(100, '비밀번호는 100자를 초과할 수 없습니다.')
});
