import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { Metadata } from '@stripe/stripe-js'
import { connectToDB } from "@/lib/db"
import { Booking, BookingModel } from "@/schemas/booking"
import { ParkingLocation, ParkingLocationModel } from "@/schemas/parking-locations"
import { formatDate } from "date-fns"
import { BookingStatus } from "@/types"
import React from "react"
import { CheckCircle2 } from "lucide-react"
import { sendConfirmationEmail } from "@/actions/actions"
import { currentUser } from "@clerk/nextjs/server"

async function BookingCheckoutResultPage({
    searchParams
}: { searchParams: { session_id: string } }) {

    const session_id = searchParams.session_id
    // get the user
    const user = await currentUser()

    if (!session_id) {
        throw new Error("Invalid session id")
    }

    if (!user) {
        throw new Error("You must be logged in")
    }
    
    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent']
        })

    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent
    const paymentStatus = paymentIntent.status === 'succeeded' ? 'Payment Successful' : 'Payment failed'

    let address = ''
    let date = ''
    let arrivingon = ''
    let leavingon = ''
    let plate = ''

    if (paymentIntent.status === 'succeeded') {
        const metadata = checkoutSession.metadata as Metadata
        const bookingid = metadata['bookingid']

        await connectToDB()

        const booking = await BookingModel.findById<Booking>(bookingid).populate({
            path: 'locationid', model: ParkingLocationModel
        })

        if (booking) {
            address = ((booking?.locationid as any) as ParkingLocation).address
            date = formatDate(booking?.bookingdate!, 'MMM dd, yyyy')
            arrivingon = formatDate(booking?.starttime!, 'hh:mm a')
            leavingon = formatDate(booking?.endtime!, 'hh:mm a')
            plate = booking.plate

            if (booking.status === BookingStatus.PENDING) {
                booking.status = BookingStatus.BOOKED
                booking.stripesessionid = session_id

                await booking.save()

                await sendConfirmationEmail(bookingid)
            }
        }
    }

    return (
        <>
            {
                paymentIntent.status === 'succeeded' ?
                    <main className="sm:container flex flex-col items-center pt-16">
                        <CheckCircle2 size={64} className="text-green-500" />
                        <p className="font-medium text-primary text-2xl sm:text-4xl py-8">Thank you!</p>
                        <h1 className='mt-2 text-3xl text-center font-bold tracking-tight sm:text-5xl'>
                            Your booking has been confirmed.
                        </h1>
                        <p className='mt-2 sm:text-base text-zinc-700 py-4 text-xl'>
                            Here is your booking details:
                        </p>

                        <div className="flex flex-col p-1 sm:p-0">
                            <div className="grid grid-cols-2 place-items center sm:place-items-start">
                                <p className="text-zinc-700">
                                    Parking at:
                                </p>
                                <p className="text-zinc-700 place-self-start">
                                    {address}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 place-items center sm:place-items-start">
                                <p className="text-zinc-700">
                                    Arriving on:
                                </p>
                                <p className="text-zinc-700 place-self-start">
                                    {date} {arrivingon}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 place-items center sm:place-items-start">
                                <p className="text-zinc-700">
                                    Leaving on:
                                </p>
                                <p className="text-zinc-700 place-self-start">
                                    {date} {leavingon}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 place-items-center sm:place-items-start">
                                <p className=' text-zinc-700'>
                                    Plate no:
                                </p>
                                <p className='text-zinc-700 place-self-start'>
                                    {plate.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2 sm:text-base text-zinc-500 py-16 text-xl">
                            We have also sent you an email with the details.
                        </p>
                    </main>
                    :
                    paymentStatus
            }
        </>
    )

}

export default BookingCheckoutResultPage