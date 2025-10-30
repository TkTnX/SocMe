'use client';

import { usePosts } from "@/api/hooks";
import { Post } from "@/entities";
import { Skeleton } from "@/shared/components";





interface Props {
    postId: string
}

export const BigPost = ({ postId }: Props) => {
    const { getPostByIdQuery } = usePosts()
    const { data, isPending, error } = getPostByIdQuery(postId)
    
    if(isPending) return <Skeleton className="w-full h-[400px]" />

  return (
  <Post className="w-full" post={data} />
  )
}