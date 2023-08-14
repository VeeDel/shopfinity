import * as firebase from "firebase/firestore";
import { auth, db } from "../../fireBase/firebase";
import React, { useState } from "react";

export default function CommentForm({ productId }) {
  const [commenterText, setCommenterText] = useState("");

  const addComment = async () => {
    if (!auth.currentUser) {
      console.log("User not logged in. Please log in to add a comment.");
      return;
    }

    const comment = {
      productId: productId,
      author: auth.currentUser.displayName,
      commenterText,
      createdAt: new Date(),
    };

    try {
      const docRef = await firebase.addDoc(
        firebase.collection(db, "comments"),
        comment
      );
      console.log("Document written with ID: ", docRef.id);
      setCommenterText("");
      window.location.reload();
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  return (
    <div>
      <form>
        <div className="form-group mb-1">
          <textarea
            value={commenterText}
            onChange={(e) => setCommenterText(e.target.value)}
            className="form-control"
            placeholder="Comments"
          ></textarea>
          <button
            onClick={() => addComment()}
            className="form-control mt-2 btn btn-warning"
            type="button"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
