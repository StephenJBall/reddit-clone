import { useSession } from "next-auth/react";
import React from "react";
import Avatar from "./Avatar";

function PostBox() {
  const { data: session } = useSession();

  return (
    <form action="">
      <div className="flex items-center space-x-3">
        <Avatar seed="stephen"/>
        <input
          disabled={!session}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          placeholder={
            session ? "Create a post by entering a title!" : "Sign in to Post"
          }
        />
      </div>
    </form>
  );
}

export default PostBox;
