import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User doesn't exists",
        success: false
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword)
    if (!isValidPassword) {
      return NextResponse.json({
        message: "Invalid Password",
        success: false
      })
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    console.log(tokenData)

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    console.log(token)

    const response = NextResponse.json({
      message: "User logged-in successfully",
      success: true
    });

    // now response will have the access of cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;

  } catch (error: unknown) {
    if(error instanceof Error){
      return NextResponse.json({
      message: error.message,
      success: false
    })
    }
  }
}