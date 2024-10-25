'use server'

import { connectToDB } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { formatAmountForStripe } from '@/lib/utils'
import { BookingModel } from '@/schemas/booking'
import { currentUser } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'


export async function createCheckoutSession(data: FormData): Promise<void> {

    const now = new Date()

    // check if user is logged in
    const user = await currentUser()

    if (!user) {
        throw new Error("You must be logged in")
    }

    await connectToDB()
    const bookingdate = data.get('bookingdate')
    const startime = data.get('starttime')
    const endtime = data.get('endtime')

    const result = await BookingModel.create({
        locationid: data.get('locationid'),
        bookingdate: new Date(`${bookingdate}T${startime}`),
        starttime: new Date(`${bookingdate}T${startime}`),
        endtime: new Date(`${bookingdate}T${endtime}`),
        amount: Number(data.get('amount')),
        timeoffset: now.getTimezoneOffset(),
        plate: (data.get('plate') as string).replaceAll(' ', ''),
        userid: user?.id
    })

    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'book',
        metadata: {
            bookingid: result.id
        },
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: `Parking at ${data.get('address') as string}`
                    },
                    unit_amount: formatAmountForStripe(Number(data.get('amount')), 'CAD')
                }
            }
        ],

        success_url: `${headers().get('origin')}/book/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headers().get('origin')}`
    })

    redirect(checkoutSession.url!)
}