import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PostShow() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { id } = useParams();

  useEffect(() => {
      if(id){
        axios.get("http://localhost:8000/api/posts/"+ id)
          .then(res => {
              setTitle(res.data.title);
              setBody(res.data.body);
          });
      }
  }, [id]);

  return (
    <>
      <form className="space-y-6 mt-4 max-w-md mx-auto">

          <h1 className="font-bold text-2xl">Show Post</h1>

          <Link
            to="/" 
            className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Back
          </Link>

          <div>
            <p><strong>Title:</strong>{title}</p>
            <p><strong>Body:</strong>{body}</p>
          </div>
      
      </form>
    </>
  );
}