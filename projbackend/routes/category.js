const express = require("express");
const router = express.Router();

const { getCategoryById, 
        createCategory, 
        getCategory, 
        getAllCategory ,
        updateCategory,
        removeCategory
       } = require("../controllers/category");
const { isAdmin , isAuthenticated , isSignedIn } = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//PARAMS
router.param("userId" , getUserById);
router.param("categoryId" , getCategoryById);

//Actual ROUTES Goes here

//Create route
router.post("/category/create/:userId" ,
              isSignedIn, 
              isAuthenticated,
              isAdmin,
              createCategory);

//Read route
router.get("/category/:categoryId" ,getCategory);
router.get("/categories" ,getAllCategory);

//Update route
router.put("/category/:categoryId/:userId" ,
              isSignedIn, 
              isAuthenticated,
              isAdmin,
              updateCategory);

//Delete Route
router.delete("/category/:categoryId/:userId" ,
              isSignedIn, 
              isAuthenticated,
              isAdmin,
              removeCategory);

module.exports = router;
