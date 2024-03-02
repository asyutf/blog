"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const editBlog = async (
    title: string | undefined,
    description: string | undefined,
    id: number
) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`,{ //idのとこは、
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({title, description, id }),//JSON形式で表示。
  });

  return res.json();
};

const getBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`,);
  const data = await res.json();
  return data.post;
};

const deleteBlog = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
  });
  return res.json();
};

const EditPost = ({ params }: { params: { id: number } }) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //リロード防ぐ。

        toast.loading("編集中です・・・", {id: "1" });//idの引数が必要な理由
        await editBlog(
            titleRef.current?.value,
            descriptionRef.current?.value,
            params.id
            );//オプショナルチェーン

        toast.success("編集に成功しました。", {id: "1" });

        router.push("/");
        router.refresh();

       // console.log(titleRef.current?.value);//実際に値があるときvalue取得できる。
       // console.log(descriptionRef.current?.value);
    };

    const handleDelete = async () => {
        toast.loading("削除中です・・・");
        await deleteBlog(params.id);

        router.push("/");
        router.refresh();
    };

    useEffect(() => {
        getBlogById(params.id).then((data) => {
            if (titleRef.current && descriptionRef.current){//currentが存在するとき
            titleRef.current.value = data.title;            //空値の可能性があるからif文つけないといけない。
            descriptionRef.current.value = data.description;
            }
        })
        .catch((err) => {
            toast.error("エラーが発生しました。", { id: "1" });
        });
    }, [params.id]);//idのとこ

  return (
  <>
    <Toaster />
    <div className="w-full m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">
            ブログの編集 🚀
        </p>
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
            更新
          </button>
          <button
            onClick={handleDelete}
            className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
            削除
          </button>
        </form>
      </div>
    </div>
  </>
  )
};

export default EditPost;

//useEffectは、
