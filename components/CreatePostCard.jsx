import React, { useRef, useState } from "react";
import { IoImagesOutline, IoVideocamOutline } from "react-icons/io5";
import { withAuthUser, useAuthUser } from "next-firebase-auth";
import { storage, firestore } from "../firebase/firebaseClient";

import LinearProgress from "@material-ui/core/LinearProgress";

const CreatePostCard = () => {
  const AuthUser = useAuthUser();
  const postRef = useRef();
  const [files, setFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const createPost = async () => {
    if (postRef.current.value === "" && files.length === 0 && video === null) {
      console.log("you need something to post");
      return;
    }

    setLoading(true);

    try {
      //if images upload images and return image urls
      const images = await Promise.all(
        files.map(async (file) => {
          const ref = storage.ref(
            `${AuthUser.id}/${new Date().toISOString()}_${file.name}`
          );

          const snapshot = await ref.put(file);

          return snapshot.ref.getDownloadURL();
        })
      );

      let video = "";

      if (videoFile) {
        const ref = storage.ref(
          `${AuthUser.id}/${new Date().toISOString()}_${videoFile.name}`
        );

        const snapshot = await ref.put(videoFile);
        video = await snapshot.ref.getDownloadURL();
      }

      //structure for a post
      const post = {
        profileImage: AuthUser.photoURL,
        username: AuthUser.displayName,
        userId: AuthUser.id,
        text: postRef.current.value,
        createdAt: new Date().toISOString(),
        images,
        video,
        likes: [],
        comments: [],
      };

      const ref = firestore.collection(`posts`);

      //add post to database
      await ref.add(post);

      const userRef = firestore.doc(`users/${AuthUser.id}`);
      const userDoc = await userRef.get();

      const media = userDoc.data().media;

      //update media field in database
      await userRef.update({
        media: [...media, ...images],
      });

      postRef.current.value = "";
      setFiles([]);
      setLoading(false);
      setVideoFile(null);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#202836]  rounded-md shadow-md focus-within:shadow-lg transition-shadow duration-500 ease-in-out">
        <div className="flex px-3 py-5 space-x-5">
          <div className="w-8 h-8 md:w-12 md:h-12">
            <img
              src={AuthUser.photoURL}
              alt=""
              className="object-cover w-full h-full rounded-full bg-black/30"
            />
          </div>

          <div className="flex-grow">
            <textarea
              name=""
              maxLength="280"
              placeholder="Write something here"
              className="text-[15px] md:text-base focus:outline-none w-full resize-none dark:bg-[#202836] dark:caret-gray-200 dark:text-gray-200 border-b"
              ref={postRef}
            ></textarea>
          </div>
        </div>

        {files.length > 0 && (
          <div className={`grid grid-cols-3 gap-5 px-5 py-2 h-auto`}>
            {files.map((file, idx) => (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                key={idx}
                className="object-cover w-full"
              />
            ))}
          </div>
        )}

        {videoFile && (
          <div className="px-5 py-2">
            <video width="500" height="320" controls>
              <source
                src={URL.createObjectURL(videoFile)}
                type={videoFile.type}
              />
            </video>
          </div>
        )}

        <div className="flex items-center justify-between px-3 py-2 ">
          <div className="flex items-center space-x-3 md:space-x-5">
            <label
              htmlFor="images"
              className="flex items-center p-2 space-x-2 text-gray-400 rounded-full cursor-pointer bg-gray-400/20 hover:bg-purple-600/20"
            >
              <IoImagesOutline className="w-5 h-5" />
              <input
                type="file"
                id="images"
                accept=".png,.jpeg,.jpg"
                multiple
                onChange={(e) => {
                  setFiles([...e.target.files]);
                  setVideoFile(null);
                }}
                className="hidden"
              />
            </label>

            <label
              htmlFor="video"
              className="flex items-center p-2 space-x-2 text-gray-400 rounded-full cursor-pointer bg-gray-400/20 hover:bg-purple-600/20"
            >
              <IoVideocamOutline className="w-5 h-5" />
              <input
                type="file"
                id="video"
                accept=".mp4,.mkv,.webm,.ogv,.flv,.ts"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file.size > 5 * 1024 * 1024) {
                    console.log("video too large");
                    return;
                  }

                  setVideoFile(e.target.files[0]);
                  setFiles([]);
                }}
                className="hidden"
                size={3000000}
              />
            </label>
          </div>

          <button
            className="w-40 py-[5px] text-sm text-gray-300 uppercase bg-purple-600 rounded-full flex justify-center"
            onClick={createPost}
          >
            Post
          </button>
        </div>

        {loading && <LinearProgress />}
      </div>
    </>
  );
};

export default withAuthUser()(CreatePostCard);
