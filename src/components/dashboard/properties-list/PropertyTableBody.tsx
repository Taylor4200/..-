import Image from "next/image"
import Link from "next/link"

import icon_1 from "@/assets/images/dashboard/icon/icon_18.svg";
import icon_2 from "@/assets/images/dashboard/icon/icon_19.svg";
import icon_3 from "@/assets/images/dashboard/icon/icon_20.svg";
import icon_4 from "@/assets/images/dashboard/icon/icon_21.svg";

import moment from "moment";
import noImageIcon from "@/assets/images/listing/noImage.svg"

const PropertyTableBody = ({list, handleDeleteListing}: any) => {

    const handleDelete = (id: number) => handleDeleteListing(id)

    const keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    const triplet = (e1: number, e2: number, e3: number) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63);

    const rgbDataURL = (r: number, g: number, b: number) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${
            triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

    return (
        <tbody className="border-0">
        {list?.map((item) => (
            <tr key={item.id}>
                <td>
                    <div className="d-lg-flex align-items-center position-relative">
                        <Image src={item?.imageUrl || noImageIcon} placeholder="blur" priority
                               blurDataURL={rgbDataURL(237, 181, 6)} alt="" className="p-img"
                               style={{height: 140, width: 140}} width={105} height={10}/>
                        <div className="ps-lg-4 md-pt-10">
                            <Link style={{
                                maxWidth: 700, display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2
                            }} href="#"
                                  className="property-name tran3s color-dark fw-500 fs-20 stretched-link">{item.name}</Link>
                            <div style={{
                                maxWidth: 500, display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2
                            }} className="address">{item.address}</div>
                            <strong className="price color-dark" style={{
                                maxWidth: 500, display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical', fontSize: 13,
                                WebkitLineClamp: 2
                            }}>{item?.website}</strong>
                        </div>
                    </div>
                </td>
                <td>{moment(item?.created_at).startOf('minute').fromNow()}</td>
                <td>{item?.phone}</td>
                <td>
                    <div className={`property-status ${item?.status_bg}`}>Active</div>
                </td>
                <td>
                    <div className="action-dots float-end">
                        <button className="action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            <span></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className="dropdown-item" href="#"><Image src={icon_1} alt=""
                                                                                className="lazy-img"/> View</Link></li>
                            <li><Link className="dropdown-item" href="#"><Image src={icon_2} alt=""
                                                                                className="lazy-img"/> Share</Link></li>
                            <li><Link className="dropdown-item" href={`/dashboard/add-property?edit=true&id=${item?.id}`}><Image src={icon_3} alt=""
                                                                                className="lazy-img"/> Edit</Link></li>
                            <li>
                                <button onClick={() => handleDelete(item.id)} className="dropdown-item"><Image
                                    src={icon_4} alt=""
                                    className="lazy-img"/> Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        ))}
        </tbody>
    )
}

export default PropertyTableBody
