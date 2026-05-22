import { body } from "express-validator";

export const createLeadValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("source")
    .trim()
    .notEmpty()
    .withMessage("Source is required"),
];