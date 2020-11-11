import React, { useState } from "react";

//components
import Layout from "../components/Layout";
import CreatePostCard from "../components/CreatePostCard";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

const posts = [
  {
    id: 1,
    profileImage: "/me.jpg",
    name: "Delasi Mensah",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod id atque a illum aut ullam libero ipsa, inventore dignissimos maxime!`,
    createdAt: "Fri Jun 25 2021 14:36:06",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post3.jpg?alt=media&token=aedf42e3-9ba9-4fe9-b8b7-206dd7eb2cf1",
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post2.jpg?alt=media&token=0f391dbe-d54b-4644-aa02-e228b703277e",
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post4.jpg?alt=media&token=a8b803e9-bf45-4f9a-96d4-74e5e60514c4",
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post5.jpg?alt=media&token=31bc9b76-436e-446a-a6a8-d0cd065e7dbe",
    ],
  },
  {
    id: 2,
    profileImage: "/me.jpg",
    name: "Delasi Mensah",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod id atque a illum aut ullam libero ipsa, inventore dignissimos maxime!`,
    createdAt: "Fri Jun 25 2021 14:36:06",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post6.jpg?alt=media&token=91f7484f-3495-4dbd-8749-33503c3e3b46",
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post7.jpg?alt=media&token=dbe79ba0-deb9-4b92-9d8e-90fb6fbdc8dd",
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post8.jpg?alt=media&token=0839fb3f-5673-40ef-89cf-2b79cbb27d44",
    ],
  },
  {
    id: 3,
    profileImage: "/me.jpg",
    name: "Delasi Mensah",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod id atque a illum aut ullam libero ipsa, inventore dignissimos maxime!`,
    createdAt: "Fri Jun 25 2021 14:36:06",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post9.jpg?alt=media&token=80ed1fa3-8821-4a22-ae3f-0a7a485e460e",
    ],
  },
  {
    id: 4,
    profileImage: "/me.jpg",
    name: "Delasi Mensah",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod id atque a illum aut ullam libero ipsa, inventore dignissimos maxime!`,
    createdAt: "Fri Jun 25 2021 14:36:06",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post1.jpg?alt=media&token=2d65eec6-b13a-4f4f-8a43-a1ce9a042060",
      "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/post10.jpg?alt=media&token=9f84af8a-57c8-44db-9dbd-16452a5015c4",
    ],
  },
  {
    id: 5,
    profileImage: "/me.jpg",
    name: "Delasi Mensah",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod id atque a illum aut ullam libero ipsa, inventore dignissimos maxime!`,
    createdAt: "Fri Jun 25 2021 14:36:06",
    images: [],
  },
];

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  return (
    <Layout>
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
        <div className="space-y-5">
          <CreatePostCard />
          <Feed posts={posts} open={open} setOpen={setOpen} setImg={setImg} />
        </div>

        <div className="hidden lg:block">Sidebar</div>
      </div>

      <Modal open={open} setOpen={setOpen} img={img} />
    </Layout>
  );
};

export default HomePage;
