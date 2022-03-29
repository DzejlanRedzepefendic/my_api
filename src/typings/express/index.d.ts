declare namespace Express {
  export interface Request {
    user?: {
      _id?: any;
      googleId?: string;
      userName?: string;
      __v?: number;
    };
  }
}
