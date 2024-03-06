import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/* export async function main():{
    try {
      await prisma.$connect();
    } catch (err) {
      return Error("DB接続に失敗しました");
    }たぶん$connectする必要ない。閉じるだけでよいからmain関数のブロックいらない。
} */

//ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try{
   // await main();
    const posts = await prisma.post.findMany();//postは、prismaのモデルが小文字になったもの。
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
      const { title , description } = await req.json(); //reqから取り出している

      //await main();
      const posts = await prisma.post.create({
        data: {
          title,
          description }
        });
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
//awaitは、Promiseが解決（fulfill）または拒否（reject）されるのを待つ。awaitはasync関数内でのみ使用できる。
/*async関数は関数の前に置くことで、その関数は自動的にPromiseを返すようになる。
関数内部で非同期処理を行う場合、その結果を直接返すか、return文で明示的に返すことができます。*/
//GETやPOSTは、クエリではなくHTTPリクエストのメソッド。
//findManyクエリは、データベースからデータを読み取る。
//createクエリは、prismaを使用したデータ作成。データベース内に新しいレコードを挿入。
//インスタンスは、クラスから生成されるオブジェクトを指す。
//prisma.$disconnect()を呼び出して、Prisma Clientのデータベース接続を閉じる。