import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PUT(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {userId, newPassword} = reqBody;

    if(!newPassword){
      return NextResponse.json({
        message: "please provide new password",
        success: false
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);

    const user = await User.findByIdAndUpdate(userId, {password: hashedPass});

    if(!user){
      return NextResponse.json({
        message: "invalid user id",
        success: false
      })
    }

    return NextResponse.json({
      message: "password changed successfully",
      success: true
    })

  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false
    })
  }
}