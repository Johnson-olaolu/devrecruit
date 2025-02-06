import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().notEmpty().withMessage("User Email is required"),
  body("password")
    .isString()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("Please enter a valid password"),
];

export const registerValidator = [
  body("name").isString().notEmpty().withMessage("User name is required"),
  body("email").isEmail().notEmpty().withMessage("User email is required"),
  body("password")
    .isString()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage("Please enter a valid password"),
];
