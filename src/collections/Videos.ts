import type { CollectionConfig } from "payload/types";
import { protectRoles } from "./hooks/protectRoles";
import { checkRole } from "./access/checkRole";
import { anyone } from "./access/anyone";
import adminsAndUser from "./access/adminsAndUser";
import { admins } from "./access/admins";
import { loginAfterCreate } from "./hooks/loginAfterCreate";

export const Videos: CollectionConfig = {
  slug: "videos",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: adminsAndUser,
    read: adminsAndUser,
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
