"use client";

import type { TransitionEvents } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

type DropdownTransitionProps = TransitionEvents & { show?: boolean | undefined; appear?: boolean | undefined };

export const DropdownTransition: React.FC<React.PropsWithChildren<DropdownTransitionProps>> = (props) => {
  return (
    <Transition
      {...props}
      as={Fragment}
      enter="transition ease-in duration-100"
      enterFrom="opacity-0 -translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition-opacity ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    />
  );
};
