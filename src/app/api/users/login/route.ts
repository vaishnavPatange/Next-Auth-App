import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody)
    const user = await User.findOne({ email });
    console.log(user)
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

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

    console.log(token)

    const response = NextResponse.json({
      message: "User logged-in successfully",
      success: true
    });

    // now response will have the access of cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
      status: 500
    })
  }
}