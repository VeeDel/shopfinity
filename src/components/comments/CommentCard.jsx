import { Heart } from "phosphor-react";
import React from "react";

const getFormattedTimeDifference = (timestamp) => {
  const now = new Date();
  const differenceInSeconds = Math.floor((now - timestamp) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} sec ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} min ago`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} h ago`;
  } else {
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} days ago`;
  }
};

const CommentCard = ({ comment }) => {
  const timestamp = new Date(
    comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000
  );

  const formattedTimestamp = getFormattedTimeDifference(timestamp);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
            alt="avatar"
            width="40"
            height="40"
          />
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className={`fw-bold mb-0 `}>{comment.author}</h6>
              <p className="mb-0">{formattedTimestamp}</p>{" "}
              {/* Display the formatted timestamp */}
            </div>
            <span className="text-dark ms-2 comment-text">
              {comment.commenterText}
            </span>
            <div className="d-flex justify-content-between align-items-center">
              <p className="small mb-0" style={{ color: "#aaa" }}>
                {/* <a href="#!" className="link-grey">
                <Heart size={22} />
              </a> */}
              </p>
              <div className="d-flex flex-row">
                <i className="fas fa-star text-warning me-2"></i>
                <i
                  className="far fa-check-circle"
                  style={{ color: "#aaa" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
