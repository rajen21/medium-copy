import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import Fullblog from "../components/Fullblog";
import Appbar from "../components/Appbar";
import { Spinner } from "../components/Spinner";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({id: id ?? ""});
  if (loading || !blog) {
    return (
    <div>
      <Appbar />
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    </div>)
  }
  return <h1>
    <Fullblog blog={blog} />
  </h1>
};

export default Blog;