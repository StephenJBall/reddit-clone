import Post from "@/components/Post";
import { ADD_COMMENT } from "@/graphql/mutations";
import { GET_POST_BY_POST_ID } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  comment: string;
};

function PostPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostListByPostId"],
  });
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });

  const post: Post = data?.getPostListByPostId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading("Posting your comment...");

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });

    setValue("comment", "");

    toast.success("Comment Successfully Posted!", {
      id: notification,
    });
  };

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-500 bg-gray-500 p-5 pl-16">
        <p className="text-sm">
          Comment as{" "}
          <span className="text-red-400 font-semibold">
            {session?.user?.name}
          </span>
        </p>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("comment")}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none diabled:bg-gray-50 text-gray-600"
            placeholder={
              session ? "What are your thoughts?" : "Please sign in to comment"
            }
          />
          <button
            type="submit"
            className="rounded-full bg-red-400 p-3 font-semibold text-white diabled:bg-gray-200 hover:bg-red-500"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostPage;
