//generate a token

import jwt from "jsonwebtoken";

let info = {
  id: "1234",
};

let secretKey = "n9solution";

// EXPIRY INFO MUST BE IN SAME FORMAT
let expiryInfo = {
  expiresIn: "1h",
};

let token = await jwt.sign(info, secretKey, expiryInfo);

// console.log(token);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJpYXQiOjE3MzYwODA1NTUsImV4cCI6MTczNjA4NDE1NX0.nWC0bHUlzGGiYQlGbq-o8lDmTqZx7CQchx4Cgo11DH0

// verify token

let token1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJpYXQiOjE3MzYwODA1NTUsImV4cCI6MTczNjA4NDE1NX0.nWC0bHUlzGGiYQlGbq-o8lDmTqZx7CQchx4Cgo11DH0";

try {
  // to verify token, a token must be made from given secret key and it should not exceed expiryInfo
  let infoObj = jwt.verify(token1, secretKey);
  console.log(infoObj);
} catch (error) {
  console.log(error);
}
