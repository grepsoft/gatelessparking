'use client'

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
    const params = useSearchParams()
    const redirectUrl = decodeURIComponent(params.get('redirect_url')!)
//forceRedirectUrl={redirectUrl}
    return (
        <div className="flex flex-col items-center pt-12">
            <SignIn />
        </div>

    )
}