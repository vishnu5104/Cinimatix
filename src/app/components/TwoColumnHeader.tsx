import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { PiSignOutDuotone } from "react-icons/pi";

import { MdManageAccounts } from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

import { SiSpringCreators } from "react-icons/si";

import { useRouter } from "next/navigation";

const explore = [
  {
    name: "Switch to Creator",
    description:
      "To Post the Theme, Trailer ,Movie  you need to swaitch to Creator Account",
    href: "switch-to-creator",
    icon: SiSpringCreators,
  },

  {
    name: "Account Info",
    description:
      "Contains information about your Worldcoin ID and Wallet Address",
    href: "#",
    icon: FaUserCircle,
  },
  {
    name: "User Profile",
    description:
      "provides access to your personal account information and settings",
    href: "#",
    icon: MdManageAccounts,
  },

  {
    name: "Sign Out",
    description: "Sign Out From This Platform",
    href: "#",
    icon: PiSignOutDuotone,
  },
];

export default function TwoColumnHeader() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (href !== "#") {
      router.push(href);
    }
  };
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 ">
        <span>Explore</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
              {explore.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
