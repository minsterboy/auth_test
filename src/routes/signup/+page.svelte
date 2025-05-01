<script>
	import { invalidate } from '$app/navigation';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let isLoading = false;
	let error = '';

	async function signup() {
		isLoading = true;
		error = '';

		try {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				await invalidate('supabase:auth');
				await goto('/login');
			} else {
				const { error: errMsg } = await response.json();
				error = errMsg || '회원가입에 실패했습니다.';
			}
		} catch (err) {
			error = '서버 오류가 발생했습니다.';
		} finally {
			isLoading = false;
		}
	}
</script>

<h1>회원가입</h1>
<input type="email" bind:value={email} placeholder="이메일을 입력하세요" disabled={isLoading} />
<input
	type="password"
	bind:value={password}
	placeholder="비밀번호를 입력하세요"
	disabled={isLoading}
/>
<button on:click={signup} disabled={isLoading}>
	{#if isLoading}가입 중...{:else}Sign Up{/if}
</button>
{#if error}
	<p style="color: red;">{error}</p>
{/if}
