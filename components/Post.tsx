import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  return (
    <div className="flex cursor-pointer rounded-md border-gray-300 bg-gray-700 shadow-sm hover:border hover:border-gray-600">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md p-4 text-gray-400">
        <ArrowUpIcon className="voteButtons text-white hover:text-blue-600" />
        <p className="text-white font-bold text-xs">0</p>
        <ArrowDownIcon className="voteButtons text-white hover:text-red-600" />
      </div>
      <div className="p-3 pb-1">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreddit[0]?.topic} />
          <p className="text-xs text-gray-400">
            <span className="font-bold text-white hover:text-blue-400">
              r/{post.subreddit.topic}
            </span>{" "}
            Posted by u/
            {post.username} <TimeAgo date={post.created_at} />
          </p>
        </div>
        {/* Body */}
        {/* Image */}
        {/* Footer */}
      </div>
    </div>
  );
}

export default Post;
