const Joi = require('joi');

// Define the product validation schema
const productSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Product name cannot be empty',
      'any.required': 'Product name is required',
    }),
  description: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 500 characters',
    }),
  price: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Price must be a valid number',
      'number.positive': 'Price must be greater than zero',
      'any.required': 'Price is required',
    }),
  isRecommended: Joi.boolean().optional(),
  isBestseller: Joi.boolean().optional(),
  status: Joi.string()
    .valid('available', 'out-of-stock')
    .optional()
    .messages({
      'any.only': 'Status must be either "available" or "out-of-stock"',
    }),
});

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false }); // Capture all errors
  if (error) {
    const messages = error.details.map((detail) => detail.message); // Collect all error messages
    return res.status(400).json({ message: 'Validation Error', errors: messages });
  }
  next();
};
