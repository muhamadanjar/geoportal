'use client';

import { atom, useAtom } from 'jotai';
import { LAYOUT_OPTIONS } from '@/config/constants';

// 1. set initial atom for criptic layout
const LayoutAtom = atom(
	typeof window !== 'undefined'
		? localStorage.getItem('criptic-layout')
		: LAYOUT_OPTIONS.MODERN
);

const LayoutAtomWithPersistence = atom(
	(get) => get(LayoutAtom),
	(get, set, newStorage: any) => {
		set(LayoutAtom, newStorage);
		localStorage.setItem('app-layout', newStorage);
	}
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
	const [layout, setLayout] = useAtom(LayoutAtomWithPersistence);
	return {
		layout: layout === null ? LAYOUT_OPTIONS.MODERN : layout,
		setLayout,
	};
}
