<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Todo } from '../../models/todo';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/todos?completed=true');

		if (response.ok) {
			const { todos } = await response.json();
			return {
				props: { todos },
			};
		}

		const { message } = await response.json();
		return {
			error: new Error(message),
		};
	};
</script>

<script lang="ts">
	export let todos: Todo[];
</script>

<svelte:head>
	<title>Completed Todos</title>
</svelte:head>

<h1>Completed Todos:</h1>

<ul class="mt-4">
	{#each todos as todo}
		<li>
			<input type="checkbox" disabled />
			{todo.text}
		</li>
	{/each}
</ul>
