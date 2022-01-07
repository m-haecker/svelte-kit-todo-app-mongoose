<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Todo } from '../models/todo';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/todos');

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
	export let todos: Todo[] = [];
	let text: string;

	async function addTodo() {
		if (!text) return;
		try {
			const todo: Todo = {
				text,
				completed: false,
			};
			await fetch('/todos', {
				method: 'POST',
				body: JSON.stringify(todo),
			});
			text = '';
			fetchTodos();
		} catch (err) {
			console.error(err);
		}
	}

	async function completeTodo(todo: Todo) {
		try {
			await fetch('/todos', {
				method: 'PUT',
				body: JSON.stringify(todo),
			});
			fetchTodos();
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchTodos() {
		try {
			const response = await fetch('todos');
			const result = await response.json();
			todos = result.todos;
		} catch (err) {
			console.error(err);
			todos = [];
		}
	}
</script>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<input type="text" bind:value={text} class="border-2" placeholder="Enter a Todo" />
<button on:click={addTodo}>Add Todo</button>

<h1 class="my-4">My Todos:</h1>

<ul>
	{#each todos as todo}
		<li>
			<input
				type="checkbox"
				bind:checked={todo.completed}
				on:change={() => completeTodo(todo)}
			/>
			{todo.text}
		</li>
	{/each}
</ul>
