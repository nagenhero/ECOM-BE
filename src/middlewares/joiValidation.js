import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  console.log("the error is:", error);
  error
    ? next({
        status: "erroriscomming", //custom error
        message: error.message, // joi validation error message
        //for example:email not valid
      })
    : next();

  //  If no error, pass control to the next middleware or route   // no need to pass req, res to next here

  // : res.send({
  //     message: "your are good",
  //   });
};
// register validator
export const registerValidator = (req, res, next) => {
  const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string(),
  });
  joiValidator(registerSchema, req, res, next);
};

//login validator
export const loginValidator = (req, res, next) => {
  // const loginSchema=Joi.object({})
  const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });
  joiValidator(loginSchema, req, res, next);
};
//categories validator
export const createCategoriesValidator = (req, res, next) => {
  const createCategoriesSchema = Joi.object({
    name: Joi.string().required(),
    adminId: Joi.string(),
  });
  joiValidator(createCategoriesSchema, req, res, next);
};
