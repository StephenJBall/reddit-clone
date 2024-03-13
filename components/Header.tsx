import React from "react";
import Image from "next/legacy/image";
import {
  ChevronDownIcon,
  HomeIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassCircleIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  GlobeEuropeAfricaIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 flex bg-black px-4 py-2 shadow-lg shadow-gray-500">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="/images/reddit-icon.png"
          height={40}
          width={40}
          style={{
            cursor: "pointer",
          }}
        />
      </div>

      <div className="mx-7 flex items-center xl:min-1-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <form className="flex flex-1 items-center space-x-2 border border-gray-600 rounded-sm bg-black-400 px-3 py-1">
        <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="bg-black flex-1 bg-transparent outline-none"
        />
        <button type="submit" hidden />
      </form>
      <div className="mx-5 items-center space-x-2 text-gray-100 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeEuropeAfricaIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerWaveIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden cursor-pointer">
        <Bars3Icon className="icon" />
      </div>
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer rounded-lg hover:bg-gray-900"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src="/images/reddit-icon-white.png" layout="fill" />
          </div>
          <p className="text-gray-200">Sign Out</p>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer rounded-lg hover:bg-gray-900"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src="/images/reddit-icon-white.png" layout="fill" />
          </div>
          <p className="text-gray-200">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
