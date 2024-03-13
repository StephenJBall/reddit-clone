import Image from "next/image";
import Header from "../components/Header";
import Head from "next/head";
import PostBox from "@/components/PostBox";

export default function Home() {
  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit Clone</title>
      </Head>
      <PostBox />
      <div className="flex">{/* Feed */}</div>
    </div>
  );
}
