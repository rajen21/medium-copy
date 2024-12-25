import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

function BlogCard({ id, authorName, content, publishedDate, title }: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <Avatar name={authorName} />
        <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
          {publishedDate}

        </div>

      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500 text-sm pt-4">{`${Math.ceil(content.length / 100)} minutes`}</div>
    </div>
    </Link>
  )
}

export default BlogCard;

export function Avatar({ name, size="small"} : { name: string, size?: "small"|"big" }) {
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`font-extralight text-gray-600 dark:text-gray-300 ${size === "small" ? "text-xs" : "text-md"}`}>{name[0]}</span>
  </div>
}

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500" />
}