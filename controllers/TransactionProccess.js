const User = require('../models/user');
const Orders = require('../models/orders');



exports.purchase =  function(req, res, next) {
    console.log(req.body)
    User.findOne({token: req.body.data.token}, function(err,doc){
        if (err){
        console.log(err)
    } else {
        const order = new Orders({
            uid: req.body.data.uid,
            email: doc.email,
            productID: 1,
            productName: 1,
            quantity: req.body.data.cart 
        });
        // console.log("Result : ", doc);
        order.save(function(err){
            if(err) 
                return err 

            res.json("Success")
            })
        }
    });
}
