"use client"
import Image from "next/image"
import Link from "next/link"
import Notification from "./Notification";
import Profile from "./Profile";
import {FormEvent, FormEventHandler, useCallback, useState} from "react";
import DashboardHeaderOne from "./DashboardHeaderOne";

import dashboardIcon_1 from "@/assets/images/dashboard/icon/icon_43.svg";
import dashboardIcon_2 from "@/assets/images/dashboard/icon/icon_11.svg";
import dashboardAvatar from "@/assets/images/dashboard/avatar_01.jpg";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const DashboardHeaderTwo = ({title}: any) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState<string>("");
    const searchPa = searchParams.get('search')
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return
        router.push(pathname + '?' + createQueryString('search', search))
    }

    const handleRemoveSearch = (e: any) => {
        e.preventDefault();
        setSearch("")
        router.push(pathname)
    }

    return (
        <>
            <header className="dashboard-header">
                <div className="d-flex align-items-center justify-content-end">
                    <h4 className="m0 d-none d-lg-block">{title}</h4>
                    <button onClick={() => setIsActive(true)}
                            className="dash-mobile-nav-toggler d-block d-md-none me-auto">
                        <span></span>
                    </button>
                    <form onSubmit={handleSearch} className="search-form ms-auto">
                        {
                            pathname === '/dashboard/properties-list' ?

                                <>
                                    <input value={search} onChange={e => setSearch(e.target.value.replace(/\s/g, '+'))} type="text"
                                           placeholder="Search list here.."/>
                                    {
                                        searchPa ? <button onClick={handleRemoveSearch} style={{right: 35}}><i
                                            className="fa-solid fa-xmark"></i></button> : null
                                    }
                                    <button type="submit"><Image src={dashboardIcon_1} alt=""
                                                                 className="lazy-img m-auto"/></button>
                                </>
                                : null
                        }
                    </form>
                    <div className="profile-notification position-relative dropdown-center ms-3 ms-md-5 me-4">
                        {/*<button className="noti-btn dropdown-toggle" type="button" id="notification-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">*/}
                        {/*   <Image src={dashboardIcon_2} alt="" className="lazy-img" />*/}
                        {/*   <div className="badge-pill"></div>*/}
                        {/*</button>*/}
                        {/*<Notification />*/}
                    </div>
                    <div className="d-none d-md-block me-3">
                        {/*<Link href="/add-property" className="btn-two"><span>Add Listing</span> <i className="fa-thin fa-arrow-up-right"></i></Link>*/}
                    </div>
                    <div className="user-data position-relative">
                        <button className="user-avatar online position-relative rounded-circle dropdown-toggle"
                                type="button" id="profile-dropdown" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-expanded="false">
                            <Image src={dashboardAvatar} alt="" className="lazy-img"/>
                        </button>
                        <Profile/>
                    </div>
                </div>
            </header>
            <DashboardHeaderOne isActive={isActive} setIsActive={setIsActive}/>
        </>
    )
}

export default DashboardHeaderTwo
