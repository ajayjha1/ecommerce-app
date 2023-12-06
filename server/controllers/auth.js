const User = require('../models/user')

exports.createOrUpdateUser = async (req, res) =>{
    const { name, picture, email } = req.user
    
        const user = await User.findOneAndUpdate({email : email}, {name : name, picture: picture}, {new: true})
    
    if(user) {
        console.log("controller-> USER UPDATED", user)
        res.json(user)
    } else{
        const newUser = await new User({
            email,
            name : email.split("@")[0],
            picture
        }).save();
        res.json(newUser)
        console.log("controller-> USER CREATED", newUser)
    }
}

exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email})
    .then((data) =>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err.message)
    })
    // {
    //     if(err) throw new Error("controller error", err);
    //     res.json(user)
    //     console.log("controller--> current user", user)
    // });
};