import React, { useState } from "react";

//mui
import Dialog from "@material-ui/core/Dialog";

const PostImage = ({ images, img }) => {
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

      <Dialog onClose={handleClose} aria-labelledby="image-dialog" open={open}>
        <div className="max-w-md mx-auto overflow-hidden rounded">
          <img src={img} alt="post image" className="w-full h-full" />
        </div>
      </Dialog>
    </>
  );
};

export default PostImage;
