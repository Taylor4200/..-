"use client"

import Image from "next/image"
import Link from "next/link";
import property_data from "@/data/home-data/PropertyData";
import noImageIcon from "@/assets/images/listing/NoImagePhoto.jpg"

import titleShape from "@/assets/images/shape/title_shape_03.svg";
import {useEffect, useState} from "react";

const Property = ({data}: any) => {

    const [locationState, setLocationState] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({
        latitude: null,
        longitude: null,
    })

    async function success (pos: PositionCallback) {
        var crd = pos.coords;
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        setLocationState({
            latitude: crd?.latitude || null,
            longitude: crd?.longitude || null,
        })
    }

    const handleFindUserLocation = () => {

        if (navigator.geolocation) {
            navigator.permissions
                .query({name: "geolocation"})
                .then(function (result) {
                    console.log(result);
                    if (result.state === "granted") {
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        //If prompt then the user will be asked to give permission
                        navigator.geolocation.getCurrentPosition(success);
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }


    }

    useEffect(() => {
        handleFindUserLocation()
    }, []);

    return (
        <div
            className="property-listing-one bg-pink-two mt-150 xl-mt-120 pt-140 xl-pt-120 lg-pt-80 pb-180 xl-pb-120 lg-pb-100">
            <div className="container">
                <div className="position-relative">
                    <div className="title-one text-center text-lg-start mb-45 xl-mb-30 lg-mb-20 wow fadeInUp">
                        <h3>New <span>Listings</span></h3>
                        <p className="fs-22 mt-xs">Explore latest & featured Listings.</p>
                    </div>

                    <div className="row gx-xxl-5">
                        {data?.map((item) => (
                            <div key={item.id} className="col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp"
                                 data-wow-delay={item?.data_delay_time}>
                                <div className="listing-card-one border-25 h-100 w-100">
                                    <div className="img-gallery p-15">
                                        <div className="position-relative border-25 overflow-hidden">
                                            <div className={`tag border-25 ${item?.tag_bg}`}>{item?.tag}</div>
                                            <div id={`carousel${item?.carousel}`} className="carousel slide">
                                                <div className="carousel-indicators">
                                                    <button type="button" data-bs-target={`#carousel${item?.carousel}`}
                                                            data-bs-slide-to="0" className="active" aria-current="true"
                                                            aria-label="Slide 1"></button>
                                                    <button type="button" data-bs-target={`#carousel${item?.carousel}`}
                                                            data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                    <button type="button" data-bs-target={`#carousel${item?.carousel}`}
                                                            data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                </div>
                                                {/*<div className="carousel-inner">*/}
                                                {/*   {item.carousel_thumb.map((item, i) => (*/}
                                                {/*      <div key={i} className={`carousel-item ${item.active}`} data-bs-interval="1000000">*/}
                                                {/*         <Link href="/listing_details_01" className="d-block"><Image src={item.img} className="w-100" alt="..." /></Link>*/}
                                                {/*      </div>*/}
                                                {/*   ))}*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="property-info p-25">

                                        <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between">
                                            {/*{item?.property_info?.map((info, index) => (*/}
                                            {/*   <li key={index} className="d-flex align-items-center">*/}
                                            <Image src={item?.imageUrl || noImageIcon} width={0}
                                                   height={0}
                                                   sizes="100vw"
                                                   style={{
                                                       width: '100%',
                                                       height: '100%',
                                                       borderRadius: 25,
                                                      maxHeight: 265
                                                   }} alt="" className="lazy-img icon me-2"/>
                                            {/*<span className="fs-16">{info.total_feature} {info.feature}</span>*/}
                                            {/*</li>*/}
                                            {/*))}*/}
                                        </ul>
                                        <Link href={`/listing_details_03?id=${item.id}&name=${item.name}&latitude=${locationState?.latitude}&longitude=${locationState?.longitude}`}
                                              className="title tran3s mt-4">{item.name}</Link>
                                        <div className="address">{item.address}</div>
                                        {/*<div*/}
                                        {/*    className="pl-footer top-border d-flex align-items-center justify-content-between">*/}
                                        {/*    <strong className="price fw-500 color-dark">*/}
                                        {/*        ${item?.price?.toLocaleString(undefined, {*/}
                                        {/*        minimumFractionDigits: item.price_text ? 0 : 2,*/}
                                        {/*        maximumFractionDigits: 2*/}
                                        {/*    })}{item.price_text && <>/<sub>m</sub></>}*/}
                                        {/*    </strong>*/}
                                        {/*    <Link href="/listing_details_01" className="btn-four rounded-circle"><i*/}
                                        {/*        className="bi bi-arrow-up-right"></i></Link>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Property;
