import React from 'react';
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import PrivacyPolicy from "@/components/privacy-policy";
import FooterOne from "@/layouts/footers/FooterOne";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Privacy and Policy - Truck Support',
    description: '',
}

const Index = () => {
    return (
        <Wrapper>
            <HeaderOne style={true} />
            <PrivacyPolicy/>
            <FooterOne style={true} />
        </Wrapper>
    );
};

export default Index;