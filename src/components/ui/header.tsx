'use client';

import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { useIsMounted } from '@/utils/hooks/use-is-mounted';
import { useWindowScroll } from "@/utils/hooks/use-window-scroll";
import { useRouter } from 'next/navigation';
export default function Header({ className }: { className?: string }) {

	const router = useRouter();
	const isMounted = useIsMounted();
	const windowScroll = useWindowScroll();

	return (

		<nav
      className={cn(
        'sticky top-0 z-30 h-16 w-full backdrop-blur transition-shadow duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'bg-white/80 shadow-card dark:bg-dark/80'
          : '',
        className,
      )}
    >
		<div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => router.push(routes.home)}
            className="flex items-center xl:hidden"
          >
          </div>
          <div className="mx-2 block sm:mx-4 xl:hidden">
          </div>
        </div>
      </div>
	</nav>
	)
}