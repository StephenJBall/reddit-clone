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
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { jelly } from "ldrs";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_VOTES_BY_POST_ID,
  GET_POST_BY_POST_ID,
} from "@/graphql/queries";
import PostPage from "@/pages/post/[postId]";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { ADD_VOTE } from "@/graphql/mutations";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>();
  const { data: session } = useSession();

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;

    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote;
    setVote(vote);
  }, [data]);

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("You need to sign in to Vote!");
      return;
    }

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    console.log("voting...", isUpvote);

    await addVote({
      variables: {
        post_id: post.id,
        username: session.user?.name,
        upvote: isUpvote,
      },
    });  
  };
  
  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  if (!post)
    return (
      <div aria-live="polite">
        <l-jelly size={50} color="#FF4501"></l-jelly>
      </div>
    );

  return (
      <div className="flex cursor-pointer rounded-md border-gray-300 bg-gray-700 shadow-sm hover:border hover:border-gray-600 mb-3">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={
              vote
                ? "voteButtons text-blue-400"
                : "voteButtons text-white hover:text-blue-200"
            }
          />
          <p className="text-white font-bold text-xs">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={
              vote === false
                ? "voteButtons text-red-400"
                : "voteButtons text-white hover:text-red-200"
            }
          />
        </div>
        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-white hover:text-blue-400 px-2">
                  r/{post.subreddit?.topic}
                </span>
              </Link>
              Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <Link href={`/post/${post.id}`}>
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          </Link>
          {/* Image */}
          <img src={post.image} className="width-full rounded-md" />
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatBubbleBottomCenterIcon className="h-6 w-6" />
              <p className="">{post?.comments?.length}</p>
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
  );
}

export default Post;
