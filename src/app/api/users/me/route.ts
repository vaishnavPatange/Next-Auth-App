import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function GET(request: NextRequest){
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password -isAdmin -_id");
    return NextResponse.json({
      message: "User found",
      user
    })

  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false
    })
  }
}