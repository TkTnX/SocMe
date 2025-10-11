import { cn } from "@/lib/utils"

interface Props {
    children: React.ReactNode
    className?:string
}

export const Block = ({ children, className }: Props) => {
  return (
    <div className={cn('bg-white px-5 py-6 rounded-2xl overflow-hidden', className)}>{children}</div>
  )
}
