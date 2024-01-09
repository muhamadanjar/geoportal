"use client"
import {Map, View} from "ol";
import {Tile as TileLayer} from "ol/layer"
import {XYZ as XYZSource} from "ol/source"
import React, { useEffect, useRef } from "react";
import {transform} from "ol/proj"
import "ol/ol.css";
interface MapProps {
	children?: React.ReactNode,
	zoom?: number,
	// layers?: Layer[],
    showInfo?: boolean;
    showToc?: boolean;
}

const isBrowser = typeof window !== "undefined";

const MapComponent = ({ children }: MapProps) => {
	console.log("isBrowser", isBrowser);
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


	useEffect(()=>{
		console.log(mapRef, mapElement)
		createMap();
		mapRef?.current?.setTarget(mapElement.current!);
		return () => {
			mapRef.current?.setTarget(undefined);
		}
	}, [mapElement]);

	return isBrowser ? (
		<div ref={mapElement} className="h-[90vh] w-full map">
			{children}
		</div>) : null
	
}
 
export default MapComponent;