<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { loginSchema } from '$lib/schemas';
	import { zod } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, {
		validators: zod(loginSchema),
		dataType: 'json',
		onError: ({ result }) => {
			if (result.error.message) {
				$errors._errors = [result.error.message];
			}
		},
		onResult: ({ result }) => {
			// 리디렉션 처리 확인
			if (result.type === 'redirect') {
				console.log('Redirecting to:', result.location);
			}
		}
	});
</script>

<div class="mx-auto flex max-w-[300px] flex-col">
	<h1 class="pb-5 pt-20 text-2xl font-bold">로그인</h1>

	<form use:enhance method="POST" class="space-y-2">
		<div class="space-y-2">
			<label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="test@test.com"
				bind:value={$form.email}
				{...$constraints.email}
				class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			{#if $errors.email}
				<p class="text-sm text-red-500">{$errors.email}</p>
			{/if}
		</div>

		<div class="space-y-2">
			<label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="비밀번호를 입력하세요"
				bind:value={$form.password}
				{...$constraints.password}
				class="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			{#if $errors.password}
				<p class="text-sm text-red-500">{$errors.password}</p>
			{/if}
		</div>

		{#if $errors._errors}
			<p class="text-sm text-red-500">{$errors._errors}</p>
		{/if}

		<Button type="submit" disabled={$submitting} class="w-full disabled:bg-gray-400">
			{#if $submitting}
				로그인 중...
			{:else}
				로그인
			{/if}
		</Button>
	</form>

	<p class="mt-4 text-sm text-gray-600">
		계정이 없으신가요? <a href="/signup" class="text-blue-600 hover:underline">회원가입</a>
	</p>
</div>
