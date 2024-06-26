import Image from "next/image"

import { getUser } from "@/lib/auth"

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-full"
      />

      <p className="max-w-36 text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}
