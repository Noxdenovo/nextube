import { useNavigate, Link, Outlet, useLocation } from "react-router";
export function LogoImage() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
      fill="#000000"
      className="w-full"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <circle style={{ fill: "#2196f3", cx: "64", cy: "64", r: "64" }}></circle>{" "}
          <path
            style={{ fill: "#1976d2" }}
            d="M115.061,102.578L99.605,64.253c-0.028-0.159-0.08-0.314-0.158-0.468 c-0.073-0.522-0.396-1.032-1.004-1.429L45.462,27.644c-1.38-0.904-2.509-0.294-2.509,1.356v0.512v0.512V99v0.512V100l10.796,27.172 C57.088,127.71,60.51,128,64,128C84.855,128,103.376,118.02,115.061,102.578z"
          ></path>{" "}
          <path
            style={{ fill: "#F5F5F5" }}
            d="M42.953,29c0-1.65,1.129-2.26,2.509-1.356l52.981,34.712c1.38,0.904,1.38,2.384,0,3.289 l-52.981,34.711c-1.38,0.904-2.509,0.295-2.509-1.355V29z"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
export function ClearHistoryButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
      aria-hidden="true"
      style={{ pointerEvents: "none", display: "inherit" }}
    >
      <path d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"></path>
    </svg>
  );
}

export function PlaylistButton() {
  let location = useLocation().pathname;
  return (
    <>
      {location === "playlists" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit" }}
        >
          <path
            clip-rule="evenodd"
            d="M4 5c-.552 0-1 .448-1 1s.448 1 1 1h16c.552 0 1-.448 1-1s-.448-1-1-1H4Zm-1 5c0-.552.448-1 1-1h16c.552 0 1 .448 1 1s-.448 1-1 1H4c-.552 0-1-.448-1-1Zm11 3.862c0-.384.415-.625.748-.434L21 17l-6.252 3.573c-.333.19-.748-.05-.748-.435v-6.276ZM4 13c-.552 0-1 .448-1 1s.448 1 1 1h6c.552 0 1-.448 1-1s-.448-1-1-1H4Zm-1 5c0-.552.448-1 1-1h6c.552 0 1 .448 1 1s-.448 1-1 1H4c-.552 0-1-.448-1-1Z"
            fill-rule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit" }}
        >
          <path
            clipRule="evenodd"
            d="M3.75 5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 5 20.25 5H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 9 20.25 9H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-8.5Zm8.5 4c.414 0 .75.336.75.75s-.336.75-.75.75h-8.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h8.5Zm3.498-3.572c-.333-.191-.748.05-.748.434v6.276c0 .384.415.625.748.434L22 17l-6.252-3.572Z"
            fillRule="evenodd"
          ></path>
        </svg>
      )}
    </>
  );
}

export function SearchButton({ fill = "#000000" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
      aria-hidden="true"
      style={{ pointerEvents: "none", display: "inherit" }}
    >
      <path
        clipRule="evenodd"
        d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}

export function HistoryButton() {
  let location = useLocation().pathname;
  return (
    <>
      {location === "/history" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit" }}
        >
          <path
            clipRule="evenodd"
            d="M13.847 5.248c-1.638-.448-3.384-.285-4.91.458C7.853 6.233 6.933 7.026 6.254 8H8.5c.552 0 1 .448 1 1s-.448 1-1 1H3V4.5c0-.552.448-1 1-1s1 .448 1 1v1.843c.823-1.018 1.865-1.853 3.061-2.435 1.963-.956 4.207-1.165 6.313-.59 2.106.577 3.931 1.899 5.135 3.72 1.204 1.822 1.704 4.02 1.408 6.183-.296 2.163-1.369 4.145-3.018 5.576-1.649 1.431-3.762 2.214-5.945 2.203-2.184-.011-4.289-.816-5.923-2.264-1.634-1.448-2.686-3.441-2.96-5.607-.07-.548.319-1.049.867-1.118.548-.07 1.048.319 1.117.867.213 1.685 1.031 3.235 2.302 4.361 1.272 1.126 2.909 1.752 4.607 1.76 1.698.01 3.342-.6 4.624-1.712 1.283-1.113 2.117-2.655 2.347-4.337.23-1.683-.159-3.392-1.095-4.809-.936-1.417-2.355-2.445-3.993-2.893ZM13 7.5c0-.552-.448-1-1-1s-1 .448-1 1v5.015l.419.299 3.5 2.5c.45.32 1.074.217 1.395-.233.32-.45.217-1.074-.233-1.395L13 11.486V7.5Z"
            fillRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit" }}
        >
          <path
            clipRule="evenodd"
            d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z"
            fillRule="evenodd"
          ></path>
        </svg>
      )}
    </>
  );
}

export function UserButton({ isLabeled = false }) {
  return (
    <>
      {location === "/user" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
        >
          <path
            clipRule="evenodd"
            d="M18.37 19.709A9.98 9.98 0 0022 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.98 9.98 0 003.63 7.709A9.96 9.96 0 0012 22a9.96 9.96 0 006.37-2.291ZM6.15 18.167a6.499 6.499 0 0111.7 0A8.47 8.47 0 0112 20.5a8.47 8.47 0 01-5.85-2.333ZM15.5 9.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0Z"
            fillRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit" }}
        >
          <path
            clipRule="evenodd"
            d="M12 20.5c1.894 0 3.643-.62 5.055-1.666a5.5 5.5 0 00-10.064-.105.755.755 0 01-.054.099A8.462 8.462 0 0012 20.5Zm4.079-5.189a7 7 0 012.142 2.48 8.5 8.5 0 10-12.443 0 7 7 0 0110.3-2.48ZM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm2-12.5a2 2 0 11-4 0 2 2 0 014 0Zm1.5 0a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0Z"
            fillRule="evenodd"
          ></path>
        </svg>
      )}
    </>
  );
}

export function ShortsButton() {
  let location = useLocation().pathname;
  return (
    <>
      {location === "/shorts" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            aria-hidden="true"
            style="pointer-events: none; display: inherit; width: 100%; height: 100%;"
          >
            <path
              clip-rule="evenodd"
              d="M18.45 8.851c1.904-1.066 2.541-3.4 1.422-5.214-1.119-1.814-3.57-2.42-5.475-1.355L5.55 7.247c-1.29.722-2.049 2.069-1.968 3.491.081 1.423.989 2.683 2.353 3.268l.942.404-1.327.742c-1.904 1.066-2.541 3.4-1.422 5.214 1.119 1.814 3.57 2.421 5.475 1.355l8.847-4.965c1.29-.722 2.049-2.068 1.968-3.49-.081-1.423-.989-2.684-2.353-3.269l-.942-.403 1.327-.743ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
              fill-rule="evenodd"
            ></path>
          </svg>
          <span className="text-xs">Shorts</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            aria-hidden="true"
            style={{ pointerEvents: "none", display: "inherit" }}
          >
            <path
              clipRule="evenodd"
              d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
              fillRule="evenodd"
            ></path>
          </svg>
        </>
      )}
    </>
  );
}
export function SubButton() {
  let location = useLocation().pathname;
  return (
    <>
      {location === "subs" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
        >
          <path
            clipRule="evenodd"
            d="M5.5 3A1.5 1.5 0 004 4.5h16A1.5 1.5 0 0018.5 3h-13ZM2 7.5A1.5 1.5 0 013.5 6h17A1.5 1.5 0 0122 7.5v11a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-11Zm8 2.87a.5.5 0 01.752-.431L16 13l-5.248 3.061A.5.5 0 0110 15.63v-5.26Z"
            fillRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit" }}
        >
          <path
            clipRule="evenodd"
            d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z"
            fillRule="evenodd"
          ></path>
        </svg>
      )}
    </>
  );
}

export function SubscribeButton() {
  return (
    <button className=" rounded-3xl bg-black  hover:bg-gray-600 pl-1 active:bg-blue-700 text-white min-w-35 h-9  ">
      <span className="p-1 pr-2">Subscribe</span>
    </button>
  );
}

export function SidebarButton({ handleClick }) {
  return (
    <>
      <div className="min-w-8 flex justify-center  relative" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: "none", display: "inherit" }}
        >
          <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
        </svg>
      </div>
    </>
  );
}

export function HomeButton() {
  let location = useLocation().pathname;

  return (
    <Link to="/home">
      <>
        {location === "/home" ? (
          <div className="flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
              style={{ pointerEvents: "none", display: "inherit" }}
            >
              <path
                clipRule="evenodd"
                d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5H14v-8h-4v8H5.5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146Z"
                fillRule="evenodd"
              ></path>
            </svg>{" "}
          </div>
        ) : (
          <div className="flex flex-col ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
              style={{ pointerEvents: "none", display: "inherit" }}
            >
              <path
                clipRule="evenodd"
                d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5h-5v-7h-3v7h-5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146ZM18.5 9.621l-6.5-6.5-6.5 6.5V19.5H9V13a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v6.5h3.5V9.621Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </>
    </Link>
  );
}
export function LikeButton({ likes, handleClick, feedback }) {
  let bgColor = "bg-gray-200";
  let fill = "none";

  if (feedback === "liked") {
    bgColor = "bg-gray-400";
    fill = "#000000";
  }
  return (
    <>
      <button
        onClick={handleClick}
        className={`rounded-l-lg bg-gray-200 h-7 hover:bg-gray-300 pr-2 border-r border-gray-400 active:bg-blue-700`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill={fill}
          style={{ display: "inline" }}
        >
          <path
            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="align-top">{likes}</span>
      </button>
    </>
  );
}
export function DislikeButton({ dislikes, handleClick, feedback }) {
  let fill = "none";

  if (feedback === "disliked") {
    fill = "#000000";
  }
  return (
    <button
      className="rounded-r-lg bg-gray-200 h-7 hover:bg-gray-300 pl-1 pr-2 active:bg-blue-700"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill={fill}
        style={{ display: "inline" }}
      >
        <path
          d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="sound"
        />
      </svg>
      <span className="align-top">{dislikes}</span>
    </button>
  );
}
