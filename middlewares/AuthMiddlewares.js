import jwt from "jsonwebtoken";

const { verify } = jwt;

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.json({ err: "User not found" });
  }

  try {
    const validToken = verify(accessToken, "importantsecrettoken");
    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    res.send({ err: err });
  }
};

export default validateToken;
