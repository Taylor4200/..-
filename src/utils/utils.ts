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


export function Get_Distance(lat1: number, lat2: number, lon1: number, lon2: number, unit: string) {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    const value =  (c * r) * 0.621371;
    return Math.round(value);

}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// console.log('Taking a break...');
// await sleep(10000);
// console.log('Two second later');

export const UniqueServices = [
    "24 Hour Service",
    "Roadside Service",
    "Mobile Service",
    "Repair Shop",
    "Truck Repairs",
    "Trailer Repairs",
    "Tire Repairs",
    "RV Repairs",
    "Bus Repairs",
    "Computer Diagnostics",
    "Electrical Repair",
    "A/C Service",
    "Engine Repair",
    "Transmissions",
    "Drivetrain",
    "Welding Service",
    "PM Service",
    "Oil Change & Lube",
    "Fleet Maintenance",
    "Mobile Maintenance",
    "DOT Inspections",
    "DPF Cleaning",
    "APU Service",
    "Wheel Alignment",
    "Wheel Balance",
    "New Tires",
    "Used Tires",
    "Jump Starts",
    "Fuel Delivery",
    "Parts Store",
    "General Truck Parts",
    "General Trailer Parts",
    "Engine Components",
    "Transmission Parts",
    "Drivetrain Parts",
    "Steering Parts",
    "Suspension Parts",
    "Brakes",
    "Radiators",
    "Cooling System Parts",
    "Hydraulic Parts",
    "Electrical Parts",
    "Accessories",
    "Chrome Parts",
    "Cab Parts",
    "Body Parts",
    "APU Parts",
]