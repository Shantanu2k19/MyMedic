import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: false },
        image: { type: String, required: false, default:"/assets/logodark.svg" },
        isgooglelogin: { type:Boolean, require:true, default:false }, 
    }, 
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;