import { db } from '$lib/data';

export async function get() {
	return {
		body: {
			db
		}
	};
}
