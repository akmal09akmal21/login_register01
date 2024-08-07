// const jwt = require("jsonwebtoken");
// const userModel = require("../model/userModel");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // const verified = jwt.verify(token, process.env.JWT_SECRET);
//     // req.user = verified.user;

//     //verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await userModel.findById(decoded.id);
//     next();

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// module.exports = auth;
