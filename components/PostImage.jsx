import React, { useState } from "react";
import Lightbox from "react-awesome-lightbox";

//mui
import Dialog from "@material-ui/core/Dialog";

const PostImage = ({ images, img, idx }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

      <Dialog open={open} onClose={handleClose}>
          <Lightbox
            image={images.length === 1 && img}
            images={images.length > 1 && images}
            onClose={handleClose}
            allowZoom={false}
            allowRotate={false}
            allowReset={false}
            startIndex={idx}
          /> 
      </Dialog>
    </>
  );
};

export default PostImage;
