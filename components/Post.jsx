import React, { useState } from "react";
import Image from "next/image";
import {
  IoEllipsisVertical,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import Link from "next/link";
import { format } from "timeago.js";

//components
import Dropdown from "./Navbar/Dropdown";
import PostDropdown from "./PostDropdown";
import PostImage from "./PostImage";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white dark:bg-[#202836] rounded-md shadow-md p-5 space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 md:w-12 md:h-14">
          <Link href={`/profile/${post.name}`}>
            <a>
              <Image
                src={post.profileImage}
                alt="profile picture"
                width={100}
                height={100}
                className="rounded-full"
              />
            </a>
          </Link>
        </div>

        <div className="flex-grow">
          <Link href={`/profile/${post.name}`}>
            <a className="dark:text-gray-300 text-[14px]">{post.name}</a>
          </Link>

          <p className="text-[12px] text-gray-400">{format(post.createdAt)}</p>
        </div>

        <div>
          <Dropdown
            icon={<IoEllipsisVertical className="dark:text-gray-400" />}
            menu={<PostDropdown />}
            w="w-56"
          />
        </div>
      </div>

      <div className="">
        <p className="text-sm text-gray-700 dark:text-gray-400">{post.text}</p>
      </div>

      {post.images.length > 0 && (
        <div
          className={`grid gap-1 md:gap-3 ${
            post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
          } h-60 md:h-96`}
        >
          {post.images.map((img, idx) => {
            return (
              <PostImage key={idx} idx={idx} images={post.images} img={img} />
            );
          })}
        </div>
      )}

      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-2">
          <button onClick={() => setLiked(!liked)}>
            {liked ? (
              <IoHeart className="text-red-600 cursor-pointer w-7 h-7 " />
            ) : (
              <IoHeartOutline className="cursor-pointer w-7 h-7 dark:text-gray-400" />
            )}
          </button>

          <span className="dark:text-gray-400">12.6k</span>

          <div className="flex -space-x-1 overflow-hidden">
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <IoChatbubbleOutline className="cursor-pointer w-7 h-7 dark:text-gray-400" />
          <span className="dark:text-gray-400">10k</span>
          <div className="flex -space-x-1 overflow-hidden">
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
