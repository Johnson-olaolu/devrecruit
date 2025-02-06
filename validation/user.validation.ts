import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().notEmpty().withMessage("User Email is required"),
  body("password")
    .isString()
    .isStrongPassword({
      minLength: 6,
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
    })
    .withMessage("Please enter a valid password"),
];
