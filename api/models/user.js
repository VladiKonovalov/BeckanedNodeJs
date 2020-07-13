const mongoose =require('mongoose');

const userSchema = mongoose.Schema(

    {
        _id: mongoose.Schema.Types.ObjectId,
        username:{type: String, require:true , unique : true },
        password:{type: String, require:true },
        isAdmin :{type: Boolean, defult: false }
    }
);
module.exports = mongoose.model('User',userSchema);