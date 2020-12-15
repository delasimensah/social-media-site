import React, { useState, useRef } from "react";
import { firestore } from "../firebase/firebaseClient";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

import {
  IoLocationOutline,
  IoPersonCircleOutline,
  IoReceiptOutline,
} from "react-icons/io5";

//mui
import Dialog from "@material-ui/core/Dialog";

//components
import FormInput from "./FormInput";

const EditProfileButton = ({ userInfo }) => {
  const [open, setOpen] = useState(false);
  const AuthUser = useAuthUser();

  const [info, setInfo] = useState({
    location: userInfo.location,
    bio: userInfo.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editProfile = async () => {
    // await AuthUser.firebaseUser.updateProfile({
    //   displayName: username.current.value
    // });

    try {
      const ref = firestore.doc(`users/${AuthUser.id}`);

      await ref.update({
        location: info.location,
        bio: info.bio,
      });

      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="px-3 py-1 text-purple-600 border-2 border-purple-600 rounded-full md:px-5 md:py-2"
      >
        Edit Profile
      </button>

      <Dialog open={open} onClose={handleClose}>
        <div className="p-10 space-y-10 bg-white border dark:bg-dark">
          <h1 className="text-xl text-center dark:text-gray-200">
            Edit Information
          </h1>

          <form className="space-y-5">
            {/* <FormInput
              type="text"
              placeholder="Username"
              icon={<IoPersonCircleOutline className="form-icon" />}
              val={username}
            /> */}

            <FormInput
              name="location"
              type="text"
              placeholder="Location"
              icon={<IoLocationOutline className="form-icon" />}
              value={info.location}
              onChange={handleChange}
            />

            <FormInput
              name="bio"
              type="text"
              placeholder="Bio"
              icon={<IoReceiptOutline className="form-icon" />}
              value={info.bio}
              onChange={handleChange}
            />
          </form>

          <div className="flex items-center justify-end space-x-5">
            <button onClick={handleClose} className="text-red-600">
              Cancel
            </button>
            <button onClick={editProfile} className="text-purple-600">
              Edit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default withAuthUser()(EditProfileButton);
