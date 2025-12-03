import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type : String,required: true },
        email:{
            type : String,
            required: true,
            unique: true,

        },
        password:{
            type: String,
            required: true
        },
    },
    {timestamps: true}
);  

// Hash password before save
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
   this.password = await bcrypt.hash(this.password,10);
  });
// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

export default mongoose.model("User",userSchema);