import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
// import { Products } from "./collections/Products/Products";
// import { Media } from "./collections/Media";
// import { ProductFiles } from "./collections/ProductFile";
// import { Orders } from "./collections/Orders";

// this dot env is requied other wise the process.env does not act here; i do not know why.
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  // collections: [Users, Products, Media, ProductFiles, Orders],
  collections: [Users],
  routes: {
    admin: "/sell",
  },
  admin: {
    // here the user is assigned a  custom collection called the users defined in the collections folder.
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalHippo",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    // this is the befit of the cms
    // it automatically create the types using the script in the package.json
    // it helps to prevent the errors
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
