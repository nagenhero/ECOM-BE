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
    thumbnail: Joi.string().required(),
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
  });
  joiValidator(createCategoriesSchema, req, res, next);
};

export const createSubCategoriesValidator = (req, res, next) => {
  const createCategoriesSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
  });
  joiValidator(createCategoriesSchema, req, res, next);
};
// create product validator
export const createProductValidator = (req, res, next) => {
  // Define the Joi validation schema for sizes
  // const sizesSchema = Joi.alternatives().try(
  //   Joi.string().valid("XS", "S", "M", "L", "XL"), // Single size validation
  //   Joi.array().items(Joi.string().valid("XS", "S", "M", "L", "XL")) // Array of sizes validation
  // );

  const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    // sizes: sizesSchema.required(),
    stock: Joi.number().required(),
    thumbnail: Joi.string().required(),
    averageRating: Joi.number().required(),
    category: Joi.string().length(24).hex().required(),
    reviews: Joi.string().length(24).hex().required(),
  }).unknown();
  joiValidator(productSchema, req, res, next);
};

export const updateProductValidator = (req, res, next) => {
  const updateProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    thumbnail: Joi.string().required(),
    averageRating: Joi.number().required(),
    category: Joi.string().length(24).hex().required(),
    reviews: Joi.string().length(24).hex().required(),
  });
  joiValidator(updateProductSchema, req, res, next);
};
