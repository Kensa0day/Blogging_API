import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    accountType: {
        type: String,
        default: "User"
    },
    image: {
        type: String
    },
    password: {
        type: String,
        select: true
    },
    provider: {
        type: String,
        default: "Ale0day"
    },
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: "Followers"
        
    }],
}, {timestamps: true}

)

const Users = mongoose.model("Users", userSchema)
export default Users;