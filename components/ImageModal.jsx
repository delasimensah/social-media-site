import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import Fade from "react-reveal/Fade";
import { imageModalState } from "../contexts/ImageModalContext";

const ImageModal = () => {
  const cancelButtonRef = useRef(null);
  const { open, setOpen, img } = imageModalState();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      initialFocus={cancelButtonRef}
      className="fixed inset-0 z-10 "
    >
      <div
        ref={cancelButtonRef}
        className="flex items-center justify-center min-h-screen"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />

        <Fade left duration={500} distance="50px">
          <div className="max-w-md mx-auto bg-white rounded">
            <img src={img} alt="post image" />
          </div>
        </Fade>
      </div>
    </Dialog>
  );
};

export default ImageModal;
