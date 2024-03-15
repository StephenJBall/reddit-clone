import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  return (
    <div>
      <div>
        <ArrowUpIcon className="voteButtons text-white hover:text-blue-600" />
        <ArrowDownIcon className="voteButtons text-white hover:text-red-600" />
      </div>
      <div>
        {/* Header */}
        {/* Body */}
        {/* Image */}
        {/* Footer */}
      </div>
    </div>
  );
}

export default Post;
