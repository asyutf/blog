// pages/api/blog/[id].ts または pages/api/blog/index.ts のように適切なファイル名を使用してください
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await prisma.$connect();

  try {
    if (req.method === "GET") {
      const posts = await prisma.post.findMany();
      res.status(200).json({ message: "Success", posts });
    } else if (req.method === "POST") {
      const { title, description } = req.body;
      const post = await prisma.post.create({ data: { title, description } });
      res.status(201).json({ message: "Success", post });
    } else {
      // サポートされていないHTTPメソッドの場合
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  } finally {
    await prisma.$disconnect();
  }
}


/*API(Application Programming Interface)とは、ソフトウェアやアプリケーション間で互いに連携し、情報を交換するための規約や仕様の集まり。
APIを利用することで、異なるソフトウェアやサービスが互いに機能を共有し、データをやり取りすることができる。*/
//exportでほかのファイルやモジュールに公開。importでそれをもってくる。
/*async関数は、関数宣言、関数式、アロー関数式に使用できる。async関数内では、awaitキーワードを使用してPromiseの完了を待つことができる。
try、...、catchブロックを使用して、async関数内のエラーを捕捉できる。
また、自動的にPromiseを返します。そのため、関数の戻り値を.then()やawaitで処理できる。*/
//非同期処理とは、ある処理の完了を待つことなく次の処理を進める。