"use client";
import React, { useState } from "react";
import "../../app/globals.css";
import "../../app/form.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import EditUser from "../components/EditUser";

const Page = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const userName = session?.user.name;
  const userImage = session?.user.image;

  const handleEdit = () => {
    if (isEditing === false) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing === false && (
        <>
          <h1>My profile</h1>
          <section>
            <button onClick={handleEdit}>Edit profile</button>
            <div>
              <h2>{userName}</h2>
              <Image src={userImage!} alt="userImage"></Image>
            </div>
            <p>
              Eiusmod incididunt aliqua quis velit. Aute magna nisi commodo
              ullamco ea. Id dolor Lorem sit pariatur. Est fugiat nostrud
              cupidatat tempor dolor fugiat proident dolor in. Proident tempor
              consequat ut nulla cillum tempor elit esse aute eu Lorem
              voluptate. Ea dolore irure velit est Lorem proident. In aliqua
              quis aliqua labore sint ut aliqua eiusmod adipisicing laborum in
              consequat in ipsum. Eiusmod qui aliquip officia culpa Lorem quis
              id deserunt occaecat. Consectetur incididunt minim ipsum pariatur
              do. Dolor id qui sit et sint culpa proident nostrud sunt aute.
              Enim voluptate culpa nisi duis proident minim exercitation velit
              in incididunt est. In proident dolor veniam ut sit minim ipsum
              duis. Amet officia labore amet et amet incididunt consectetur
              nostrud. Consequat nisi minim aliqua esse.
            </p>
          </section>
        </>
      )}

      {isEditing === true && (
        <>
          <EditUser></EditUser>
        </>
      )}
    </>
  );
};

export default Page;
