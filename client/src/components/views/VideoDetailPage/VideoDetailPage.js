import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage(props) {
  const [VideoDetail, setVideoDetail] = useState([]);

  const [Comments, setComments] = useState([]);
  const variable = { videoId: props.match.params.videoId };

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.VideoDetail);
      } else {
        alert("비디오 정보 가져오기 실패");
      }
    });

    Axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("코멘트 정보를 가져오는 것을 실패 했습니다.");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  if (VideoDetail.writer) {
    return (
      // <Row gutter={[16, 16]}>
      <Row>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
              // autoPlay
            ></video>

            <List.Item
              actions={[
                <LikeDislikes
                  video
                  userId={localStorage.getItem("userId")}
                  videoId={variable.videoId}
                />,
                VideoDetail.writer._id !== localStorage.getItem("userId") ? (
                  <Subscribe
                    userTo={VideoDetail.writer._id}
                    userFrom={localStorage.getItem("userId")}
                  />
                ) : null,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description}
              ></List.Item.Meta>
            </List.Item>

            {/* 댓글부분 */}
            <Comment
              history={props.history}
              refreshFunction={refreshFunction}
              commentLists={Comments}
              postId={variable.videoId}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...Loading</div>;
  }
}

export default VideoDetailPage;
