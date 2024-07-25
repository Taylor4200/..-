"use client"

import React, {useMemo} from 'react';
import Fancybox from "@/components/common/Fancybox";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Get_Distance} from "@/utils/utils";
import Image from "next/image";

const ListingCard = ({item}: any) => {

    // const searchParams = useSearchParams()
    // const latitude = searchParams.get('latitude')
    //
    // const longitude = searchParams.get('longitude')
    // const distance = useMemo(() => {
    //     if (latitude && longitude && item?.lat && item?.lng) {
    //         return Get_Distance(latitude, item?.lat, longitude, item?.lng, "K")
    //     }
    // }, [item?.lat, item?.lng, latitude, longitude])


    return (
        <div className="listing-card-seven border-20 p-20 mb-50 wow fadeInUp">
            <div className="d-flex flex-wrap layout-one">
                <div
                    className={`img-gallery position-relative z-1 border-20 overflow-hidden ${item?.bg_img}`}>
                    {
                        item?.imageUrl ? <Image src={item?.imageUrl} alt="img" width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{width: '100%', height: '100%'}}/> : null
                    }

                    <div className={`tag border-20 ${item?.tag_bg}`}>{item?.tag}</div>
                    {/*<div className="img-slider-btn">*/}
                    {/*    03 <i className="fa-regular fa-image"></i>*/}
                    {/*    <Fancybox*/}
                    {/*        options={{*/}
                    {/*            Carousel: {*/}
                    {/*                infinite: true,*/}
                    {/*            },*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        {item?.carousel_thumb?.map((thumb: any, index: any) => (*/}
                    {/*            <a key={index} className="d-block" data-fancybox="gallery2"*/}
                    {/*               href={`/assets/images/listing/img_large_0${thumb.id}.jpg`}></a>*/}
                    {/*        ))}*/}
                    {/*    </Fancybox>*/}
                    {/*</div>*/}
                </div>
                <div className="property-info position-relative">
                    <Link href="/listing_details_04"
                          className="title tran3s mb-15">{item?.name}</Link>

                    <div style={{display: "flex", alignItems: "center"}}>
                        <i className="fa-solid fa-location-dot fa-image"
                           style={{marginBottom: 17, paddingRight: 10}}></i>
                        <p>{item?.distance ? (item?.distance + "  " + "Mi") : ""}</p>
                    </div>
                    <div className="address">{item.address}</div>
                    <ul style={{minHeight: 100}}>
                        {item?.description}
                        {/*<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,*/}
                        {/*    vitae.*/}
                        {/*</li>*/}
                        {/*<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,*/}
                        {/*    vitae.*/}
                        {/*</li>*/}

                        {/*<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,*/}
                        {/*    vitae.*/}
                        {/*</li>*/}

                        {/*<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,*/}
                        {/*    vitae.*/}
                        {/*</li>*/}

                    </ul>
                    <div className=" mt-30 pt-30 pb-5 d-none d-lg-block"
                         style={{position: "absolute", width: "-webkit-fill-available", bottom: -30}}>
                        <ul className=" d-flex flex-wrap align-items-center justify-content-between"
                            style={{cursor: "pointer"}}>
                            {/*<li><strong>{item.property_info.sqft}</strong> sqft</li>*/}
                            <div><i
                                className="fa-regular fa-star" style={{paddingRight: 15}}></i><span>Status</span>
                            </div>
                            <div><i
                                className="fa-regular fa-note-sticky" style={{paddingRight: 15}}></i><span>Notes</span>
                            </div>
                            <div><i
                                className="fa-solid fa-dollar-sign" style={{paddingRight: 15}}></i><span>Rates</span>
                            </div>
                            <div><i
                                className="fa-solid fa-gear" style={{paddingRight: 15}}></i><span>Service</span>
                            </div>
                            <div><i
                                className="fa-regular fa-thumbs-up" style={{paddingRight: 15}}></i><span>Ratings</span>
                            </div>
                            <div><i
                                className="fa-solid fa-share-nodes" style={{paddingRight: 15}}></i><span>Share</span>
                            </div>

                            {/*<li><strong>{item.property_info.bed}</strong> bed</li>*/}
                            {/*<li><strong>{item.property_info.bath}</strong> bath</li>*/}
                            {/*<li><strong>{item.property_info.kitchen}</strong> Kitchen</li>*/}
                            {/*<li><strong>{item.property_info.parking_lot}</strong> Parking Lot*/}
                            {/*</li>*/}
                            {/*<li><strong>{item.property_info.garden}</strong> Garden</li>*/}
                        </ul>
                    </div>
                    <div
                        className="pl-footer d-flex flex-wrap align-items-center justify-content-between">
                        {/*<strong*/}
                        {/*    className="price fw-500 color-dark me-auto">${item.price.toLocaleString({*/}
                        {/*    minimumFractionDigits: 2,*/}
                        {/*    maximumFractionDigits: 2*/}
                        {/*})}{item.price_text && <>/<sub>m</sub></>}</strong>*/}
                        <ul className="style-none d-flex action-icons on-top" style={{alignItems: "center"}}>
                            <li><Link href="#"><i className="fa-light fa-heart"></i></Link></li>
                            <li><Link href="#"><i className="fa-light fa-bookmark"></i></Link>
                            </li>
                            <li><Link href="#"><i
                                className="fa-light fa-circle-plus"></i></Link></li>
                            <li>
                                <Link href="#" className="btn-ten rounded-0" target="_blank"><span>Connect</span></Link>

                            </li>
                        </ul>
                        {/*<Link href="/listing_details_04" className="btn-four rounded-circle"><i*/}
                        {/*    className="bi bi-arrow-up-right"></i></Link>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;