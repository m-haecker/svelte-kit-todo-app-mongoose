import mongoose, { Schema, Types } from 'mongoose';

export interface Todo {
	_id?: Types.ObjectId;
	text: string;
	completed?: boolean;
}

const schema = new Schema<Todo>(
	{
		text: { type: String, required: true },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

export const TodoModel = mongoose.model<Todo>('Todo', schema);
