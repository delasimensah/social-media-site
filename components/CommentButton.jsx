import React, { useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { withAuthUser, useAuthUser } from "next-firebase-auth";
import { firestore } from "../firebase/firebaseClient";
import { format } from "timeago.js";

//mui
import Dialog from "@material-ui/core/Dialog";

//components
import FormInput from "./FormInput";

const CommentButton = ({ id, comments }) => {
  const AuthUser = useAuthUser();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postComment = async () => {
    const createdAt = new Date().toISOString();

    const comment = {
      userId: AuthUser.id,
      userImage: AuthUser.photoURL,
      username: AuthUser.displayName,
      text,
      createdAt,
    };

    const ref = firestore.doc(`posts/${id}`);

    try {
      await ref.update({
        comments: [...comments, comment],
      });

      setText("");
    } catch (error) {
      console.log(error.message);
      setText("");
    }
  };
  return (
    <>
      <a onClick={handleClickOpen}>
        <IoChatbubbleOutline className="cursor-pointer w-7 h-7 dark:text-gray-400" />
      </a>

      <Dialog open={open} onClose={handleClose}>
        <div className="flex flex-col bg-white dark:bg-dark dark:text-gray-200 h-96">
          <div className="flex-grow overflow-y-scroll comment-box">
            {comments.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                No Comments
              </div>
            ) : (
              <div className="">
                {comments.map((comment, idx) => {
                  return (
                    <div key={idx} className="flex items-center p-3 space-x-3">
                      <img
                        src={comment.userImage}
                        alt=""
                        className="object-cover w-6 h-6 rounded-full"
                      />

                      <div>
                        <p className="text-sm">{comment.text}</p>
                        <p className="text-[10px] text-gray-400">
                          {format(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center px-2 py-3 space-x-2 border-t md:justify-center">
            <FormInput
              placeholder="Add a comment"
              type="text"
              onChange={(e) => setText(e.target.value)}
            />

            <button
              className="text-sm text-purple-600"
              onClick={postComment}
              disabled={text === ""}
            >
              Post
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default withAuthUser()(CommentButton);
