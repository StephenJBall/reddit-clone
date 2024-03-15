import { GET_ALL_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import React from "react";
import Post from "./Post";

function Feed() {
  const { data, error } = useQuery(GET_ALL_POSTS);
  console.log(data);

  const posts: Post[] = data?.postList;

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;