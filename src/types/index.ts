export interface PaginatorInfo<T> {
	current_page: number;
	data: T[];
	// map: any;
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: any[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}

export interface QueryOptions {
	page?: number;
	limit?: number;
	language?: string;
}

export interface GetParams {
	id: string;
	language?: string;
}

export interface SearchParamOptions {
	rating: string;
	question: string;

	[key: string]: unknown;
}


export interface User {
	id: string;
	name: string;
	email: string;
	profile: {
		id?: string;
		contact?: string;
		bio?: string;
	};
	role?: Role
}

export interface Role {
	id: string;
	name: string;
}

export interface Layer {
	code: string;
	name: string;
	type?: string;
	url: string;
	styles?: string;
	is_active?: boolean;
	is_visible?: boolean;
	opacity?: number;
}