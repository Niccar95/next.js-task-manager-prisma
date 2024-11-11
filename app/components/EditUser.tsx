import React from "react";

const EditUser = () => {
  return (
    <>
      <h1>Edit profile</h1>
      <form>
        <label htmlFor="textInput">Change display name: </label>
        <input id="textInput" className="textInput" type="text"></input>

        <label className="uploadLabel" htmlFor="uploadButton">
          <i className="fa-solid fa-upload"></i>Upload image
        </label>
        <input
          className="uploadButton"
          type="file"
          id="uploadButton"
          name="Image"
        ></input>

        <button type="submit">Save Changes</button>
      </form>
    </>
  );
};

export default EditUser;
