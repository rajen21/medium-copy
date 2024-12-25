import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

function Blogs() {
  const { blogs, loading } = useBlogs();
  if (loading) {
    return <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    </div>
  }
  return (
    <div>
      <Appbar />
    <div className="flex justify-center ">
      <div className="">
        {blogs.map(blog => (
          <BlogCard
            id={blog.id}
            authorName={blog.author.name}
            content={blog.content}
            publishedDate="2nd Dec 2020"
            title={blog.title}
          />
        ))}
      </div>

    </div>
    </div>

  )
}


export default Blogs