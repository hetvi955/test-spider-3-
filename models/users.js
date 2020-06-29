const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        unique: true
    },
    password:{
        type:String,
        
    },
    email:  {
        type:String,
        unique: true
    }
});
var User= mongoose.model('myuser',UserSchema);
module.exports = User;
