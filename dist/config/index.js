"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_CATEGORIES = void 0;
// as const fixes the type as of the value
// //eg :- value cannpot be anything than ui_kits for the UI Kits
exports.PRODUCT_CATEGORIES = [
    {
        label: "UI Kits",
        value: "ui_kits",
        featured: [
            {
                name: "Editor picks",
                href: "/products?category=ui_kits",
                imageSrc: "/nav/ui-kits/mixed.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=ui_kits&sort=desc",
                imageSrc: "/nav/ui-kits/blue.jpg",
            },
            {
                name: "Bestsellers",
                href: "/products?category=ui_kits",
                imageSrc: "/nav/ui-kits/purple.jpg",
            },
        ],
    },
    {
        label: "Icons",
        value: "icons",
        featured: [
            {
                name: "Favorite Icon Picks",
                href: "/products?category=icons",
                imageSrc: "/nav/icons/picks.jpg",
            },
            {
                name: "New Arrivals",
                href: "/products?category=icons&sort=desc",
                imageSrc: "/nav/icons/new.jpg",
            },
            {
                name: "Bestselling Icons",
                href: "/products?category=icons",
                imageSrc: "/nav/icons/bestsellers.jpg",
            },
        ],
    },
];
