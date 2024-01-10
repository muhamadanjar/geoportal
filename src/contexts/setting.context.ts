import React from "react";

export interface State {
	settings: any;
}

export const initialState = {
	siteTitle: 'Geoportal',
	siteSubtitle: '',
	currencyOptions: {
		formation: "en-US",
		fractions: 2,
	},
	logo: {
		id: 1,
		thumbnail: '/logo.svg',
		original: '/logo.svg',
	},
};

export const SettingsContext = React.createContext<State | any>(initialState);


export const useSettings = () => {
	const context = React.useContext(SettingsContext);
	if (context === undefined) {
		throw new Error(`useSettings must be used within a SettingsProvider`);
	}
	return context;
};