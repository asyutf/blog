"use client";
import { PostType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { config } from "@/lib/config";
import supabase from "@/lib/supabase";
import { VscAdd } from "react-icons/vsc";

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
    <header className="text-slate-600">
      <div className="flex justify-center items-center m-auto p-12 ">
        <span className="font-medium text-5xl ">Takeru blog </span>
      <Link
      href={"/blog/add"}
      className="flex justify-center items-center rounded-full border-2 border-gray p-3 -mt-12 bg-white hover:bg-slate-200 shadow-xl"
      >
        <VscAdd size="20px"/>
      </Link>
      </div>
      </header>

  <div className="w-full flex flex-col justify-center items-center">
    {posts.map((post: PostType) => (
      <div
         key={post.id}
         className="w-3/4 p-4 rounded-md mx-3 my-2 bg-white flex flex-col justify-center hover:bg-slate-200"
      >
       <div className="flex items-center my-3">
         <div className="mr-auto">
           <h2 className="mr-auto text-slate-600 font-medium text-2xl ">
            {post.title}
           </h2>
         </div>
         <Link
           href={`/blog/edit/${post.id}`}
        
         >
          <button className="text-slate-600 font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
            編集
          </button>
         </Link>
       </div>

       <div className="mr-auto my-1">
         <h2 className="text-slate-500 ">{post.description}</h2>
       </div>

       <div className="mr-auto my-1">
         <blockquote className="text-slate-400">
        {new Date(post.date).toDateString()}
         </blockquote>
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