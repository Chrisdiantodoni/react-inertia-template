import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import Multilevel from "./Multi";
import { Link, usePage } from "@inertiajs/react";

const Submenu = ({
    activeSubmenu,
    item,
    i,
    toggleMultiMenu,
    activeMultiMenu,
}) => {
    const pages = usePage();
    const locationName = pages.url.replace("/", "");
    const isActive = false;

    const [childMenu, setChildMenu] = useState(null);
    const isLocationMatch = (targetLocation) => {
        return (
            locationName === targetLocation ||
            locationName.startsWith(`${targetLocation}/`)
        );
    };

    useEffect(() => {
        let childMenuIndex = null;
        item?.child?.forEach((item, i) => {
            if (isLocationMatch(item.childlink)) {
                childMenuIndex = i;
            }
        });
        setChildMenu(childMenuIndex);
    }, [pages?.url]);

    return (
        <Collapse isOpened={activeSubmenu === i}>
            <ul className="sub-menu  space-y-4  ">
                {item.child?.map((subItem, j) => (
                    <li
                        key={j}
                        className="block pl-4 pr-1 first:pt-4  last:pb-4 "
                    >
                        {subItem?.multi_menu ? (
                            <div>
                                <div
                                    onClick={() => toggleMultiMenu(j)}
                                    className={`${
                                        activeMultiMenu
                                            ? " text-black dark:text-white font-medium"
                                            : "text-slate-600 dark:text-slate-300"
                                    } text-sm flex space-x-3 items-center transition-all duration-150 cursor-pointer rtl:space-x-reverse`}
                                >
                                    <span
                                        className={`${
                                            activeMultiMenu === j
                                                ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                                                : ""
                                        } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none `}
                                    ></span>
                                    <span className="flex-1">
                                        {subItem.childtitle}
                                    </span>
                                    <span className="flex-none">
                                        <span
                                            className={`menu-arrow transform transition-all duration-300 ${
                                                activeMultiMenu === j
                                                    ? " rotate-90"
                                                    : ""
                                            }`}
                                        >
                                            <Icon icon="ph:caret-right" />
                                        </span>
                                    </span>
                                </div>
                                <Multilevel
                                    activeMultiMenu={activeMultiMenu}
                                    j={j}
                                    subItem={subItem}
                                />
                            </div>
                        ) : (
                            <Link href={subItem?.childlink}>
                                <span
                                    className={`${
                                        childMenu === j
                                            ? " text-black dark:text-white font-medium"
                                            : "text-slate-600 dark:text-slate-300"
                                    } text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}
                                >
                                    <span
                                        className={`${
                                            childMenu === j
                                                ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                                                : ""
                                        } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none`}
                                    ></span>
                                    <span className="flex-1">
                                        {subItem.childtitle}
                                    </span>
                                </span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </Collapse>
    );
};

export default Submenu;
