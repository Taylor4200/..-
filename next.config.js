/** @type {import('next').NextConfig} */
const nextConfig = {
    // this needs to be set once all type errors are resolved
    typescript: {
        ignoreBuildErrors: true,
    },
    // this needs to b reset once all type errors are resovled
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_GOOGLEAPIKEY: "AIzaSyAPOl2oO16KO0fjLp_AI-5tLqwrrzPhWUM",
    },
};

export default nextConfig;
