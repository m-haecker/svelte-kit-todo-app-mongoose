import dbConnect from '$lib/database';

import { Todo, TodoModel } from '../../models/todo';

import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
	try {
		await dbConnect();
		const completed = request.url.searchParams.get('completed') === 'true';
		const todos = await TodoModel.find({ completed }).exec();

		return {
			body: { todos },
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: `Server error: ${err}`,
			},
		};
	}
};

export const post: RequestHandler = async (request) => {
	try {
		await dbConnect();
		const todo: Todo = JSON.parse(request.body as string);
		const doc = new TodoModel(todo);
		await doc.save();

		return {
			body: {
				status: 'Success',
			},
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: `Server error: ${err}`,
			},
		};
	}
};

export const put: RequestHandler = async (request) => {
	try {
		await dbConnect();
		const todo: Todo = JSON.parse(request.body as string);
		await TodoModel.findByIdAndUpdate(todo._id, {
			completed: todo.completed,
		}).exec();

		return {
			body: {
				status: 'Success',
			},
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: `Server error: ${err}`,
			},
		};
	}
};

export const del: RequestHandler = async (request) => {
	// TDB
};
