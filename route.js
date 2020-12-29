const router = require('express').Router();
let Users = require('./users');

router.route('/:email').get((req, res) => {
    Users.findOne({email:req.params.email},{_id:0,__v:0})
        .then((user) => {
        if(user){
            res.json({message:'userdetails fetched successfully',userDetails:user})
        }else{
            res.json({message:'no user found'})
        }        
    }).catch(() => res.status(400).json({message: 'no data found'}));
});
//To add new user 
router.route('/').post((req, res) => {
    var params = req.body;
    const user = new Users({
        name: params.name,
        email: params.email,
        createdAt: new Date().getTime().toString()
    });
    Users.findOne({ email: params.email })
        .then((found) => {
            if (!found) {
                user.save()
                    .then(() => res.json({ message: 'user added', email: params.email }))
                    .catch(() => res.status(400).json({message: 'something went wrong'}));
            } else {
                res.status(400).json({ message: "use not found with this email" })
            }
        }).catch(() => res.status(400).json({message: 'no data found'}));

})
//to update user data
router.route('/isReplayed').put((req, res) => {
    var params = req.body;
    Users.findOne({ email: params.email ,isReplayed:false}) //Need to check before update is user is available or not, get only un replayed users
        .then(users => {
            users.isReplayed = true,
            users.updatedAt = new Date().getTime().toString()
            users.save()
                .then(() => res.json({message: 'user data updated'}))
                .catch(() => res.status(400).json({message: 'something went wrong'}));
        }).catch(() => res.status(400).json({ message: 'no data available to update' }));
});
//to delete user data by user email
router.route('/').delete((req, res) => {
    var params = req.body;
    Users.findOne({ email: params.email }) //Need to check before delete is user is available or not
        .then(found => {
            if (found) {
                Users.deleteOne({ email: params.email })
                    .then(() => res.json({message:'user deleted successfully'}))
                    .catch(() => res.status(400).json({message: 'something went wrong'}));
            } else {
                res.json({ message: 'user deleted successfully' });
            }
        });

});
module.exports = router