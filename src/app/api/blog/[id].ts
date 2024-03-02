// APIルート: pages/api/blog/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; // URLからIDを取得
    const id_string = id as string
    const postId = parseInt( id_string); // req.queryは配列または文字列を返す可能性がある

    try {
        switch (req.method) {
            case "GET":
                const post = await prisma.post.findUnique({ where: { id: postId } });
                if (post) {
                    res.status(200).json({ message: "Success", post });
                } else {
                    res.status(404).json({ message: "Post not found" });
                }
                break;
            case "PUT":
                const { title, description } = req.body;
                const updatedPost = await prisma.post.update({
                    where: { id: postId },
                    data: { title, description },
                });
                res.status(200).json({ message: "Success", post: updatedPost });
                break;
            case "DELETE":
                const deletedPost = await prisma.post.delete({ where: { id: postId } });
                res.status(200).json({ message: "Success", post: deletedPost });
                break;
            default:
                res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        res.status(500).json({ message: "Error", err });
    }
}