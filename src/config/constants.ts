
export const ACCEPTED_FILE_TYPES = {
	'image/jpeg': [],
	'image/png': [],
	'application/pdf': [],
	'application/zip': [],
	'application/vnd.rar': [],
	'application/epub+zip': [],
	'.psd': [],
};


export const LIMIT = 10;
export const SUPER_ADMIN = 'superadmin';
export const STAFF = 'staff';
export const TOKEN = 'token';
export const PERMISSIONS = 'permissions';
export const AUTH_CRED = 'AUTH_CRED';

export const phoneRegExp =
	/^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const URLRegExp =
	/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;


export enum LAYOUT_OPTIONS {
	MODERN = 'modern',
	MINIMAL = 'minimal',
	RETRO = 'retro',
	CLASSIC = 'classic',
}
