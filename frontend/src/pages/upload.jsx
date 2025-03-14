import { Logout } from "./auth";
import { Navigate } from "react-router";
export default function Uploadpage({ isAuthenticated, setAuthenticated }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    await fetch("http://localhost:5000/videos/api/upload/video_upload", {
      credentials: "include",
      method: form.method,
      body: formData,
    });
    e.target.reset();
  }

  return (
    <>
      <div className="flex flex-col items-center">
        {isAuthenticated === false ? (
          <Navigate to="/auth/login" />
        ) : (
          <form className="flex flex-col mt-auto " onSubmit={handleSubmit} method="POST">
            <input name="video_title" type="text" placeholder="enter video title" required></input>
            <textarea name="video_description" placeholder="enter video description"></textarea>
            <input required type="file" name="video_file"></input>
            <input type="submit" value="submit"></input>
          </form>
        )}
        <Logout setAuthenticated={setAuthenticated} />
      </div>
    </>
  );
}
