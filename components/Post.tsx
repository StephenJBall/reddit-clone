import {
  ArrowUpIcon,
  BookmarkIcon,
  GiftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import {
  ArrowDownIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { jelly } from "ldrs";
import { useQuery } from "@apollo/client";
import { GET_POST_BY_POST_ID } from "@/graphql/queries";
import PostPage from "@/pages/post/[postId]";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>();
  const { data: session } = useSession();

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("You need to sign in to Vote!");
      return;
    }
  };

  if (!post)
    return (
      <div aria-live="polite">
        <l-jelly size={50} color="#FF4501"></l-jelly>
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border-gray-300 bg-gray-700 shadow-sm hover:border hover:border-gray-600">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className="voteButtons text-white hover:text-blue-600"
          />
          <p className="text-white font-bold text-xs">0</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className="voteButtons text-white hover:text-red-600"
          />
        </div>
        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit?.topic}`}>
                <span className="font-bold text-white hover:text-blue-400">
                  r/{post.subreddit.topic}
                </span>
              </Link>
              Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {/* Image */}
          <img src={post.image} className="width-full rounded-md" />
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatBubbleBottomCenterIcon className="h-6 w-6" />
              <p className="">{post.comment?.length}</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
