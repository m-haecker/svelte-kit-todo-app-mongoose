import { browser } from '$app/env';
import Debug from 'debug';
import dotenv from 'dotenv';
import { APP_NAME } from '../constants';

class Utils {
	private static instance: Utils;
	private debug = Debug(APP_NAME);

	private constructor() {
		if (!browser) {
			dotenv.config();
		}
	}

	static getInstance() {
		if (!Utils.instance) {
			Utils.instance = new Utils();
		}
		return Utils.instance;
	}

	/**
	 * @returns the environment variable with the given `name`
	 */
	env(name: string) {
		if (browser) return undefined;
		return process.env[name];
	}

	/**
	 * Passes a debug statement to `console.error`. Uses https://github.com/debug-js/debug under
	 * the hood. Debugging namespace is the one defined in `APP_NAME`.
	 */
	log(formatter: any, ...args: any[]) {
		this.debug(formatter, ...args);
	}
}

export default Utils.getInstance();
