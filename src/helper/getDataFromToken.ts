import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!);
    if(tokenData instanceof Object){
      return tokenData?.id;
    }
  } catch (error: unknown) {
    if(error instanceof Error){
      throw error;
    }
  }
}