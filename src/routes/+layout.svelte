<script>
	import { invalidate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { createSupabaseClient } from '$lib/supabase';
	import { browser } from '$app/environment';

	export let data;
	let isLoading = false;
	let error = '';

	// 클라이언트 측 Supabase 클라이언트
	let supabaseClient;
	if (browser) {
		supabaseClient = createSupabaseClient({
			getAll: () => [],
			setAll: () => {}
		});
	}

	// 인증 상태 변화 감지
	onMount(() => {
		if (!browser) return;
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		return () => subscription.unsubscribe();
	});

	async function logout() {
		isLoading = true;
		error = '';

		try {
			const response = await fetch('/api/logout', {
				method: 'POST'
			});

			if (response.ok) {
				await invalidate('supabase:auth');
				await goto('/');
			} else {
				const { error: errMsg } = await response.json();
				error = errMsg || '로그아웃에 실패했습니다.';
			}
		} catch (err) {
			console.error('Logout client error:', err);
			error = '서버 오류가 발생했습니다: ' + err.message;
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
					Welcome, {data.user.email}!
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
_AXIARTIFACT_CODE_BLOCK_0
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
