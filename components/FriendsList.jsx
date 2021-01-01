import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebaseClient";
import Link from "next/link";

//mui
import Dialog from "@material-ui/core/Dialog";

const FriendsList = ({ friends, name }) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    Promise.all(
      friends.map(async (friendId) => {
        const snapshot = await firestore.doc(`users/${friendId}`).get();

        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
      })
    ).then((users) => {
      setList(users);
    });
  }, [friends]);

  return (
    <>
      <a
        className="space-x-2 cursor-pointer hover:underline"
        onClick={handleClickOpen}
      >
        <span className="text-color">
          {friends.length}{" "}
          <span className="text-black dark:text-white">{name}</span>
        </span>
      </a>

      <Dialog open={open} onClose={handleClose}>
        <div className="p-5 space-y-4 overflow-y-scroll bg-white dark:bg-dark dark:text-gray-200 h-96 w-60">
          <>
            {list.length === 0 ? (
              <div>
                {name === "Followers" ? (
                  <h1 className="text-[13px] text-center">
                    You have no followers
                  </h1>
                ) : (
                  <h1 className="text-[13px] text-center">
                    You are not following anyone
                  </h1>
                )}
              </div>
            ) : (
              <>
                {list.map((friend) => {
                  return (
                    <div
                      className="flex items-center space-x-2"
                      key={friend.id}
                    >
                      <div className="w-10 h-10">
                        <img
                          src={friend.profileImage}
                          alt=""
                          className="object-cover w-full h-full rounded-full bg-black/50"
                        />
                      </div>

                      <Link href={`/profile/${friend.username}`}>
                        <a
                          className="flex-grow text-[14px] text-color"
                          onClick={handleClose}
                        >
                          @{friend.username}
                        </a>
                      </Link>
                    </div>
                  );
                })}
              </>
            )}
          </>
        </div>
      </Dialog>
    </>
  );
};

export default FriendsList;
