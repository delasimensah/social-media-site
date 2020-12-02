import React, { useState } from "react";
// import Lightbox from "react-awesome-lightbox";
import Lightbox from "react-spring-lightbox";

//mui
import Dialog from "@material-ui/core/Dialog";

const PostImage = ({ images, img, idx }) => {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(idx);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newImages = images.map((img) => {
    return {
      src: img,
      loading: "lazy",
      alt: "post image",
    };
  });
  return (
    <>
      <div
        className={`${
          images.length === 3 && "first:row-span-2"
        } overflow-hidden rounded-md cursor-pointer bg-gray-700/20`}
      >
        <img
          src={img}
          alt=""
          className="object-cover object-top w-full h-full"
          onClick={handleClickOpen}
        />
      </div>

      <Lightbox
        isOpen={open}
        images={newImages}
        onClose={handleClose}
        currentIndex={currentImageIndex}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        className="bg-black/60"
      />
    </>
  );
};

export default PostImage;
