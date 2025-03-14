import { useEffect, useState } from "react";
import { MiniVideo } from "./home.jsx";
import { Link } from "react-router";
import { truncString } from "../utils";
import { SearchButton, ClearHistoryButton } from "../icons.jsx";
export function HistoryPage() {
  const [historyData, setHistory] = useState();
  useEffect(() => {
    async function getHistory() {
      const response = await fetch("http://localhost:5000/videos/api/user/history", {
        credentials: "include",
      });

      setHistory(await response.json());
    }
    getHistory();
  }, []);

  let videosToDisplay = [];

  if (historyData) {
    Object.keys(historyData).forEach((date) => {
      {
        let videoRow = [];
        historyData[date].forEach((video, index) => {
          videoRow.push(
            <Link to={`/${video.uuid}/${video.timestamp}`}>
              <div className="flex mt-4 mb-4 gap-2">
                <div className=" max-w-60 ">
                  <MiniVideo videoData={video} startTime={video.timestamp} key={index} />
                </div>
                <div className="w-full">
                  <span className="block ">{truncString(video.title, 50)}</span>
                  <span className="block text-sm text-gray-500 font-normal">
                    {video.username} · {video.views} views
                  </span>
                  <span className="text-sm text-gray-500 font-normal block mt-2">
                    {truncString(video.description, 85)}
                  </span>
                </div>
              </div>
            </Link>
          );
        });

        videosToDisplay.push(
          <>
            {" "}
            <h2 className="text-xl font-bold pt-6 pb-2">{date}</h2>
            {videoRow}
          </>
        );
      }
    });
  }

  return (
    <>
      <h1 className="text-4xl font-bold pt-6 pb-2">Watch History</h1>

      <div className="flex justify-between gap-6">
        <div className=" ">
          {videosToDisplay.length > 0 ? (
            videosToDisplay
          ) : (
            <div className="">
              <span>No history to display</span>
            </div>
          )}
        </div>
        <div className="mr-20  mt-10">
          <form className="search-bar flex">
            <div className="flex border-b border-b-black pb-2 w-8/12 pt-6">
              <button type="submit" value="search" className="">
                <SearchButton />
              </button>
              <input
                type="text"
                placeholder="Search watch history"
                className="focus: outline-none pl-2"
              ></input>
            </div>
          </form>
          <button className="mt-7">
            <ClearHistoryButton />
            <span className="align-middle">Clear watch history</span>
          </button>
        </div>
      </div>
    </>
  );
}
