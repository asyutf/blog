import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main(){
    try {
      await prisma.$connect();
    } catch (err) {
      return Error("DB接続に失敗しました");
    }
}

//ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try{
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts },{ status: 200 });
  }  catch (err) {
    return NextResponse.json({ message: "Error", err },{ status: 500 });
  }  finally {
    await prisma.$disconnect();
  }
};

//ブログの投稿用API
export const POST = async (req: Request, res: NextResponse) => {
    try{
      const { title , description } = await req.json();

      await main();
      const posts = await prisma.post.create({ data: { title, description } });
      return NextResponse.json({ message: "Success", posts },{ status: 201 });
    }  catch (err) {
      return NextResponse.json({ message: "Error", err },{ status: 500 });
    }  finally {
      await prisma.$disconnect();
    }
  };

/*API(Application Programming Interface)とは、ソフトウェアやアプリケーション間で互いに連携し、情報を交換するための規約や仕様の集まり。
APIを利用することで、異なるソフトウェアやサービスが互いに機能を共有し、データをやり取りすることができる。*/
//exportでほかのファイルやモジュールに公開。importでそれをもってくる。
/*async関数は、関数宣言、関数式、アロー関数式に使用できる。async関数内では、awaitキーワードを使用してPromiseの完了を待つことができる。
try、...、catchブロックを使用して、async関数内のエラーを捕捉できる。
また、自動的にPromiseを返します。そのため、関数の戻り値を.then()やawaitで処理できる。*/
//非同期処理とは、ある処理の完了を待つことなく次の処理を進める。