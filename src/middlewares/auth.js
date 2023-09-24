const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return res
        .status(400)
        .send({
          status: false,
          message: "Token must be present in request hearder",
        });

    jwt.verify(token, "assignment4opt", function (err, decodedToken) {
      if (err) {
        return res
          .status(401)
          .send({
            status: false,
            message: "token might be expried or not valid",
          });
      } else {
        req.authUser = decodedToken.userId;
        next();
      }
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { authentication };
