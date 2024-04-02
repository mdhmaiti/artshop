"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var PrimaryActionEmail_1 = require("../components/emails/PrimaryActionEmail");
// admin is a user with just the extra prevelage and it just returns the user id
// access and the collectionconfig are the special type that comes from the payload
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user.role === "admin")
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
// here the idea is thd collection is the 'users';
// the users can be either 'user' or 'admin'
// the slug is the most imp as it determines the name of the collection;
// now to acrually show the users in the dashboard of the cms , pass the value of the users to the collection array in the payload config;
exports.Users = {
    slug: "users",
    // if there is no other condition like the external verify throught he emails or something
    // just write the auth:true ; to enable the default options
    // here the auth property comes fromt the payload
    // this ayth property somehow automatically gets the access of the token from the payload
    auth: {
        verify: {
            // initially to just test the things return a p tag or h tag mello medhashis to make it work
            // on clicking it takes to this route which has a token `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "verify your account",
                    buttonText: "Verify Account",
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token),
                });
                // return `<a href ='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'> verify-email</a>`;
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: function () { return true; },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
        defaultColumns: ["id"],
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
        },
        {
            name: "product_files",
            label: "Product files",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "product_files",
            hasMany: true,
        },
        {
            name: "role",
            defaultValue: "user",
            required: true,
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
        },
    ],
};
