<script>
	import { invalidate } from '$app/navigation';
	import { goto } from '$app/navigation';

	let username = '';
	let isLoading = false;
	let error = '';

	async function login() {
		isLoading = true;
		error = '';

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username })
			});

			if (response.ok) {
				await invalidate('data:user');
				await goto('/'); // 로그인 후 홈으로 이동
			} else {
				const { error: errMsg } = await response.json();
				error = errMsg || '로그인에 실패했습니다.';
			}
		} catch (err) {
			error = '서버 오류가 발생했습니다.';
		} finally {
			isLoading = false;
		}
	}
</script>

<h1>로그인</h1>
<input
	type="text"
	bind:value={username}
	placeholder="사용자 이름을 입력하세요"
	disabled={isLoading}
/>
<button on:click={login} disabled={isLoading}>
	{#if isLoading}로그인 중...{:else}Login{/if}
</button>
{#if error}
	<p style="color: red;">{error}</p>
{/if}
