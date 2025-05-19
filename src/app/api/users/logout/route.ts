import { NextResponse } from "next/server";


export async function GET(){
  try {
    const response = NextResponse.json({
      message: "User logged out successfully",
      success: true
    })

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path:"/"
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