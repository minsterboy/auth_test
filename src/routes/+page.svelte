<script>
	export let data;
</script>

<h1>홈 페이지</h1>
<p>{data.user ? `환영합니다, ${data.user.username}!` : '로그인해주세요.'}</p>
