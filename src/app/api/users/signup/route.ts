import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";


connect();

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {username, email, password} = reqBody;

    if(!username || !email || !password){
      return NextResponse.json({
        message: "All fields are neccessary",
        success: false
      })
    }

    const user = await User.findOne({email});
    if(user){
      return NextResponse.json({
        message: "User already exists",
        success: false
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      username: username, 
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    });


  } catch (error: any) {
    return NextResponse.json({message: error.message, success: false});
  }
}