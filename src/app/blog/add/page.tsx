"use client";//フックスは、クライアント側しか使えない。サーバーレンダリングをクライアントレンダリングにするため。

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { Toaster,toast } from 'react-hot-toast';

const postBlog = async (
    title: string | undefined,
    description: string | undefined
) => {
    const res = await fetch(`http://localhost:3000/api/blog`,{ //fetch関数
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({title, description}),//JSON形式で表示。
  });

  return res.json();
};

const PostBlog = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //リロード防ぐ。

        toast.loading("投稿中です・・・", {id: "1" });//idの引数が必要な理由
        await postBlog(titleRef.current?.value, descriptionRef.current?.value);//オプショナルチェーン

        toast.success("投稿に成功しました。", {id: "1" });

        router.push("/");//リダイレクトしている。
        router.refresh();

       // console.log(titleRef.current?.value);//実際に値があるときvalue取得できる。
       // console.log(descriptionRef.current?.value);
    };

  return (
    <>
  <Toaster />  
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
};

export default PostBlog;

//非同期処理とは、
//developer tool開き方。コントロール＋シフト＋I
//ref属性
//useRefは、
//{}は、変数しか入らない?。
//エンドポイントは、ウェブ上のサービスやリソースにアクセスするためのURLやURI。
/*オプショナルチェーン（Optional Chaining）は、JavaScriptの構文の一つで、
オブジェクトのプロパティにアクセスする際にそのプロパティが存在しない可能性がある場合に、
エラーを発生させずに undefined を返す方法です。オプショナルチェーンを使用すると、
プロパティの存在を確認するための冗長なコードを書く必要がなくなり、コードが簡潔になります。*/
/*useEffect Hookは、コンポーネントがマウントされた後に実行されるため、クライアントサイドでのみ実行される。
これは、サーバーサイドではコンポーネントの「マウント」が発生しないためだ。したがって、SSRを使用している場合は、
初期データの取得など、サーバーサイドで実行する必要がある処理にはuseEffectを使用しないように注意する必要がある。*/
//マウントとは、コンポーネントがウェブページのDOMに挿入されるプロセスを指す。
//DOM(Document Object Model)
