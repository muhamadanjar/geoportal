"use client"
import { Dialog, Transition } from '@headlessui/react';
import { Close } from "@/components/icons/close"
import { Fragment, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {MODAL_VIEW, useModal} from "@/contexts/modal.context";
import {useLayout} from "@/utils/hooks/use-layout"
import Button from '@/components/ui/button/button';
import { LAYOUT_OPTIONS } from '@/config/constants';
import cn from '@/utils/class-names';


function renderModalContent(view: MODAL_VIEW | string) {
  switch (view) {
    default:
      return null;
  }
}

export default function ModalContainer() {
	const { view, isOpen, closeModal } = useModal();
	const { layout } = useLayout();
	const pathname = usePathname();
  	const searchParams = useSearchParams();
	return (

		<Transition show={isOpen} as={Fragment}>
			<Dialog as="div"
        		className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        		onClose={closeModal}>

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
        		>
					<Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur" />
				</Transition.Child>


				<div className="sr-only">
				<Button
					size="small"
					color="gray"
					shape="circle"
					onClick={closeModal}
					className="opacity-50 hover:opacity-80 "
				>
					<Close className="h-auto w-[13px]" />
				</Button>
				</div>

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-105"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-105"
					>
					<div
						className={cn(
						'relative z-50 inline-block w-full text-left align-middle',
						layout === LAYOUT_OPTIONS.RETRO ? 'sm:w-auto' : 'xs:w-auto',
						)}
					>
						{view && renderModalContent(view)}
					</div>
				</Transition.Child>

			</Dialog>

		</Transition>
	)
}