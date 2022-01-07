import dbConnect from '$lib/database';

import { TodoModel } from '../../models/todo';

import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	try {
		await dbConnect();
		const { slug } = params;
		const todo = await TodoModel.findById(slug).exec();

		return {
			body: {
				todo,
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
