const express = require("express");
const router = express.Router();

const { isAdmin , isAuthenticated , isSignedIn } = require("../controllers/auth");
const { getUserById , pushOrderInPurchaseList } = require("../controllers/user");
const {updateStock } = require("../controllers/product");

const { getOrderById , 
        createOrder , 
        getAllOrders , 
        updateStatus, 
        getOrderStatus} 
        = require("../controllers/order");

//all of param
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create route
router.post("/order/create/:userId" ,
             isSignedIn , 
             isAuthenticated , 
             pushOrderInPurchaseList , 
             updateStock , 
             createOrder);

//Read route
router.get("/order/all/:userId" , 
            isSignedIn, 
            isAuthenticated , 
            isAdmin , 
            getAllOrders);

//status of order routes
router.get("/order/status/:userId",
            isSignedIn , 
            isAuthenticated , 
            isAdmin , 
            getOrderStatus);

//update status route
router.put("/order/:orderId/status/:userId" ,  
            isSignedIn , 
            isAuthenticated , 
            isAdmin , 
            updateStatus);

module.exports = router;