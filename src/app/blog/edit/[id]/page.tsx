"use client";
import supabase from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'


const EditPost = () => {
    const router = useRouter();
    const params = useParams()//id取得
    //console.log(params);
    const id: number = Number(params.id as string)

    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
    .from('Post')//table
    .update({ title: titleRef.current?.value, description: descriptionRef.current?.value })
    .eq('id',id)//''の中身がcolumns
    .select()
if(error){
    console.log(error);
}
    console.log("api post update",data);//""使うとわかりやすい
    router.push("/");//ホームにリダイレクト
    router.refresh();
        }
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase
        .from('Post')//table
        .delete()
        .eq('id',id)//''の中身がcolumns
    if(error){
        console.log(error);
    }
    router.push("/");//ホームにリダイレクト
    router.refresh();
            };

    useEffect(() =>{
        const getBlogById = async () =>{
            let { data, error } = await supabase
            .from('Post')
            .select("*")
            .eq('id', id) // IDに基づいてフィルタリング
            .single(); // 1つのレコードのみを期待
            console.log("IDからブログ取得",data);
            titleRef.current!.value = data.title;
            descriptionRef.current!.value = data.description;
        };
        getBlogById();
        
    },[id]);

  return (
   <>
  <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集  </p>
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
        <button
        className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
          更新
        </button>
        <button onClick={handleDelete}
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


