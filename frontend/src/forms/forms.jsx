import { useNavigate } from "react-router";
import { AuthContext } from "../context";
import { useContext } from "react";

export function CommentForm({
  videouuid,
  root_pk = "",
  parent_pk = "",
  setRefreshComments = "",
  setRefreshReplies = "",
  submit_text,
}) {
  const [isAuthenticated, setAuthenticated] = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleSumbit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (root_pk) {
      formData.append("root_pk", root_pk);
      formData.append("replying_to_pk", parent_pk);
    } else if (parent_pk) {
      formData.append("parent_pk", parent_pk);
    }

    const response = await fetch(`http://localhost:5000/videos/api/add_comment/${videouuid}`, {
      method: form.method,
      body: formData,
      credentials: "include",
    });

    //triggers a rerender to display new comments
    setRefreshComments && setRefreshComments(true);
    setRefreshReplies && setRefreshReplies(true);

    e.target.reset();
  }
  function handleClick() {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
    return;
  }

  return (
    <form
      className="flex flex-col mt-5 "
      method="POST"
      onSubmit={handleSumbit}
      onClick={handleClick}
    >
      <input
        placeholder="Type in your comment"
        className="border-b border-gray-300 mb-2"
        type="text"
        name="body"
      ></input>
      <div className="flex justify-end">
        <input className="rounded-xl" type="submit" value={submit_text}></input>
        <button className="ml-4 rounded-2xl p-2 hover:bg-gray-200">Cancel</button>
      </div>
    </form>
  );
}
