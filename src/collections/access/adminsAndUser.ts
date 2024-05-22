import type { AccessArgs, AccessResult } from "payload/config";

import { checkRole } from "./checkRole";

const adminsAndUser = ({ req: { user } }: AccessArgs): any => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    return {
      id: user.id,
    };
  }

  return false;
};

export default adminsAndUser;
