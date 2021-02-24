import React, { useState } from "react";
import { Comment, Avatar } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
import LikeDislikes from "./LikeDislikes";

// const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const OpenReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const actions = [
    <LikeDislikes
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span onClick={OpenReplyOpen} key="comment-basic-reply-to">
      {" "}
      Reply to
    </span>,
  ];

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        // console.log(response.data.result);
        props.refreshFunction(response.data.result);
        setOpenReply(false);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} />}
        content={<p> {props.comment.content}</p>}
      />

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          ></textarea>

          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;