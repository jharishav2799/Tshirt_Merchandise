var express = require("express");
var router = express.Router();
const { check } = require('express-validator');
const { signout,signup,signin,isSignedIn } = require("../controllers/auth");


router.post("/signup" ,[
    check("name")
    .isLength({ min: 3 })
    .withMessage('name should be at least 3 chars long'),
    check("email").isEmail(),
    check("password").isLength({min : 3}).withMessage('password should be atleast 3 char long')
], signup);


router.post("/signin" ,[
    check("email").isEmail(),
    check("password").isLength({min : 1}).withMessage('password field is required')
], signin);

router.get("/signout" , signout);


module.exports = router;
