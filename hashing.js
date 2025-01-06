import bcrypt from "bcryptjs";

// generate hash code

let password = "Password@123";

let hashedPassword = await bcrypt.hash(password, 10); //.hash(pw, salt)

// console.log(hashedPassword);

// compare hash code

let isValidPassword = await bcrypt.compare(password, hashedPassword);
console.log(isValidPassword);
