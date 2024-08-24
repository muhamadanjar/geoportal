
import {cn} from "@/utils";
export default function MainLayout({ children, contentClassName}: React.PropsWithChildren<{ contentClassName?: string }>){
	return (
		<div className={cn('', contentClassName)}>
			{children}
		</div>
	)
}