"use client"

import React, { useState } from 'react';
import Fancybox from "@/components/common/Fancybox";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { trackInteraction } from "@/utils/utilsServer";

const ListingCard = ({ item }: any) => {

    const [contactModal, setContactModal] = useState(false);
    const searchParams = useSearchParams();

    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    const handleContactModal = () => setContactModal(prevState => !prevState);

    const handleUserCalled = async () => {
        if (!item?.phone) return;
        await trackInteraction(item.id, true);
    };

    // Handle the share button click
    const handleShare = async () => {
        const shareData = {
            title: item?.name,
            text: 'Check out this listing on 247TruckSupport!',
            url: `${window.location.origin}/listing_details_03?id=${item.id}&name=${item.name}&latitude=${latitude}&longitude=${longitude}`
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Listing shared successfully');
            } catch (err) {
                console.error('Error sharing the listing:', err);
            }
        } else {
            // Fallback for non-mobile or unsupported browsers
            try {
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard');
            } catch (err) {
                console.error('Error copying the link:', err);
            }
        }
    };

    // Conditional styling functions
    const getImageMarginTop = () => {
        switch (item?.type) {
            case 'premium':
                return '90px'; // Adjust as needed for Y-axis
            case 'pro':
                return '90px'; // Adjust as needed for Y-axis
            case 'standard':
            default:
                return '90px'; // Adjust as needed for Y-axis
        }
    };

    const getHeaderMarginLeft = () => {
        switch (item?.type) {
            case 'premium':
                return '-350px'; // Adjust as needed for X-axis
            case 'pro':
                return '-350px'; // Adjust as needed for X-axis
            case 'standard':
            default:
                return '5px'; // Adjust as needed for X-axis
        }
    };

    const getDescriptionMarginTop = () => {
        switch (item?.type) {
            case 'premium':
                return '20px'; // Adjust as needed for Y-axis
            case 'pro':
                return '10px'; // Adjust as needed for Y-axis
            case 'standard':
            default:
                return '5px'; // Adjust as needed for Y-axis
        }
    };

    return (
        <div className="listing-card-seven border-20 p-20 mb-50 wow fadeInUp">
            <div className="d-flex flex-wrap layout-one">
                <div
                    style={{
                        height: item?.type === "premium" ? 150 : "100%",
                        marginTop: getImageMarginTop() // Apply conditional margin for image (Y-axis)
                    }}
                    className={`position-relative z-1 border-20 overflow-hidden ${item?.type !== "standard" ? item?.bg_img + " " + "img-gallery" : ""}`}
                >
                    {item?.type !== "standard" && item?.imageUrl &&
                        <Image src={item?.imageUrl} alt="img" width={0} height={0} sizes="100vw"
                               style={{ width: '100%', height: '100%' }} />}
                    <div className={`tag border-20 ${item?.tag_bg}`}>{item?.tag}</div>
                </div>
                <div className="property-info position-relative"
                     style={{
                         width: item?.type === "standard" ? "100%" : "calc(100% - 326px)",
                         paddingLeft: item?.type === "standard" ? "0" : "20px"
                     }}>
                    <Link
                        href={`/listing_details_03?id=${item.id}&name=${item.name}&latitude=${latitude}&longitude=${longitude}`}
                        className="title tran3s mb-15"
                        style={{
                            maxWidth: 550,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            marginLeft: getHeaderMarginLeft() // Apply conditional margin for header text (X-axis)
                        }}
                    >
                        {item?.name}
                    </Link>

                    <Box display="flex" alignItems="baseline" mb={item?.type === "standard" ? 4 : 0}>
                        <Typography variant="subtitle1">{item?.distance + " " + "Mi"}</Typography>
                        <div style={{ display: "flex", alignItems: "center", paddingLeft: 16, marginTop: 6 }}>
                            <i className="bi bi-geo-alt"></i>
                            <Typography sx={{ pl: 1, pt: 0.5 }} variant="subtitle2">{item.address}</Typography>
                        </div>
                    </Box>

                    {item?.type !== "standard" &&
                        <Box
                            sx={{
                                minHeight: item?.type === "pro" ? 140 : "auto",
                                my: 1.5,
                                marginTop: getDescriptionMarginTop() // Apply conditional margin for description text (Y-axis)
                            }}
                        >
                            <div
                                style={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 9
                                }}
                                dangerouslySetInnerHTML={{ __html: item?.description }}
                            ></div>
                        </Box>
                    }

                    <div className="mt-30 pt-30 pb-5 d-none d-lg-block"
                         style={{ position: "absolute", width: "-webkit-fill-available", bottom: -30 }}>
                        {/* Removed buttons */}
                    </div>
                    <div className="pl-footer d-flex flex-wrap align-items-center justify-content-between">
                        <ul className="style-none d-flex action-icons on-top" style={{ alignItems: "center" }}>
                            <li>
                                <button onClick={handleShare} className="btn-ten rounded-0">
                                    <span>Share</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={handleContactModal} className="btn-ten rounded-0">
                                    <span>Contact</span>
                                </button>
                            </li>
                        </ul>
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
            </Dialog>
        </div>
    );
};

export default ListingCard;
