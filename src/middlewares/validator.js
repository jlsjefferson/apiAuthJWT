/**
 * validation req.querys or req.body
 */

 const validationMiddleware = schema => async (req, res, next) => {
  let body;

  if (Object.keys(req.body).length === 0) {
    body = req.query;
  } else {
    body = await req.body;
  }
  try {
    await schema.validate(body);
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};


module.exports = { validationMiddleware };
