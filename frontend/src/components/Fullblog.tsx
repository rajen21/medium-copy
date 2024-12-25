import { Blog } from "../hooks"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"

function Fullblog({ blog }: { blog?: Blog }) {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">

        <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              {blog?.title}
            </div>
            <div className="text-slate-500 pt-2">
              Post on 2nd December 2023
            </div>
            <div className="pt-4">
              {blog?.content}
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">
              Author

            </div>
            <div className="flex">
              <div className="flex justify-center flex-col pr-2">
                <Avatar name={blog?.author.name ?? ""} size="big" />

              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog?.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptatem excepturi porro non nam.
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Fullblog