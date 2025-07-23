import { User } from "../src/models/user.models";
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
