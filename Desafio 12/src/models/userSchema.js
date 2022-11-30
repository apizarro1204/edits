import { Schema, model } from "mongoose" 

const UserSchema = new Schema({
	username: { type: String, required: true,  unique: true },
	password: { type: String, required: true },
	address: { type: String, required: true, },
});

const userModel = model("user", UserSchema)
export default userModel;