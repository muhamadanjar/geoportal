import dynamic from "next/dynamic";
const MapComponentNoSSR = dynamic(() => import('@/components/map/map-component'), { ssr: false })

const MapPage = () => {
	return ( 
		<>
			<MapComponentNoSSR/>
		</>
	 );
}
 
export default MapPage;