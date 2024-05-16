import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import { toggleActiveChat } from "@/pages/app/chat/store";
import { useDispatch } from "react-redux";
import useMobileMenu from "@/hooks/useMobileMenu";
import Submenu from "./Submenu";
import { Link, usePage } from "@inertiajs/react";

const Navmenu = ({ menus }) => {
    const pages = usePage();
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const toggleSubmenu = (i) => {
        if (activeSubmenu === i) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(i);
        }
    };

    const locationName = pages.url.replace("/", "");
    const [mobileMenu, setMobileMenu] = useMobileMenu();
    const [activeMultiMenu, setMultiMenu] = useState(null);
    const dispatch = useDispatch();

    const toggleMultiMenu = (j) => {
        if (activeMultiMenu === j) {
            setMultiMenu(null);
        } else {
            setMultiMenu(j);
        }
    };

    const isLocationMatch = (targetLocation) => {
        return (
            locationName === targetLocation ||
            locationName.startsWith(`${targetLocation}/`)
        );
    };

    useEffect(() => {
        let submenuIndex = null;
        let multiMenuIndex = null;
        menus.forEach((item, i) => {
            if (isLocationMatch(item.link)) {
                submenuIndex = i;
            }

            if (item.child) {
                item.child.forEach((childItem, j) => {
                    if (isLocationMatch(childItem.childlink)) {
                        submenuIndex = i;
                    }

                    if (childItem.multi_menu) {
                        childItem.multi_menu.forEach((nestedItem) => {
                            if (isLocationMatch(nestedItem.multiLink)) {
                                submenuIndex = i;
                                multiMenuIndex = j;
                            }
                        });
                    }
                });
            }
        });
        document.title = `Alfa Scorpii  | ${locationName}`;

        setActiveSubmenu(submenuIndex);
        setMultiMenu(multiMenuIndex);
        dispatch(toggleActiveChat(false));
        if (mobileMenu) {
            setMobileMenu(false);
        }
    }, [pages?.url]);

    return (
        <>
            <ul>
                {menus.map((item, i) => (
                    <li
                        key={i}
                        className={` single-sidebar-menu
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${locationName === item.link ? "menu-item-active" : ""}`}
                    >
                        {/* single menu with no childred*/}
                        {!item.child && !item.isHeadr && (
                            <Link className="menu-link mb-1" href={item.link}>
                                <span className="menu-icon flex-grow-0">
                                    <Icon icon={item.icon} />
                                </span>
                                <div className="text-box flex-grow">
                                    {item.title}
                                </div>
                                {item.badge && (
                                    <span className="menu-badge">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        )}
                        {/* only for menulabel */}
                        {item.isHeadr && !item.child && (
                            <div className="menulabel">{item.title}</div>
                        )}
                        {/*    !!sub menu parent   */}
                        {item.child && (
                            <div
                                className={`menu-link ${
                                    activeSubmenu === i
                                        ? "parent_active not-collapsed"
                                        : "collapsed"
                                }`}
                                onClick={() => toggleSubmenu(i)}
                            >
                                <div className="flex-1 flex items-start">
                                    <span className="menu-icon">
                                        <Icon icon={item.icon} />
                                    </span>
                                    <div className="text-box">{item.title}</div>
                                </div>
                                <div className="flex-0">
                                    <div
                                        className={`menu-arrow transform transition-all duration-300 ${
                                            activeSubmenu === i
                                                ? " rotate-90"
                                                : ""
                                        }`}
                                    >
                                        <Icon icon="heroicons-outline:chevron-right" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <Submenu
                            activeSubmenu={activeSubmenu}
                            item={item}
                            i={i}
                            toggleMultiMenu={toggleMultiMenu}
                            activeMultiMenu={activeMultiMenu}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Navmenu;
