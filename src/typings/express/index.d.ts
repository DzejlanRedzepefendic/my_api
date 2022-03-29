declare namespace Express {
  export interface User {
    _id?: any | undefined;
    googleId?: string | undefined;
    userName?: string | undefined;
    __v?: number | undefined;
  }
  export interface Request {
    user?: User;
  }
}
