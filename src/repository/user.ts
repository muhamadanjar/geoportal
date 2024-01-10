import API_ENDPOINT from '@/config/endpoint';
import { HttpClient } from '@/utils/client';
import type {User} from "@/types";



export const users = {
	me: () => HttpClient.get<User>(API_ENDPOINT.USERS_ME),
}