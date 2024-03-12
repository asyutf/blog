"use client";
import { PostType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { config } from "@/lib/config";
import supabase from "@/lib/supabase";

export default  function Home() {//メインコンポーネント
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: Post, error } = await supabase
      .from('Post')
      .select('*')
      //console.log(Post);
      if (Post) {
        setPosts(Post as PostType[]);
}
// エラー処理も忘れずに
if (error) {
  console.error(error);
}
    };
    fetchData();
  }, []); // 空の依存配列で、コンポーネントのマウント時にのみ実行

  return (
    <main className="w-full h-full">
  <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
    <h1 className="text-slate-200 text-center text-2xl font-extrabold">
      たけるのブログ
    </h1>
  </div>
  {/* Link */}
  <div className="flex my-5">
    <Link
      href={"/blog/add"}
      className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
    >
      ブログ新規作成
    </Link>
  </div>

  <div className="w-full flex flex-col justify-center items-center">
    {posts.map((post: PostType) => (
      <div
         key={post.id}
         className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center"
      >
       <div className="flex items-center my-3">
         <div className="mr-auto">
           <h2 className="mr-auto font-semibold">
            {post.title}
           </h2>
         </div>
         <Link
           href={`/blog/edit/${post.id}`}
           className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
         >
           編集
         </Link>
       </div>
 
       <div className="mr-auto my-1">
         <blockquote className="font-bold text-slate-700">
        {new Date(post.date).toDateString()}
         </blockquote>
       </div>
 
       <div className="mr-auto my-1">
         <h2 className="text-slate-50">{post.description}</h2>
       </div>
     </div>

    ))}

  </div>
</main>
);
}

/*fetch関数を使用してHTTPリクエストを送信し、リクエストに対するレスポンスを取得できる。
fetchはPromiseを返すため、then()メソッドやasync/await構文を使用して非同期の結果を扱うことができる。*/
//cacheは、データや計算結果を一時的に保存する仕組み。
/*||演算子は、左辺の式を評価し、その結果がtruthy（真と評価される値）ならばそれを返す。
左辺がfalsy（偽と評価される値）である場合は、右辺の式を評価し、その結果を返す。*/