import { type NextRequest, NextResponse } from "next/server"

import { api } from "@/lib/api"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  const redirectTo = request.cookies.get("redirectTo")?.value

  const registerResponse = await api.post("/auth/register", { code })

  const { token } = registerResponse.data

  const redirectUrl = redirectTo ?? new URL("/", request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 7

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
