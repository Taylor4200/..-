import React from 'react';
import TermsService from "@/components/terms-of-service";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Terms and Conditions - Truck Support',
    description: '',
}

const Page = () => {
    return (
        <Wrapper>
            <HeaderOne style={true} />
            <TermsService/>
            <FooterOne style={true} />
        </Wrapper>
    );
};

export default Page;