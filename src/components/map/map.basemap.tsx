import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";

const BasemapToolbar = () => {
  return (
    <>
      <div className="bg-white rounded-lg flex bottom-0">
        <Popover>
          <PopoverButton>
            <Image src="https://via.placeholder.com/320" alt="Peta Dasar" />
            <p className="absolute bottom-3 w-full text-white dark:text-bhumi-gray-200  text-xs text-center">
              Peta Dasar
            </p>
          </PopoverButton>
          <PopoverPanel>
            <div className="flex justify-between items-center px-1">
              <h2 className="text-sm text-brand-dark font-semibold dark:text-brand-primary">
                Peta Dasar
              </h2>
			  
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 w-full gap-2">
              <button className="md:w-[84px] w-[70px] h-[70px] md:h-[84px] border rounded overflow-clip border-brand-dark dark:border-brand-primary border-4">
                <Image
                  className="md:w-[84px] w-[70px] h-[70px] md:h-[84px] object-cover object-center"
                  src="/panel/assets/d8a1dfa3-d332-4f00-a056-ab1b08416ab4"
                  alt=""
                />
              </button>
            </div>
            <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-1 text-xs font-medium text-left">
              <button className="border rounded-md py-2 px-3 dark:border-bhumi-gray-500">
                10%
              </button>
              <button className="border rounded-md py-2 px-3 dark:border-bhumi-gray-500">
                10%
              </button>
              <button className="border rounded-md py-2 px-3 dark:border-bhumi-gray-500">
                10%
              </button>
              <button className="border rounded-md py-2 px-3 dark:border-bhumi-gray-500">
                10%
              </button>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </>
  );
};

export default BasemapToolbar;
