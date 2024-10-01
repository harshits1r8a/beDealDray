import { model, Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    Name: {
      type: "String",
      required: [true, "Name is required!"],
      minLength: [5, "Name must be atleast 5 character!"],
      maxLength: [50, "Name must be atleast 5 character!"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: "String",
      required: [true, "email is required!"],
      lowercase: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    number: {
      type: String,
      required: true,
      minLength: [10, "Enter valid mobile number!"],
    },
    designation: {
        type: "String",
        required: [true, "designation is required!"],
      },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    course :{
        type: String,
        enum: ['MCA', 'BCA', 'BSC'],
        required: true
    },
    avatar: {
      public_id: {
        type: "String",
      },
      secure_url: {
        type: "String",
      },
    },
  },
  { timestamps: true }
);





export default model("User", employeeSchema);
