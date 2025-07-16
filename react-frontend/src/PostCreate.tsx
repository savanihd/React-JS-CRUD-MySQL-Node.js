import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PostCreate() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/posts", {title: title, body: body})
            .then(() => navigate('/'));
    }

  return (
    <>
    <Link
    to="/" 
    className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        Back
    </Link>

      <form onSubmit={submit} className="space-y-6 mt-4 max-w-md mx-auto">

        <h1>Create Post</h1>

        

          <div className="grid gap-2">
              <label for="name" className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                  Title:
              </label>
              <input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter title"
                  required
              />
          </div>

          <div className="grid gap-2">
              <label for="name" className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                  Body:
              </label>
              <textarea
                  id="body"
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter body"
                  required
              >
              </textarea>
          </div>
      
          <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
              Submit
          </button>
      
      </form>
    </>
  );
}