"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const BLockFeatureOne = () => {
    const [hover, setHover] = useState(false);

    return (
        <div className="block-feature-two mt-150 xl-mt-100">
            <div className="container">
                <div className="row gx-xl-5">
                    <div className="col-lg-6 wow fadeInLeft">
                        <div className="me-xxl-4">
                            <div className="title-one mb-60 lg-mb-40">
                                <div className="upper-title">About us</div>
                                <h3>Online <span>Truck </span> Service directory</h3>
                                <p className="fs-22">
                                    Welcome to Truck Support, your go-to for all truck service needs! We connect you with trusted service providers for maintenance, repairs, and more.<br/> Skip the endless searches and get back on the road confidently with our reliable directory. Your journey just got a whole lot smoother!
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="btn-two"
                                style={{
                                    backgroundColor: hover ? '#ff6600' : '#000000', // Orange on hover, black otherwise
                                    color: '#fff', // Button text color
                                    textDecoration: 'none', // Remove underline
                                    fontWeight: '500', // Bold text
                                    borderRadius: '10px', // Rounded corners
                                    padding: '0 22px', // Adjust padding
                                    fontSize: '16px', // Inherit font size
                                    lineHeight: '48px', // Maintain normal line height
                                    border: `1px solid ${hover ? '#ff6600' : '#000000'}`, // Orange border on hover, black otherwise
                                    display: 'inline-flex', // Ensure inline-block display
                                    boxSizing: 'border-box', // Include padding and border in total width and height
                                    margin: '0', // Ensure no margin issues
                                    transition: 'background-color 0.3s ease, border-color 0.3s ease', // Smooth transition for hover effect
                                }}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 wow fadeInRight">
                        <div className="block-two md-mt-40">
                            <div className="bg-wrapper">
                                <h5>Who we are?</h5>
                                <p className="fs-22 lh-lg mt-20">
                                    TruckSupport.com offers 24/7 access to verified truck services, detailed listings, and comprehensive support, all for free! Trusted, easy-to-use and always available.
                                </p>
                                <h5 className="top-line">Our Mission</h5>
                                <p className="fs-22 lh-lg mt-20">
                                    Connecting drivers and fleets with reliable services 24/7 to ensure seamless operation and minimal downtime on the road.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BLockFeatureOne;
