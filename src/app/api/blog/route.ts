/* import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { config } from "@/lib/config";

//import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient();

// export async function GET() {
//   // リクエストボディを展開
 
//   const res = await prisma.post.findMany();
//   console.log("kghajks",res)

 
//   return NextResponse.json(res);
// }


export  async function GET()  {
  // configオブジェクトの詳細が不明なため、具体的なURLは仮定しています
  const url = config.apiPrefix + config.apiHost + "/api/blog";

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(url, params);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('fetchBlogs error', error);
    return []; // エラーが発生した場合、空の配列を返します
  }
}; */