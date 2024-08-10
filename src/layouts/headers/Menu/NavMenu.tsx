"use client";
import menu_data from "@/data/home-data/MenuData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import '@/assets/css/style.css'; // Adjust the path as needed


const NavMenu = () => {
    const pathname = usePathname();
    const [navTitle, setNavTitle] = useState("");

    const isMenuItemActive = (menuLink: string) => pathname === menuLink;

    const openMobileMenu = (menu: any) => {
        setNavTitle(navTitle === menu ? "" : menu);
    };

    return (
        <ul className="navbar-nav align-items-lg-center">
            <li className="d-block d-lg-none">
                <div className="logo">
                    <Link href="/" className="d-block">
                        <img src="/path-to-your-logo.svg" alt="Logo" width={100} />
                    </Link>
                </div>
            </li>
            <li className="nav-item">
                <Link
                    href="/"
                    className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                >
                    Home
                </Link>
            </li>
            {menu_data.map((menu: any) => (
                <li key={menu.id} className={`nav-item ${menu.class_name}`}>
                    <Link
                        href={menu.link}
                        className={`nav-link ${menu.has_dropdown ? 'dropdown-toggle' : ''} ${isMenuItemActive(menu.link) ? 'active' : ''}`}
                        onClick={() => openMobileMenu(menu.title)}
                    >
                        {menu.title}
                    </Link>
                    {menu.has_dropdown && (
                        <>
                            <ul className={`dropdown-menu ${navTitle === menu.title ? "show" : ""}`}>
                                {menu.sub_menus && menu.sub_menus.map((sub_m: any, i: any) => (
                                    <li key={i}>
                                        <Link
                                            href={sub_m.link}
                                            className={`dropdown-item ${pathname === sub_m.link ? 'active' : ''}`}
                                        >
                                            <span>{sub_m.title}</span>
                                        </Link>
                                    </li>
                                ))}
                                {menu.menu_column && (
                                    <li className="row gx-1">
                                        {menu.menu_column.map((item: any) => (
                                            <div key={item.id} className="col-lg-4">
                                                <div className="menu-column">
                                                    <h6 className="mega-menu-title">{item.mega_title}</h6>
                                                    <ul className="style-none mega-dropdown-list">
                                                        {item.mega_menus.map((mega_m: any, i: any) => (
                                                            <li key={i}>
                                                                <Link
                                                                    href={mega_m.link}
                                                                    className={`dropdown-item ${pathname === mega_m.link ? 'active' : ''}`}
                                                                >
                                                                    <span>{mega_m.title}</span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </li>
                                )}
                            </ul>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
