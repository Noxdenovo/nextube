import { useContext, useState, useEffect, useRef } from "react";

import { AuthContext } from "../context.jsx";
import { VideoPlayer } from "../player/videoplayer.jsx";
import { useParams, useLocation } from "react-router";
import { Link, useNavigate } from "react-router";
import { LikeButton, DislikeButton, SubscribeButton } from "../icons.jsx";

import { CommentForm } from "../forms/forms.jsx";

export default function Videopage() {
  let params = useParams();
  let videouuid = params.videouuid;
  let location = useLocation().pathname;
  const [isAuthenticated, setAuthenticated] = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [randomData, setRandomData] = useState({});
  let timeStampRef = useRef(0);

  useEffect(() => {
    if (isAuthenticated) {
      appendHistory(timeStampRef.current);
    }
  }, [videouuid, location]);

  window.onbeforeunload = function (e) {
    appendHistory(timeStampRef.current);
  };

  function appendHistory(timeStamp = 0) {
    fetch(`http://localhost:5000/videos/api/user/append_history/${videouuid}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ timeStamp: timeStamp }),
    });
  }
  //fetches data for the current(main) video
  useEffect(() => {
    async function getVideoData() {
      const result = await fetch(`http://localhost:5000/videos/api/${videouuid}`, {
        credentials: "include",
      });

      setVideoData(await result.json());
    }
    getVideoData();

    //fetches data for the random videos(right section of the page)
  }, [videouuid]);

  useEffect(() => {
    async function getRandomVideos() {
      const result = await fetch(`http://localhost:5000/videos/api/random_videos/${videouuid}`);
      setRandomData(await result.json());
    }
    getRandomVideos();
  }, [videouuid]);

  //

  const randomVideos = randomData.random_videos;

  const randomVideoList = [];

  randomVideos &&
    randomVideos.forEach((element, index) => {
      randomVideoList.push(<MiniVideo videoData={element} key={index} />);
    });

  return (
    <>
      <div className="flex gap-3">
        <div className="main flex flex-col  w-3/5  ">
          <VideoPlayer
            videouuid={videouuid}
            timeStampRef={timeStampRef}
            startTime={params.timestamp}
          />
          <VideoDescription videoData={videoData} />
          <CommentSection isAuthenticated={isAuthenticated} />
        </div>
        <div className="suggestions flex flex-col ml-5 mr-10 w-2/6">
          <h1 className="text-xl mt-0 text-start">
            <strong>{randomVideoList}</strong>
          </h1>
        </div>
      </div>
    </>
  );
}

function VideoDescription({ videoData }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [feedback, setFeedback] = useState("none");
  useEffect(() => {
    setLikes(videoData && videoData.likes);
  }, [videoData]);
  useEffect(() => {
    setDislikes(videoData && videoData.dislikes);
  }, [videoData]);

  useEffect(() => {
    setFeedback(videoData && videoData.feedback_status);
  }, [videoData]);

  async function handleLike(feedback) {
    {
      if (feedback == "none") {
        setLikes(likes + 1);
        setFeedback("liked");
      }
      if (feedback == "liked") {
        setLikes(likes - 1);
        setFeedback("none");
      }
      if (feedback == "disliked") {
        setLikes(likes + 1);
        setDislikes(dislikes - 1);
        setFeedback("liked");
      }
      const response = await fetch(
        `http://localhost:5000/videos/api/feedback/like/video/${videoData.uuid}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      setFeedback(result.feedback_status);
    }
  }

  async function handleDislike(feedback) {
    {
      if (feedback == "none") {
        setDislikes(dislikes + 1);
        setFeedback("disliked");
      }
      if (feedback == "disliked") {
        setDislikes(dislikes - 1);
        setFeedback("none");
      }
      if (feedback == "liked") {
        setDislikes(dislikes + 1);
        setLikes(likes - 1);
        setFeedback("disliked");
      }

      const response = await fetch(
        `http://localhost:5000/videos/api/feedback/dislike/video/${videoData.uuid}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      setFeedback(result.feedback_status);
    }
  }

  return (
    <div>
      <p className="mt-3 text-lg">
        <strong> {videoData ? videoData.title : "loading"}</strong>
      </p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <p className="leading-6 mr-5 rounded-lg p-1 h-10">
            <strong>{videoData ? videoData.Username : "loading"}</strong> <br></br>{" "}
            {videoData ? videoData.subscribers + " subscribers" : "loading"}
          </p>

          <SubscribeButton />
        </div>
        <div className="flex items-center ">
          <LikeButton
            likes={likes}
            handleClick={() => {
              handleLike(feedback);
            }}
            feedback={feedback}
          />
          <DislikeButton
            dislikes={dislikes}
            handleClick={() => {
              handleDislike(feedback);
            }}
            feedback={feedback}
          />
        </div>
      </div>
      <p className="bg-gray-200 mt-6 rounded-lg p-1">
        {videoData ? videoData.description : "loading"}
      </p>
    </div>
  );
}
export function MiniVideo({ videoData }) {
  const fullTitle = videoData && videoData.title;

  //shortens the title if its too long
  let truncatedTitle = fullTitle;
  if (truncatedTitle && truncatedTitle.length > 50) {
    truncatedTitle = truncatedTitle.trim();
    truncatedTitle = truncatedTitle.split(" ");
    truncatedTitle.pop();
    truncatedTitle.push("...");
    truncatedTitle = truncatedTitle.join(" ");
  }

  //preview videos play on hover
  function handleMouseEnter(e) {
    e.target.play();
  }
  function handleMouseLeave(e) {
    e.target.currentTime = 0.0;
    e.target.pause();
  }

  return (
    <>
      <Link to={`/${videoData.uuid}`}>
        <div className=" flex items-start">
          <video
            muted={true}
            id="suggested-video"
            className=" rounded-xl mt-2 mb-2 mr-2 max-w-60"
            src={`http://localhost:5000/media/${videoData.uuid}/thumbnail.mp4`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></video>

          <div>
            <p title={fullTitle} className="mt-1 mb-2 pb-1 overflow-hidden text-base">
              {truncatedTitle}
            </p>

            <p className="text-sm text-gray-500 font-normal">
              {videoData ? videoData.username : ""}
              <br></br>
              {videoData && videoData.time_delta} {videoData ? videoData.views + " views" : ""}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

function Comment({ commentData, setRefreshReplies = "", refreshReplies = "" }) {
  const [commentLikes, setLikes] = useState(0);
  const [commentDislikes, setDislikes] = useState(0);
  const [feedback, setFeedback] = useState("none");
  useEffect(() => {
    setLikes(commentData.likes);
  }, [commentData.likes]);

  useEffect(() => {
    setDislikes(commentData.dislikes);
  }, [commentData.dislikes]);
  useEffect(() => {
    setFeedback(commentData.feedback_status);
  }, [commentData.feedback_status]);
  async function handleLike(feedback) {
    {
      if (feedback == "none") {
        setLikes(commentLikes + 1);
      }
      if (feedback == "liked") {
        setLikes(commentLikes - 1);
      }
      if (feedback == "disliked") {
        setLikes(commentLikes + 1);
        setDislikes(commentDislikes - 1);
      }
      const response = await fetch(
        `http://localhost:5000/videos/api/feedback/like/comment/${commentData.pk}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      setFeedback(result.feedback_status);
    }
  }
  async function handleDislike(feedback) {
    {
      if (feedback == "none") {
        setDislikes(commentDislikes + 1);
        setFeedback("disliked");
      }
      if (feedback == "disliked") {
        setDislikes(commentDislikes - 1);
        setFeedback("none");
      }
      if (feedback == "liked") {
        setDislikes(commentDislikes + 1);
        setLikes(commentLikes - 1);
        setFeedback("disliked");
      }

      const response = await fetch(
        `http://localhost:5000/videos/api/feedback/dislike/comment/${commentData.pk}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();

      setFeedback(result.feedback_status);
    }
  }

  useEffect(() => {
    if (refreshReplies) {
      handleReplies(commentData.root_pk);

      setRefreshReplies(false);
    }
  }, [refreshReplies]);

  const params = useParams();
  const videouuid = params.videouuid;

  const [isFormShown, setFormShown] = useState(false);
  const [isAuthenticated, setAuthenticated] = useContext(AuthContext);
  const [repliesData, setRepliesData] = useState([]);
  const navigate = useNavigate(null);

  async function handleReplies(pk) {
    const result = await fetch(`http://localhost:5000/videos/api/comments/replies/${pk}`, {
      credentials: "include",
    });
    const result_json = await result.json();
    const listToRender = await result_json.replies.map((reply, index) => {
      return (
        <Comment
          commentData={reply}
          key={index}
          root_pk={reply.root_pk}
          setRefreshReplies={setRefreshReplies}
          feedback_status={reply.feedback_status}
        />
      );
    });

    setRepliesData(listToRender);
  }

  function handleClick() {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
    setFormShown(!isFormShown);
  }
  function hideReplies() {
    setRepliesData([]);
  }

  return (
    <div className="mt-5 mb-5">
      <span>
        <strong>{commentData.display_name}</strong>
      </span>
      <p className="mb-2">{commentData.body}</p>
      <button onClick={handleClick}>reply</button>
      <div className="">
        <LikeButton
          likes={commentLikes}
          handleClick={() => {
            handleLike(feedback);
          }}
          feedback={feedback}
        />
        <DislikeButton
          dislikes={commentDislikes}
          handleClick={() => {
            handleDislike(feedback);
          }}
          feedback={feedback}
        />
        {isFormShown ? (
          <CommentForm
            videouuid={videouuid}
            parent_pk={commentData.pk}
            root_pk={commentData.root_pk}
            setRefreshReplies={setRefreshReplies}
            submit_text={"Reply"}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {repliesData.length === 0 ? (
          <>
            {commentData.has_replies ? (
              <p onClick={() => handleReplies(commentData.pk)} className=" text-blue-600">
                ▽ {commentData.has_replies} replies
              </p>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className="pl-6">
            {repliesData}{" "}
            <p onClick={hideReplies} className="text-blue-600">
              Hide replies
            </p>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
function CommentSection() {
  const [commentsData, setCommentsData] = useState({});
  const [needRefreshComments, setRefreshComments] = useState(false);
  const [refreshReplies, setRefreshReplies] = useState(false);
  let params = useParams();
  let videouuid = params.videouuid;

  useEffect(() => {
    async function getComments() {
      const result = await fetch(`http://localhost:5000/videos/api/comments/${videouuid}`, {
        credentials: "include",
      });
      setCommentsData(await result.json());
    }
    getComments();
    setRefreshComments(false);
    setRefreshReplies(false);
  }, [videouuid, needRefreshComments, refreshReplies]);

  const commentList = commentsData && commentsData.comments;
  const listToRender =
    commentList &&
    commentList.map((comment, index) => {
      return (
        <Comment
          commentData={comment}
          // display_name={comment.display_name}
          // body={comment.body}
          // pk={comment.pk}
          root_pk={comment.pk}
          key={index}
          // hasReplies={comment.has_replies}
          setRefreshComments={setRefreshComments}
          needRefreshComments={needRefreshComments}
          setRefreshReplies={setRefreshReplies}
          refreshReplies={refreshReplies}
          // likes={comment.likes}
          // dislikes={comment.dislikes}
          // feedback_status={comment.feedback_status}
        />
      );
    });

  return (
    <>
      <CommentForm
        videouuid={videouuid}
        setRefreshComments={setRefreshComments}
        submit_text={"Comment"}
      />
      <div>{listToRender}</div>
    </>
  );
}
