import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";
type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: string;
    username?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: string;
      username?: string | null;
    };
  }
}
