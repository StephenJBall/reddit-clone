import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { PhotoIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "@/graphql/mutations";
import client from "@/apollo-client";
import { GET_SUBREDDIT_BY_TOPIC } from "@/graphql/queries";
import toast from "react-hot-toast";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function PostBox() {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const [addPost] = useMutation(ADD_POST);
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading("Creating new post...");
    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });

      console.log(getSubredditListByTopic);

      if (getSubredditListByTopic == null) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log("Creating post...", formData);
        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New Post added", newPost);
      } else {
        console.log(getSubredditListByTopic.id);
        const image = formData.postImage || "";
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
      }

      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subreddit", "");

      toast.success("New Post Created", {
        id: notification,
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 rounded-md border-gray-400 bg-gray p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar seed="stephen" />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1 text-black"
          type="text"
          placeholder={
            session ? "Create a post by entering a title!" : "Sign in to Post"
          }
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none text-black rounded-md"
              {...register("postBody")}
              type="text"
              placeholder="Text (Optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none text-black rounded-md"
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="The community you want to post it to..."
            />
          </div>
          <div>
            {imageBoxOpen && (
              <div className="flex items-center px-2">
                <p className="min-w-[90px]">Image URL:</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none text-black rounded-md"
                  {...register("postImage")}
                  type="text"
                  placeholder="Optional"
                />
              </div>
            )}
            {/* Errors */}
            {Object.keys(errors).length > 0 && (
              <div className="space-y-2 p-2 text-red-400">
                {errors.postTitle?.type == "required" && (
                  <p>A Post Title is required</p>
                )}
                {errors.postTitle?.type == "required" && (
                  <p>A Post Title is required</p>
                )}
              </div>
            )}
          </div>
          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
