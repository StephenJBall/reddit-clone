import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";
import Link from "next/link";

type Props = {
  topic: string;
  index: number;
};

function SubredditRow({ index, topic }: Props) {
  return (
    <div className="flex items-center space-x-2 border-t bg-gray-700 px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
      <Avatar seed={`subreddit/${topic}`} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-gray-300 px-3 text-black">View</div>
      </Link>
    </div>
  );
}

export default SubredditRow;
