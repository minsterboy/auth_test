<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { createSupabaseClient } from '$lib/supabase';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';

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
		} = supabaseClient.auth.onAuthStateChange((event) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
				invalidate('supabase:auth');
			}
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

<div class="flex min-h-screen flex-col">
	<header>
		<nav class="container mx-auto flex items-center justify-between border-b py-2">
			<div><a href="/" class="text-xl font-bold">Home</a></div>
			<div>
				{#if data.user}
					<span> {data.user.email}</span>
					<Button on:click={logout} disabled={isLoading} class="h-8 text-sm ">
						{#if isLoading}Loading...{:else}Logout{/if}</Button
					>
				{:else}
					<Button href="/login" variant="outline" class="h-8 text-sm ">Login</Button>
				{/if}
			</div>
		</nav>
	</header>
	{#if error}
		<p style="color: red;">{error}</p>
	{/if}

	<main class="flex flex-grow flex-col">
		<slot />
	</main>

	<footer class="bg-gray-100 p-4 text-center text-sm text-gray-600">
		© 2025 Hololog. All rights reserved.
	</footer>
</div>
