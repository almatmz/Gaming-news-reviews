const Joi = require("joi");

const validateRegister = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const validateReview = (data) => {
  const schema = Joi.object({
    gameTitle: Joi.string().required(),
    content: Joi.string().min(10).required(),
    rating: Joi.number().min(1).max(10).required(),
  });
  return schema.validate(data);
};

module.exports = { validateRegister, validateReview };
