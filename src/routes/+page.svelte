<script>
	export let data;
</script>

<div class="flex flex-col justify-center">
	<!-- 상단 1/3 -->
	<div class="flex items-center justify-center">
		<h1 class="text-2xl">메인 페이지</h1>
	</div>

	<!-- 하단 2/3 -->
	<div class="flex justify-center">
		<p>{data.user ? `환영합니다, ${data.userProfile?.username}!` : '로그인해주세요.'}</p>
	</div>
</div>
