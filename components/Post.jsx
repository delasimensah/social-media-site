import React, { useState } from "react";
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
        <div className="w-10 h-10 md:w-12 md:h-12">
          <Link href={`/profile/${post.name}`}>
            <a>
              <img
                src={post.profileImage}
                alt="profile picture"
                className="w-full h-full rounded-full"
              />
            </a>
          </Link>
        </div>

        <div className="flex-grow">
          <Link href={`/profile/${post.username}`}>
            <a className="dark:text-gray-300 text-[14px]">{post.username}</a>
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

          <span className="dark:text-gray-400">{post.likes.length}</span>

          {post.likes.length > 0 && (
            <div className="flex -space-x-1 overflow-hidden">
              {post.likes.map((like, idx) => (
                <img
                  key={idx}
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
                  src={like.userImage}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <IoChatbubbleOutline className="cursor-pointer w-7 h-7 dark:text-gray-400" />
          <span className="dark:text-gray-400">{post.comments.length}</span>
          {post.comments.length > 0 && (
            <div className="flex -space-x-1 overflow-hidden">
              {post.comments.map((comment, idx) => (
                <img
                  key={idx}
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
                  src={comment.userImage}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
