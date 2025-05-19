import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {token} = reqBody;
    console.log("token is : " ,token);
    if(!token){
      return NextResponse.json({
        message: "token not found",
        success: false
      })
    }

    const user = await User.findOne({forgotPasswordToken: token , forgotPasswordTokenExpiry: {$gt: Date.now()}});

    if(!user){
      return NextResponse.json({
        message: "Invalid or Expired Token",
        success: false
      })
    }

    return NextResponse.json({
      message: "token verified successfully",
      success: true,
      userId: user._id
    });

  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: error.message,
      success: false
    })
  }
}