import Axios from "axios";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const videoId = props.postId;

  const user = useSelector((state) => state.user);

  const [commentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      alert("로그인이 필요합니다.");
      props.history.push("/login");
      return;
    }

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        // console.log(response.data.result);
        setCommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>{props.commentLists.length} Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={videoId}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  commentLists={props.commentLists}
                  postId={videoId}
                  parentCommentId={comment._id}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder={
            user.userData && !user.userData.isAuth
              ? "로그인이 필요합니다."
              : "코멘트를 작성해 주세요"
          }
        ></textarea>

        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
