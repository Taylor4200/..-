import Link from "next/link"
import Image from "next/image";
import DeleteModal from "@/modals/DeleteModal";

import profileIcon_1 from "@/assets/images/dashboard/icon/icon_23.svg";
import profileIcon_2 from "@/assets/images/dashboard/icon/icon_24.svg";
import profileIcon_3 from "@/assets/images/dashboard/icon/icon_25.svg";
import {logout} from "@/app/login/actions";
import {toast} from "react-toastify";

const handleLogout = async () => {

    try {
        const response = await logout()
        if (response?.status === 500) {
            return
        }
        const notify = () => toast('Logout successfully', {position: 'top-center'});
        notify();
    } catch (e) {
        console.log(e);
    }
}

const Profile = () => {
    return (
        <>
            <div className="user-name-data">
                <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" href="/profile"><Image
                            src={profileIcon_1}
                            alt=""
                            className="lazy-img"/><span
                            className="ms-2 ps-1">Profile</span></Link>
                    </li>
                    {/*<li>*/}
                    {/*   <Link className="dropdown-item d-flex align-items-center" href="/account-settings"><Image*/}
                    {/*       src={profileIcon_2} alt="" className="lazy-img"/><span*/}
                    {/*       className="ms-2 ps-1">Account Settings</span></Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*   <Link className="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal"*/}
                    {/*         data-bs-target="#deleteModal"><Image src={profileIcon_3} alt="" className="lazy-img"/><span*/}
                    {/*       className="ms-2 ps-1">Delete Account</span></Link>*/}
                    {/*</li>*/}
                    <li>
                        <div onClick={handleLogout} className="dropdown-item d-flex align-items-center"><i
                            className="fa-solid fa-right-from-bracket"></i>
                            <button
                                className="ms-2 ps-1">Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <DeleteModal/>
        </>
    )
}

export default Profile
