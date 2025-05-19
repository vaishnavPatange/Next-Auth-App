import { sendEmail } from "@/helper/mailer";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST (request: NextRequest){
  try {
    const reqBody = await request.json();

    const {email, userId} = reqBody;

    await sendEmail({email, emailType: "RESET", userId});

    return NextResponse.json({
      message: "verification mail sent to your email",
      success: true
    })

  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false
    })
  }
}