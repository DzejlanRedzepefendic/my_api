import { Request, Response } from "express";

const callback = (req: Request, res: Response) => {
  if (req.user) res.send(req.user.userName);
};

const logout = (req: Request, res: Response) => {
  req.logout();
  req.session = null;

  res.send(req.user);
};

export { callback, logout };
