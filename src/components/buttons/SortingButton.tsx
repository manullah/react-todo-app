import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowsUpDownIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Sort } from "../../services/enum/sorting";

type TMenu = {
  icon: React.ReactNode;
  text: string;
  value: Sort;
};

type SortingButtonProps = {
  onSort: (value: Sort) => void;
};

const SortingButton: React.FC<SortingButtonProps> = ({ onSort }) => {
  const [isActived, setIsActived] = useState(Sort.Newest);

  const menus: Array<TMenu> = [
    {
      icon: <BarsArrowDownIcon className="w-6 h-6 text-primary" />,
      text: "Terbaru",
      value: Sort.Newest,
    },
    {
      icon: <BarsArrowUpIcon className="w-6 h-6 text-primary" />,
      text: "Terlama",
      value: Sort.Latest,
    },
    {
      icon: <BarsArrowDownIcon className="w-6 h-6 text-primary" />,
      text: "A - Z",
      value: Sort.Az,
    },
    {
      icon: <BarsArrowUpIcon className="w-6 h-6 text-primary" />,
      text: "Z - A",
      value: Sort.Za,
    },
    {
      icon: <ArrowsUpDownIcon className="w-6 h-6 text-primary" />,
      text: "Belum Selesai",
      value: Sort.NotYet,
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button data-cy="todo-sort-button" className="p-4">
          <ArrowsUpDownIcon className="w-6 h-6" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menus.map((menu, index) => (
            <Menu.Item key={index} data-cy="sort-selection">
              {({ active }) => (
                <div
                  data-cy="sort-selection-selected"
                  className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setIsActived(menu.value);
                    onSort(menu.value);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div data-cy="sort-selection-icon">{menu.icon}</div>
                    <p data-cy="sort-selection-title">{menu.text}</p>
                  </div>
                  {isActived === menu.value && (
                    <CheckIcon className="w-4 h-4" />
                  )}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortingButton;
