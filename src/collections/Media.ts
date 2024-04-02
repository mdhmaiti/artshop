import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

//
// it tells  only the specific user who uploaded the image and the admin can have access to the image
//
const isAdminOrHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    return {
      user: {
        equals: req.user.id,
      },
    };
  };

export const Media: CollectionConfig = {
  slug: "media",
  // paylaod hooks change the shape of the data model;
  // spreading the data means to preserve the curerent model of the media;
  // the aim is to the user or seller should only able to that they upload in the media; but instead of connecting the image to the product and then to the user;
  // it is much more easy to directly connect a user id to the product image; it also adds extra security;
  // here the user is who created the product
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      if (!req.user || !referer?.includes("sell")) {
        return true;
      }

      return await isAdminOrHasAccessToImages()({ req });
    },
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  // admin dashboard can see everything if he is not an admin
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  //
  //payload have their own storage system literally wow; i can also configure my own things
  //
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    // it means it takes images of any types
    //
    mimeTypes: ["image/*"],
  },
  // establishing a formal relationship which is useful for the quering
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
};
