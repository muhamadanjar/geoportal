"use client"
import {Map, View} from "ol";
import {Tile as TileLayer} from "ol/layer"
import {
    XYZ as XYZSource,
    TileWMS as TileWMSSource,
    TileImage as TileImageSource,
} from "ol/source";
import React, { useEffect, useRef } from "react";
import {MapBrowserEvent} from "ol";
import {transform} from "ol/proj"
import "ol/ol.css";
import { Layer } from "@/types";
import Label from "@/components/ui/label";
import SwitchComponent from "@/components/ui/switch";
import Divider from "@/components/ui/divider";
import Container from "@/components/ui/container";
import MapToolbar from "./map.toolbar";


interface MapProps {
	children?: React.ReactNode,
	zoom?: number,
	layers?: Layer[],
    showInfo?: boolean;
    showToc?: boolean;
}

const isBrowser = typeof window !== "undefined";


const MapComponent = ({ children, layers }: MapProps) => {
	console.log("isBrowser", isBrowser);
	console.log("== render map ==");
	
	const mapRef = useRef<Map|null>();
	const mapElement = useRef<HTMLDivElement>(null);

	// === function === //
	const createMap = () => {
		let basemapLayer = createBasemap()
		console.log(mapRef);
		const map = new Map({
			// target: mapElement.current!,
			layers: [basemapLayer],
			view: new View({
				projection: 'EPSG:4326',
				zoom: 10,
				minZoom: 5,
				maxZoom: 14,
				center: [106.9202854, -6.8494057],
				// center: transform([106.9202854, -6.8494057], "EPSG:4326", "EPSG:2857"),
			}),
		});
		mapRef.current = map;
	}

	const createBasemap = ()=>{
		const basemapLayer:any = new TileLayer({
			source: new XYZSource({
				url: "//cartodb-basemaps-{1-4}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png",
				crossOrigin: "anonymous",
				tilePixelRatio: 2,
			})
		});
		basemapLayer.set("id", "basemap");


		return basemapLayer

	}

	const onMapClick = async (event: MapBrowserEvent<any>) => {
		console.log("map element", mapElement.current);
		const pixel = event.pixel;
        const map = mapRef.current;
		let resolution = map?.getView().getResolution();
        let projection = map?.getView().getProjection();
        let features = map?.forEachFeatureAtPixel(pixel, function (feature, layer) {
            console.log(layer);
            return feature;
        });

		if (features) {
        } else {
			const layers_array: any = map?.getLayers().getArray();
            const visibleLayer = layers_array.filter(function (layer: any) {
                const source = layer.getSource();
                if (source instanceof TileWMSSource) {
                    if (layer.getVisible()) {
                        return true;
                    }
                }
            });
		}
	}

	const onChangeLayer = (layer: Layer, value: boolean): any => {
        const updatedLayer = layers?.map((item) => {
            if (item.code == layer.code) {
                item.is_visible = value;
            }
            return item;
        })
        // setMapLayer(updatedLayer);
        // const instanceLayer = mapUtils.findLayerBy(mapRef.current?.getLayerGroup(), "code", layer.code)
        // if (instanceLayer) {
        //     instanceLayer.setVisible(value);
        // }

    }

	// Initial Map
	useEffect(()=>{
		console.log(mapRef, mapElement)
		createMap();
		// Handle Prevent Context Menu
		mapElement.current?.addEventListener("contextmenu", (e) => e.preventDefault() );

		mapRef?.current?.setTarget(mapElement.current!);
		return () => {
			mapRef.current?.setTarget(undefined);
		}
	}, []);

	useEffect(() => {
		mapRef.current?.on("click", onMapClick);
	}, [])

	return isBrowser ? (
		<>
		<div ref={mapElement} className="h-[90vh] w-full map">
			{children}
		</div>
		<Container className="absolute w-1/4 bottom-4 left-5 overflow-y-auto overflow-x-hidden">
			<div className="w-full px-2 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
				<h3 className="text-center text-xl font-semibold">Layer TOC</h3>
				<Divider className="mb-5"/>
				<div className="overflow-y-scroll h-[200px]">
					{layers?.map((item) => (

						<div key={item.code} className="flex justify-between mb-2">
							<Label>{item.name}</Label>
							<div className="h-5">

								<SwitchComponent onChange={(value) => onChangeLayer(item, value)}
													checked={item.is_visible}/>
							</div>
						</div>
					))}
				</div>
			</div>
		</Container>
		<MapToolbar>
			
		</MapToolbar>
		</>
		) : null
	
}
 
export default MapComponent;