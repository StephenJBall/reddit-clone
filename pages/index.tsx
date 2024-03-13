import Image from "next/image";
import Header from "../components/Header";
import Head from "next/head";
import PostBox from "@/components/PostBox";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reddit Clone</title>
      </Head>
      <PostBox />
      <div className="">{/* Feed */}</div>
    </div>
  );
}
