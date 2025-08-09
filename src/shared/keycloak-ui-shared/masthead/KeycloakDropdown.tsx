/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/masthead/KeycloakDropdown.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import {
    Dropdown,
    DropdownList,
    DropdownProps,
    MenuToggle
} from "../../@patternfly/react-core";
import { EllipsisVIcon } from "../../@patternfly/react-icons";
import { ReactNode, useState } from "react";

type KeycloakDropdownProps = Omit<DropdownProps, "toggle"> & {
    "data-testid"?: string;
    isKebab?: boolean;
    title?: ReactNode;
    dropDownItems: ReactNode[];
};

export const KeycloakDropdown = ({
    isKebab = false,
    title,
    dropDownItems,
    ...rest
}: KeycloakDropdownProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dropdown
            {...rest}
            popperProps={{
                position: "right"
            }}
            onOpenChange={isOpen => setOpen(isOpen)}
            toggle={ref => (
                <MenuToggle
                    data-testid={`${rest["data-testid"]}-toggle`}
                    ref={ref}
                    onClick={() => setOpen(!open)}
                    isExpanded={open}
                    variant="plain"
                >
                    {isKebab ? <EllipsisVIcon /> : title}
                </MenuToggle>
            )}
            isOpen={open}
        >
            <div
                className={`
                    transform
                    transition-all
                    ease-in-out
                    duration-200
                    origin-top-right
                    ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
            >
                <DropdownList className="!border-none rounded-md shadow-lg bg-white p-2">
                    {dropDownItems}
                </DropdownList>
            </div>
        </Dropdown>
    );
};
