import { Post } from "@/entities"

export const PostsList = () => {
  return (
      <div className='mt-6 flex flex-col gap-6'>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
    </div>
  )
}
