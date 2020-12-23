import React, { useState, useEffect } from "react";
import {
  IoEllipsisVertical,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import Link from "next/link";
import { format } from "timeago.js";
import { firestore } from "../firebase/firebaseClient.js";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

//mui
import Dialog from "@material-ui/core/Dialog";

//components
import Dropdown from "./Navbar/Dropdown";
import PostDropdown from "./PostDropdown";
import PostImage from "./PostImage";
import CommentButton from "./CommentButton.jsx";

const Post = ({ post }) => {
  const AuthUser = useAuthUser();
  const [liked, setLiked] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const like = post.likes.find((like) => like.id === AuthUser.id);

    if (like && like.id === AuthUser.id) {
      setLiked(true);
    }
  }, [AuthUser.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = async () => {
    try {
      await firestore.doc(`posts/${post.id}`).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  const likePost = async () => {
    const user = {
      id: AuthUser.id,
      userImage: AuthUser.photoURL,
    };

    try {
      const docRef = firestore.doc(`posts/${post.id}`);

      //check if already likes
      const alreadyLiked = post.likes.find((like) => like.id === user.id);

      if (alreadyLiked) {
        const filteredLikes = post.likes.filter(
          (like) => like.id !== alreadyLiked.id
        );

        setLiked(false);

        return docRef.update({
          likes: [...filteredLikes],
        });
      }
      setLiked(true);
      await docRef.update({
        likes: [...post.likes, user],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#202836] rounded-md shadow-md p-5 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 md:w-12 md:h-12">
            <Link href={`/profile/${post.name}`}>
              <a>
                <img
                  src={post.profileImage}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </a>
            </Link>
          </div>

          <div className="flex-grow">
            <Link href={`/profile/${post.username}`}>
              <a className="dark:text-gray-300 text-[14px] font-light">
                @{post.username}
              </a>
            </Link>

            <p className="text-[12px] text-gray-400">
              {format(post.createdAt)}
            </p>
          </div>

          <div>
            <Dropdown
              icon={<IoEllipsisVertical className="dark:text-gray-400" />}
              menu={
                <PostDropdown username={post.username} open={handleClickOpen} />
              }
              w="w-56"
            />
          </div>
        </div>

        <div className="">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {post.text}
          </p>
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
            <button onClick={likePost}>
              {liked ? (
                <IoHeart className="text-red-600 cursor-pointer w-7 h-7 " />
              ) : (
                <IoHeartOutline className="cursor-pointer w-7 h-7 dark:text-gray-400" />
              )}
            </button>

            <span className="dark:text-gray-400">{post.likes.length}</span>

            {post.likes.length > 0 && (
              <div className="flex -space-x-1 overflow-hidden">
                {post.likes
                  .filter((_, idx) => idx < 4)
                  .reverse()
                  .map((like, idx) => (
                    <img
                      key={idx}
                      className="object-cover inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#202836]"
                      src={like.userImage}
                      alt=""
                    />
                  ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <CommentButton comments={post.comments} id={post.id} />
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

      <Dialog open={open} onClose={handleClose}>
        <div className="w-full h-full p-10 space-y-5 bg-white dark:bg-dark dark:text-gray-200">
          <div>
            <p>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          </div>

          <div className="flex justify-end space-x-5">
            <button onClick={handleClose}>Cancel</button>
            <button className="text-red-600" onClick={deletePost}>
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default withAuthUser()(Post);
