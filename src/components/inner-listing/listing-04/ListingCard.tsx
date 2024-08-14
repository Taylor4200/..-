"use client"

import React, {useState} from 'react';
import Fancybox from "@/components/common/Fancybox";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@mui/material";
import {trackInteraction} from "@/utils/utilsServer";
import {useMediaQuery, useTheme} from "@mui/system";
import {useInView} from "react-intersection-observer";

const ListingCard = ({item}: any) => {

    const [contactModal, setContactModal] = useState(false);
    const searchParams = useSearchParams();

    const {ref} = useInView({
        triggerOnce: true,
        onChange: (inView) => {
            if (inView) {
                trackInteraction(item.id, false)
            }
        },
    });

    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    const handleContactModal = () => setContactModal(prevState => !prevState);

    const handleUserCalled = async () => {
        if (!item?.phone && !item?.secondary_Phone) return;
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

    const ContactDetails = () => (
        <div className="pl-footer d-flex flex-wrap align-items-center justify-content-between">
            <ul className="style-none d-flex action-icons">
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
    )

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div className="listing-card-seven border-20 p-20 mb-50 wow fadeInUp">
            <Grid container spacing={2} p={2} ref={ref}>
                <Box px={2} className="property-info position-relative" display="flex" alignItems="center" width="100%"
                     justifyContent="space-between">
                    <Link
                        href={`/listing_details_03?id=${item.id}&name=${item.name}&latitude=${latitude}&longitude=${longitude}`}
                        className="title tran3s mb-15"
                        style={{
                            width: "100%",
                            maxWidth: 550,
                            display: !matches ? "block" : '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: item?.type === "premium" ? 2 : 1, // Adjust the number of lines for the title in premium listings
                        }}
                    >
                        {item?.name}
                    </Link>
                    {
                        matches ?
                            <ContactDetails/> : null
                    }

                </Box>

                {
                    item?.type !== "standard" && item?.imageUrl &&
                    <Grid item xs={12} md={3}>
                        <Image src={item?.imageUrl} alt="img" width={0} height={0} sizes="100vw"
                               style={{width: '100%', height: '100%'}}/>
                    </Grid>
                }


                <Grid item sm={(item?.type !== "standard" && item?.imageUrl) ? 9 : 12} xs={12} pb={2}>
                    <Box display="flex" justifyContent="center" flexDirection="column">
                        <Box display="flex" alignItems="center">
                            <Typography sx={{mr: 2, minWidth: 40}}
                                        variant="subtitle1">{item?.distance + " " + "Mi"}</Typography>

                            <i className="bi bi-geo-alt"></i>
                            <Typography sx={{pl: 1, pt: 0.5}} variant="subtitle2">{item.address}</Typography>
                        </Box>

                        {
                            item?.type !== "standard" ?
                                <div
                                    style={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: item?.type === "premium" ? 5 : 9 // Adjust the number of lines for description in premium listings
                                    }}
                                    dangerouslySetInnerHTML={{__html: item?.description}}
                                ></div> : null
                        }


                    </Box>
                </Grid>

                {
                    !matches ?
                        <ContactDetails/> : null
                }

            </Grid>

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
                            <DialogContentText variant="body1" fontWeight="bold">{item?.secondary_Phone}</DialogContentText>

                        </Box>

                        <a className="btn-ten rounded-0" onClick={handleUserCalled}
                           href={(item?.phone || item?.secondary_Phone) ? "tel:" + (item?.phone || item?.secondary_Phone) : "#"}>
                            <span>Call</span>
                        </a>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListingCard;
