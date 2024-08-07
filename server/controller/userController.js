const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res
        .status(401)
        .send({ success: false, message: "maydonni to'liq toldiring" });
    }
    const userexist = await userModel.findOne({ email });
    if (userexist) {
      return res
        .status(400)
        .send({ success: false, message: "bu odam tzimda bor" });
    }
    // let salt = bcrypt.genSaltSync(10);

    // const hashPassword = await bcrypt.hash(password, salt);

    // const user = await userModel.create({
    //   userName,
    //   email,
    //   password: hashPassword,
    // });
    const user = await userModel.create(req.body);
    res
      .status(201)
      .send({ success: true, message: "Ro'yxatdan o'tdi", user: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "register api dan xatolik" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(401).send({ message: "email nato'gri" });
    }
    if (!password) {
      return res.status(401).send({ message: "paro'l nato'gri" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "bu odam tzimda yo'q" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "parol xato",
      });
    }
    sendTokenResponse(user, 200, res);
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    // res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 60 });
    // res.status(200).send({
    //   success: true,
    //   message: "logindan otdi",
    //   token: token,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "login api dan xatolik" });
  }
};
const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  const options = { maxAge: 60 * 60 * 1000, httpOnly: true };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(codeStatus).cookie("token", token, options).json({
    success: true,
    user: user,
  });
};

const alluser = async (req, res) => {
  try {
    const users = await (await userModel.find({})).reverse();
    if (!users) {
      return res.status(404).send({
        success: false,
        message: "foydalanuvchilar yo'q",
      });
    }
    res.status(200).send({
      success: true,
      message: "success",
      foydalanuvchilar_soni: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "alluser controller apidan xatolik",
      error,
    });
  }
};

module.exports = { registerController, loginController, alluser };
