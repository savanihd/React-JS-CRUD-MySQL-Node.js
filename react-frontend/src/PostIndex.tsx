import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "./components/Paginate";

export default function PostIndex() {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("id");
    const [order, setOrder] = useState("desc");
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts?page=${page}&limit=5&sortBy=${sortBy}&order=${order}&search=${search}`).then((res) => {
            setPosts(res.data.data);
            setTotalPages(res.data.totalPages);
        });
    }, [page, sortBy, order, search])

    const deletePost = (id: number) => {
        if(confirm("Are you sure?")){
            axios.delete("http://localhost:8000/api/posts/" + id).then(() => {
                setPosts(posts.filter( p => p.id !== id));
            });
        }
    }

    const handleSort = (field) => {
        if(sortBy === field){
            setOrder(order === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setOrder("desc");
        }
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

  return (
    <>
      <div className="p-3">
          <h1 className="text-2xl font-bold mb-4">CRUD App</h1>
          <Link
            to="/create" 
            className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Create
          </Link>
          <div className="overflow-x-auto mt-4">
            <div className="mb-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search by title or body"
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
              <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                  <tr>
                      <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                        ID {sortBy === "id" && (order === "asc" ? "↑" : "↓")}
                      </th>
                      <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("title")}>
                        Title {sortBy === "title" && (order === "asc" ? "↑" : "↓")}
                      </th>
                      <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("body")}>
                        Body {sortBy === "body" && (order === "asc" ? "↑" : "↓")}
                       </th>
                      <th scope="col" className="px-6 py-3 w-70">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => 
                        <tr key={post.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <td className="px-6 py-2 font-medium text-gray-900">{ post.id }</td>
                            <td className="px-6 py-2 text-gray-700">{ post.title }</td>
                            <td className="px-6 py-2 text-gray-700">{ post.body }</td>
                            <td className="px-6 py-2 space-x-1">
                                <Link 
                                    to={`/edit/${post.id}`}
                                    className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    Edit
                                </Link>
                                <Link
                                    to={`/show/${post.id}`} 
                                    className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                                    Show
                                </Link>
                                <button onClick={() => deletePost(post.id)} className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                  </tbody>
              </table>

                <Paginate 
                    currentPage={page} 
                    totalPages={totalPages} 
                    onPageChange={(p) => setPage(p)} 
                />

          </div>
      </div>
    </>
  );
}