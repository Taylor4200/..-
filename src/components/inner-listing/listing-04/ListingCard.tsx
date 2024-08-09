"use client"

import React, {useMemo, useState} from 'react';
import Fancybox from "@/components/common/Fancybox";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Get_Distance} from "@/utils/utils";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {createClient} from "@/utils/supabase/client";
import {trackInteraction} from "@/utils/utilsServer";

const ListingCard = ({item}: any) => {

    const [contactModal, setContactModal] = useState(false);
    const supabase = createClient()
    const searchParams = useSearchParams()

    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')


    const handleContactModal = () => setContactModal(prevState => !prevState)

    const handleUserCalled = async () => {
        if (!item?.phone) return
        await trackInteraction(item.id, true)
    }

    return (
        <div className="listing-card-seven border-20 p-20 mb-50 wow fadeInUp">
            <div className="d-flex flex-wrap layout-one">
                <div style={{height: item?.type === "premium" ? 150 : "100%"}}
                     className={` position-relative z-1 border-20 overflow-hidden ${item?.type !== "standard" ? item?.bg_img + " " + "img-gallery" : ""}`}>
                    {
                        item?.type !== "standard" && item?.imageUrl ? <Image src={item?.imageUrl} alt="img" width={0}
                                                                             height={0}
                                                                             sizes="100vw"
                                                                             style={{
                                                                                 width: '100%',
                                                                                 height: '100%'
                                                                             }}/> : null
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
                <div className="property-info position-relative"
                     style={{width: item?.type === "standard" ? "100%" : "calc(100% - 326px)"}}>
                    <Link
                        href={`/listing_details_03?id=${item.id}&name=${item.name}&latitude=${latitude}&longitude=${longitude}`}
                        className="title tran3s mb-15"
                        style={{
                            maxWidth: 650, display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2
                        }}>{item?.name}</Link>

                    <Box display="flex" alignItems="baseline" mb={item?.type === "standard" ? 4 : 0}>
                        <Typography variant="subtitle1">{item?.distance + " " + "Mi"}</Typography>
                        {/*<p>{item?.distance ? (item?.distance + "  " + "Mi") : ""}</p>*/}

                        <div style={{display: "flex", alignItems: "center", paddingLeft: 16, marginTop: 6}}>
                            <i className="bi bi-geo-alt"></i>
                            <Typography sx={{pl: 1, pt: 0.5}} variant="subtitle2">{item.address}</Typography>
                        </div>
                    </Box>

                    {
                        item?.type === "standard" ? null :
                            <Box sx={{minHeight: item?.type === "pro" ? 140 : "auto", my: 2.5}}>
                                <div style={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3
                                }} dangerouslySetInnerHTML={{__html: item?.description}}></div>
                            </Box>
                    }


                    {/*<ul style={{minHeight: 100}}>*/}


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

                    {/*</ul>*/}
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
                                <button onClick={handleContactModal} className="btn-ten rounded-0"><span>Connect</span>
                                </button>

                            </li>
                        </ul>
                        {/*<Link href="/listing_details_04" className="btn-four rounded-circle"><i*/}
                        {/*    className="bi bi-arrow-up-right"></i></Link>*/}
                    </div>
                </div>
            </div>

            <Dialog
                open={contactModal}
                onClose={handleContactModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Contact Info"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant="h4">
                        To Serve You Better Mention
                        247TruckSupport.com®
                    </DialogContentText>

                    <Box display="flex" alignItems="center" justifyContent="space-between" mt={5}>
                        <Box>
                            <DialogContentText>
                                Primary Phone
                            </DialogContentText>
                            <DialogContentText variant="body1" fontWeight="bold">{item?.phone}</DialogContentText>
                        </Box>

                        <a className="btn-ten rounded-0" onClick={handleUserCalled} href={item?.phone ? "tel:" + item?.phone : "#"}>
                            <span>Call</span>
                        </a>


                    </Box>


                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose}>Disagree</Button>*/}
                {/*    <Button onClick={handleClose} autoFocus>*/}
                {/*        Agree*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Dialog>

        </div>
    );
};

export default ListingCard;