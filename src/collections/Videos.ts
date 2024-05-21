import type { CollectionConfig } from "payload/types";
import { checkRole } from "./access/checkRole";
import { anyone } from "./access/anyone";
import adminsAndUser from "./access/adminsAndUser";

export const Videos: CollectionConfig = {
  slug: "videos",
  upload: true,
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: adminsAndUser,
    read: anyone,
    update: adminsAndUser,
    delete: adminsAndUser,
    admin: ({ req: { user } }) => checkRole(["admin"], user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "thumbnail",
      type: "text",
      required: true,
    },
    {
      name: "prompt",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      name: "video",
      type: "text",
      required: true,
    },
  ],
};
