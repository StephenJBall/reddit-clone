import Avatar from "@/components/Avatar";
import Feed from "@/components/Feed";
import PostBox from "@/components/PostBox";
import { useRouter } from "next/router";
import React from "react";

function Subreddit() {
  const {
    query: { topic },
  } = useRouter();
  return (
    <div className={`h-24 bg-gray-400 p-8`}>
      <div className="-mx-8 mt-10 bg-gray-500">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic as string} />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-200">r/{topic}</p>
          </div>
        </div>
      </div>
      <div>
        <PostBox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  );
}

export default Subreddit;
