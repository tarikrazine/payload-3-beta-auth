import type { CollectionConfig } from "payload/types";
import { protectRoles } from "./hooks/protectRoles";
import { checkRole } from "./access/checkRole";
import { anyone } from "./access/anyone";
import adminsAndUser from "./access/adminsAndUser";
import { admins } from "./access/admins";
import { loginAfterCreate } from "./hooks/loginAfterCreate";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    create: anyone,
    read: adminsAndUser,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(["admin"], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  fields: [
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    // {
    //   name: "videos",
    //   type: "relationship",
    //   relationTo: "videos",
    //   hasMany: true,
    // },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
};
