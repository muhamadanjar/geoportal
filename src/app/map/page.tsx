import MainLayout from "@/layouts/main";
import dynamic from "next/dynamic";
import getQueryClient from "@/utils/query.client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query"
import { getServerSession } from "next-auth"
const MapComponentNoSSR = dynamic(() => import('@/components/map/map-component'), { ssr: false })

const MapPage = async () => {
	const session = await getServerSession();
	console.log("session", session);
	const queryClient = getQueryClient()
	const dehydrateState = dehydrate(queryClient);
	return ( 
		<>
			<MainLayout>
				<HydrationBoundary state={dehydrateState}>
					<MapComponentNoSSR/>
				</HydrationBoundary>
			</MainLayout>
		</>
	 );
}
 
export default MapPage;