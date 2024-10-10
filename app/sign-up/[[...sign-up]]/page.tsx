'use client'

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {

    return (
        <div className="flex flex-col items-center pt-12">
            <SignUp />
        </div>

    )
}