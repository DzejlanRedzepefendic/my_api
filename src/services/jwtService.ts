import jwt from "jsonwebtoken";

function createJwtToken(userInfo: any, secret: string, time: string = "30d") {
  return jwt.sign(userInfo, secret, { expiresIn: time });
}

function verifyJwtToken(signedToken: string, secret: string) {
  return jwt.verify(signedToken, secret);
}

function decodeJwtToken(signedToken: string) {
  return jwt.decode(signedToken);
}
export { createJwtToken, verifyJwtToken,decodeJwtToken };
