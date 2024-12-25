import { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Publish() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  async function onClick() {
    const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title,
      content: desc
    }, {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    });
    console.log("checllk i", res);
    
    navigate(`/blog/${res.data.blog.id}`)
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <input onChange={(e) => setTitle(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />
          <TextEditor onChange={(e) => setDesc(e.target.value)} />
          <button onClick={onClick} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900">Publish post</button>
        </div>

      </div>
    </div>
  )
}

export default Publish;

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return <div className="mt-2">
    <div className="w-full mb-4">
      <div className="flex items-center justify-between border">
        <div className="my-2 bg-white rounded-b-lg w-full">
          <label className="sr-only">Publish post</label>
          <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-0 pl-2 text-sm text-gray-800 bg-white border-0 outline-none" placeholder="Write an article..." required />

        </div>

      </div>
    </div>
  </div>
}