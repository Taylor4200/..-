import {Libraries} from "@react-google-maps/api";

export const animationCreate = () => {
    if (typeof window !== "undefined") {
        import("wowjs").then((module) => {
            const WOW = module.default;
            new WOW.WOW({live: false}).init()
        });
    }
};

export const libraries: Libraries = ["places"];
