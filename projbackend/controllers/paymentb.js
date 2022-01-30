const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "x9h6bc6h8pb75mt9",
  publicKey: "dm4v9bc8cktjtywx",
  privateKey: "cf53e50e7397a797271770d8b063b2e8"
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.send(response);
      }
    });
  };
  
  exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
  
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
  
        options: {
          submitForSettlement: true
        }
      },
      function(err, result) {
        if (err) {
          res.status(500).json(error);
        } else {
          res.json(result);
        }
      }
    );
  };
  