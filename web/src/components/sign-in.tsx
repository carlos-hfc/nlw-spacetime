import { User } from "lucide-react"

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-gray-400">
        <User className="size-5 text-gray-500" />
      </div>

      <p className="max-w-36 text-sm leading-snug">
        <span className="underline">Crie sua conta</span> e salve suas memórias!
      </p>
    </a>
  )
}
