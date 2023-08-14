import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import "./CommentSection.module.css"; // Import the CSS file for styling
import CommentForm from "./CommentForm";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fireBase/firebase";

const CommentSection = ({ productId, user }) => {
  // const comments = [
  //   {
  //     id: 1,
  //     name: "lara_stewart",
  //     message: "Hmm, This poster looks cool",
  //     timestamp: "2 days ago",
  //     upvotes: 0,
  //     status: "",
  //   },
  // ];
  const [comments, setComments] = useState([]);
  const [commentsEnabled, setCommentsEnabled] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("productId", "==", productId)
    );
    //fetch the comments and update the state
    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map((doc) => doc.data());
        setComments(fetchedComments);
      } catch (error) {
        console.log("Error Fetching comments:", error);
      }
    };
    fetchComments();
  }, [productId]);
  const handleSwitchChange = () => {
    // Toggle the comments visibility
    setCommentsEnabled(!commentsEnabled);
  };
  return (
    <section className="comment-section full-width-section">
      <div className="container my-5 py-5 text-dark">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-dark mb-0">Comments ({comments.length})</h4>
              <div className="card">
                <div className="card-body p-2 d-flex align-items-center">
                  <h6 className="text-primary fw-bold small mb-0 me-1">
                    {commentsEnabled ? "Comments ON" : "Comments OFF"}
                  </h6>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked={commentsEnabled}
                      onChange={handleSwitchChange} // Add the event handler here
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckChecked"
                    ></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Map through the comments array and render each comment card */}
            {commentsEnabled &&
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
          </div>
        </div>
      </div>
      {commentsEnabled && <CommentForm productId={productId} />}
    </section>
  );
};

export default CommentSection;
