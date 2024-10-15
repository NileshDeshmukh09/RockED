const db = require("../models");
const { User } = db;
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    console.log("Error in Creating user : ", err);
    return res.status(500).json({
      message: "Internal server error ",
      err: err.message,
    });
  }
};

module.exports = { createUser };
