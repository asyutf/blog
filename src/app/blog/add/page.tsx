"use client";

import supabase from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function PostBlog() {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
const { data, error } = await supabase
.from('Post')
.insert([
  { title: titleRef.current?.value, description: descriptionRef.current?.value},
])
.select()
if(error){
    alert(error)
}
    //console.log(titleRef.current?.value);//F12で確認。nullじゃないときのみvalueプロパティにアクセス。オプショナルチェーン演算子
    //console.log(descriptionRef.current?.value);
    // ホームページにリダイレクト
    router.push("/");
    router.refresh();

  };


    return (
      <>
  <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
      <form onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          placeholder="タイトルを入力"
          type="text"
          className="rounded-md px-4 w-full py-2 my-2"
        />
        <textarea
          ref={descriptionRef}
          placeholder="記事詳細を入力"
          className="rounded-md px-4 py-2 w-full my-2"
        ></textarea>
        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
          投稿
        </button>
      </form>
    </div>
  </div>
</>
    );
  }