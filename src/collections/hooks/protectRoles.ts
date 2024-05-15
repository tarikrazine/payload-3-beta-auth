import type { FieldHook } from "payload/types";

import type { User } from "../../payload-types";

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<User & { id: string }> = async (
  { req, data },
) => {
  const admin = req.user?.roles?.includes("admin");
  const user = data?.email === "demo@payloadcms.com";

  console.log("🚨🚨🚨", req.user);

  const isAdmin = admin || user; // for the seed script

  if (!isAdmin) {
    return ["user"];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add("user");
  return [...userRoles];
};
