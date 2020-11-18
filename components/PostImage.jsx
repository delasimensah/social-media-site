import React, { useState, useRef } from "react";

//chakra ui
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const PostImage = ({ image, images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <>
      <div
        className={`${
          images.length === 3 && "first:row-span-2"
        } overflow-hidden rounded-md cursor-pointer bg-gray-700/20`}
      >
        <img
          src={image}
          alt=""
          className="object-cover object-top w-full h-full"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <div className="max-w-md mx-auto">
              <img src={image} alt="post image" />
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default PostImage;
