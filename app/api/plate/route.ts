import { sendViolationEmail } from "@/actions/actions"
import { BookingModel } from "@/schemas/booking"
import { BookingStatus } from "@/types"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {

        const body = await req.json()
        const authHeader = req.headers.get('authorization')

        if (!authHeader) {
            return NextResponse.json({message: "Not allowed"}, {status: 401})
        }

        const token = authHeader.split(' ')[1]
        if (token !== process.env.APP_KEY) {
            return NextResponse.json({message: "Wrong credentials"}, {status: 404})
        }

        const { plate, address, timestamp } = body

        const booking = await BookingModel.findOne({
            plate: plate.toLowerCase(),
            status: BookingStatus.BOOKED
        })

        if (!booking) {
            console.log("Violation: ", plate)
            await sendViolationEmail(plate, address, timestamp)
        } else {
            console.log("OK ", plate)
        }

        return NextResponse.json({
            message: "ok"
        })

    } catch(error) {
        console.log("Error: ", error)
        throw error
    }
}