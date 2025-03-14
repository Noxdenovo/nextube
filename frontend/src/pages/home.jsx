import { Header, MiniSideBar, truncString } from "../utils.jsx";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";

export function HomePage() {
  const [homeVideoData, setVideoData] = useState({});
  useEffect(() => {
    async function getVideos() {
      const data = await fetch(`http://localhost:5000/videos/api/random_videos/home`);
      setVideoData(await data.json());
    }
    //
    getVideos();
  }, []);
  const homeVideos = homeVideoData.random_videos;

  const homeVideoList = [];

  homeVideos &&
    homeVideos.forEach((video, index) => {
      homeVideoList.push(
        <Link to={`/${video.uuid}`}>
          <div>
            <MiniVideo videoData={video} key={index} />
            <p title={video.title} className="mt-1 mb-1 overflow-hidden text-lg text-bold">
              {truncString(video.title, 50)}
            </p>

            <span className="text-sm text-gray-500 font-normal block">
              {video.username}

              <span className="block">
                {video.time_delta} {video.views + " views"}
              </span>
            </span>
          </div>
        </Link>
      );
    });
  return (
    <>
      <div className="grid  grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]  max-w-full auto-rows-auto gap-2 mr-10 ">
        {homeVideoList}
      </div>
    </>
  );
}
export function MiniVideo({ videoData, startTime = 0 }) {
  // const fullTitle = videoData && videoData.title;
  let videoRef = useRef(null);
  useEffect(() => {
    const player = dashjs.MediaPlayer().create();
    const url1 = "";
    const url = `http://localhost:5000/media/${videoData.uuid}/dash_manifest.mpd`;
    videoRef.current.autoPlay = "false";
    // const videoPlayer = document.querySelector("#videoPlayer");
    player.initialize(videoRef.current, url1, false);
    console.log(startTime);
    player.attachSource(url, startTime);

    player.updateSettings({
      debug: {
        logLevel: dashjs.Debug.NONE,
      },
      streaming: {
        scheduling: {
          scheduleWhilePaused: true,
        },
        buffer: {
          fastSwitchEnabled: true,
        },
      },
    });
  }, []);

  //preview videos play on hover
  function handleMouseEnter(e) {
    e.target.play();
  }
  function handleMouseLeave(e) {
    e.target.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        id="videoPlayer"
        className=" rounded-xl  w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></video>
    </>
  );
}
