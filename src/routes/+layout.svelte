<script>
	import { invalidate } from '$app/navigation';
	import { goto } from '$app/navigation';

	export let data;
	let isLoading = false;
	let error = '';

	async function logout() {
		isLoading = true;
		error = '';

		try {
			const response = await fetch('/api/logout', {
				method: 'POST'
			});

			if (response.ok) {
				await invalidate('data:user');
				// 즉시 최신 사용자 정보 가져오기
				const userResponse = await fetch('/api/user');
				if (userResponse.ok) {
					data.user = (await userResponse.json()).user; // UI 즉시 갱신
				}
				await goto('/');
			} else {
				error = '로그아웃에 실패했습니다.';
			}
		} catch (err) {
			error = '서버 오류가 발생했습니다.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			{#if data.user}
				<li>
					Welcome, {data.user.username}!
					<button on:click={logout} disabled={isLoading}>
						{#if isLoading}로그아웃 중...{:else}Logout{/if}
					</button>
				</li>
			{:else}
				<li><a href="/login">Login</a></li>
			{/if}
		</ul>
	</nav>
	{#if error}
		<p style="color: red;">{error}</p>
	{/if}
	<slot />
</div>

<style>
	nav ul {
		display: flex;
		gap: 1rem;
		list-style: none;
		padding: 1rem;
		background-color: #f0f0f0;
	}
	nav li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
