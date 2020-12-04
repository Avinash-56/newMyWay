const express = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: config.get("Mailgun_API"),
  domain: config.get("DOMAIN"),
});
const bcrypt = require("bcryptjs");
const ld = require("lodash");

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status("400").json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentilas" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentilas" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("JWTSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500);
    }
  }
);

router.post(
  "/register",[
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password with atleast 6 characters"
    ).isLength({ min: 6 }),
  ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status("400").json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      const token = jwt.sign(
        { name, email, password },
        config.get("JWTSecret"),
        {
          expiresIn: 36000,
        }
      );

      const data = {
        from: "avinashupadhyay56@gmail.com",
        to: email,
        subject: "Account Verification",
        html: `<h2>Please click on the given link to Verify your Account</h2>
      <p>${config.get("Client_URL")}/activate/password/${token}</p>
      
      `,
      };
      await mg.messages().send(data)
      return res.json({msg: "Email sent, please Activate your account"})

    } catch (error) {
      console.log(error.message);
      res.status(500);
    }
  }
);

router.post('/email-activate', (req,res)=>{
  const {token} = req.body
  if(!token) return res.json({msg: 'Unauthorized'})
  try {
    jwt.verify(token, config.get("JWTSecret"), async (err, decoded)=>{
      if (err) return res.status(401).json({ msg: "Invalid Token" });  
      const {name, email, password} = decoded
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      
      user = new User({
        name,
        password,
        email,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.send({msg: 'Sign Up successfull'})
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // jwt.sign(
      //   payload,
      //   config.get("JWTSecret"),
      //   {
      //     expiresIn: 360000,
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     return res.json({ token });
      //   }
      // );
     
    } 

    );
  }
    catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.put(
  "/forgot",
  [check("email", "Email is required").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status("400").json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "No user found with this mail" });

      const payload = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(payload, config.get("JWTSecret"), {
        expiresIn: 36000,
      });

      const data = {
        from: "avinashupadhyay56@gmail.com",
        to: email,
        subject: "Password reset",
        html: `<h2>Please click on the given link to reset your password</h2>
    <p>${config.get("Client_URL")}/activate/password/${token}</p>
    `,
      };
      await user.updateOne({ forgotPasswordToken: token });

      mg.messages().send(data, (err, body) => {
        if (err) return res.json({ msg: err.message });

        return res.json({
          msg: "Email has been sent, kindly reset your password",
        });
      });
    } catch (err) {
      console.error(err);
      res.send("Server Error");
    }
  }
);

router.put(
  "/reset-password",
  [
    check("newPassword", "Password legth should be grater than 5").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status("400").json({ errors: errors.array() });
    }

    let { forgotPasswordToken, newPassword } = req.body;

    try {
      if (!forgotPasswordToken)
        return res.status(401).json({ msg: "Authentiaction Denied" });
      const isMatch = jwt.verify(forgotPasswordToken, config.get("JWTSecret"));
      if (!isMatch) return res.status(401).json({ msg: "Invalid Token" });

      let user = await User.findOne({ forgotPasswordToken });
      if (!user) res.status(401).json({ msg: "Invalid token" });
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);
      const pass = {
        password: newPassword,
      };
      user = ld.extend(user, pass);
      await user.save();
      res.json("Password Updated");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
