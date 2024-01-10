import Cookies from 'js-cookie';
import {useQuery, useMutation } from "@tanstack/react-query"
import {users} from "./user";


export function useUser() {
	const {data, isLoading, error} = useQuery({
		queryKey: [],
		queryFn: users.me,
		
	});

	return { me: data, isLoading, error}
}