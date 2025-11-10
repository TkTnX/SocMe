import { Button } from "@/shared/components"
import Image from "next/image"

export const GoogleOAuthButton = () => {
  return (
      <Button variant={"outline"} asChild>
          <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
              <Image alt="google" src={'/images/icons/google.svg'} width={30} height={30}  />
              Войти через Google</a>
    </Button>
  )
}
