<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<nav class="border-b-2 mb-4">
		<a href="/" class:font-bold={$page.url.pathname === '/'}>Todos</a> |
		<a href="/completed" class:font-bold={$page.url.pathname === '/completed'}>Completed</a>
	</nav>
</header>
