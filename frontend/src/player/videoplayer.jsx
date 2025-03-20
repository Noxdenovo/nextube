import { useRef, useState, useEffect } from "react";
import playButton from "../assets/play-button.svg";
import pauseButton from "../assets/pause-button.svg";
import fullScreenButton from "../assets/fullscreen-icon.svg";
import volumeMutedButton from "../assets/volume-muted-white-icon.svg";
import volumeFullButton from "../assets/volume-white-icon.svg";
export function VideoPlayer({ videouuid, timeStampRef, startTime = 0 }) {
  const buttonRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  let playerRef = useRef(null);
  useEffect(() => {
    //setting up the player after the first render
    const player = dashjs.MediaPlayer().create();
    const url = `http://localhost:5000/media/${videouuid}/dash_manifest.mpd`;

    const video = document.querySelector("#videoPlayer");

    player.initialize(false);
    player.attachSource(url, startTime);
    player.attachView(video);
    player.setAutoPlay(false);
    playerRef.current = player;
    player.updateSettings({
      debug: {
        logLevel: dashjs.Debug.NONE /* turns off console logging */,
      },
      streaming: {
        scheduling: {
          scheduleWhilePaused: true /* stops the player from loading segments while paused */,
        },
        buffer: {
          fastSwitchEnabled: true /* enables buffer replacement when switching bitrates for faster switching */,
        },
      },
    });
  }, [videouuid]);

  //pauses and plays video
  function handlePauseClick() {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }
  function timeUpdate() {
    timeStampRef.current = videoRef.current && videoRef.current.currentTime;
  }
  return (
    <>
      <div className="video-container w-full relative" ref={videoContainerRef}>
        <video
          id="videoPlayer"
          onTimeUpdate={timeUpdate}
          className="rounded-t-xl w-full"
          ref={videoRef}
          onPause={() => {
            setVideoPlaying(false);
          }}
          onPlay={() => {
            setVideoPlaying(true);
          }}
        ></video>
        <VideoControls
          handlePauseClick={handlePauseClick}
          isVideoplaying={isVideoPlaying}
          videoRef={videoRef.current}
          player={playerRef.current}
          container={videoContainerRef.current}
        />
      </div>
    </>
  );
}
//setting up the control elements
function VideoControls({ handlePauseClick, isVideoplaying, videoRef: video, player, container }) {
  const [currentFormattedTime, setFormattedTime] = useState(20);
  const [currentVolume, setVolume] = useState(1);
  const [currentPlayback, setPlayback] = useState(0);

  const bufferBar = useRef(null);
  let progressBar = useRef(null);
  let trackRef = useRef(null);
  let volumeRef = useRef(null);
  const availableQualities = player && player.getRepresentationsByType("video");
  player &&
    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: { audio: true, video: false },
        },
      },
    });
  const [qualityMenu, setQualityMenu] = useState([]);

  useEffect(() => {
    if (availableQualities) {
      for (let adaptationSet of availableQualities) {
        console.log(adaptationSet.width);
      }
      let qualityList = [];
      qualityList.push(
        <label for="auto-option">
          auto{" "}
          <input
            type="radio"
            name="quality-option"
            id="auto-option"
            onInput={() => {
              player &&
                player.updateSettings({
                  streaming: {
                    abr: {
                      autoSwitchBitrate: { audio: true, video: true },
                    },
                  },
                });
            }}
          ></input>
        </label>
      );
      console.log(availableQualities);
      availableQualities.forEach((element, index) => {
        qualityList.push(
          <label key={index} htmlFor={`quality-${index}`}>
            {`${element.height}`}
            <input
              type="radio"
              onInput={() => {
                if (player) {
                  player.updateSettings({
                    streaming: {
                      abr: {
                        autoSwitchBitrate: { audio: true, video: false },
                      },
                    },
                  });
                  player.setRepresentationForTypeByIndex("video", index);
                  console.log(player.getCurrentRepresentationForType("video"));
                }
              }}
              name="quality-option"
              id={`quality-${index}`}
              value={index}
            ></input>
          </label>
        );
      });
      setQualityMenu(qualityList);
    }
  }, [player]);

  function timeFormatter(time) {
    const timeInMinutes = Math.floor(time / 60);
    let leftoverSeconds = Math.round(time - timeInMinutes * 60);
    if (leftoverSeconds < 10) {
      leftoverSeconds = `0${leftoverSeconds}`;
    }
    const formattedTime = `${timeInMinutes}:${leftoverSeconds}`;
    return formattedTime;
  }
  const duration = video?.duration;

  const durationFormatted = duration ? timeFormatter(duration) : "";

  if (video) {
    video.addEventListener("timeupdate", () => {
      setFormattedTime(timeFormatter(Math.round(video.currentTime)));
      progressBar.current.style.width = `${(100 * video.currentTime) / video.duration}%`;

      setPlayback(video.currentTime);
    });
    video.addEventListener("progress", () => {
      for (let i = 0; i < video.buffered.length; i++) {
        if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
          bufferBar.current.style.width = `${
            (100 * video.buffered.end(video.buffered.length - 1 - i)) / video.duration
          }%`;
          break;
        }
      }
    });
  }
  return (
    <div className="absolute bottom-0 w-full ">
      <div className="flex items-center gap-4  top-0">
        <div className="h-2 relative w-full">
          <span
            className=" h-1 block w-0 bg-gray-400 absolute buffered-amount z-[1] "
            ref={bufferBar}
          ></span>
          <span className="grow h-1 block w-full bg-gray-300 full-bar absolute z-0"></span>
          <span
            className=" h-1 block w-0 bg-gray-500 absolute progress-bar z-[2]"
            ref={progressBar}
          ></span>
          <input
            value={currentPlayback}
            type="range"
            className="time-range"
            min="0"
            max={`${video && video.duration}`}
            step="1"
            id="videoSlider"
            ref={trackRef}
            onInput={(e) => {
              video.currentTime = e.target.value;
              setPlayback(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div class="flex justify-between">
        <div className="flex  items-center justify-between gap-2 basis-60">
          <button
            onClick={handlePauseClick}
            style={{
              backgroundImage: !isVideoplaying ? `url("${playButton} ")` : `url("${pauseButton} ")`,
            }}
            className="play-pause paused "
          ></button>
          <button
            onClick={() => {
              if (currentVolume === 0) {
                video.volume = 1;
                setVolume(1);
              } else {
                video.volume = 0;
                setVolume(0);
              }
            }}
            className="h-6 w-6 bg-black bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage:
                currentVolume > 0 ? `url("${volumeFullButton} ")` : `url("${volumeMutedButton} ")`,
            }}
          ></button>
          <div className="h-1 relative grow ">
            <span className="h-1 w-full block bg-gray-300 "></span>
            <input
              type="range"
              className="volume  z-1 top-0"
              value={currentVolume}
              step="0.01"
              max="1"
              onInput={(e) => {
                video.volume = e.target.value;
                setVolume(e.target.value);
              }}
              ref={volumeRef}
            ></input>
          </div>
          <div>
            {currentFormattedTime}/{durationFormatted}
          </div>
        </div>
        <button
          className="h-8 w-6 bg-no-repeat bg-contain ml-1"
          style={{ backgroundImage: `url("${fullScreenButton} ")` }}
          onClick={() => {
            if (container.fullscreenElement) container.exitFullscreen();
            else {
              container.requestFullscreen();
            }
          }}
        ></button>
      </div>
      {qualityMenu}
    </div>
  );
}
