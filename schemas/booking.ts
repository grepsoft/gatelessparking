import { BookingStatus } from "@/types";
import mongoose, {Document, Schema, model, models } from "mongoose";

export interface Booking extends Document {
    locationid: Object,
    userid: string,
    bookingdate: Date,
    starttime: Date,
    endtime: Date,
    timeoffset: number,
    amount: number,
    phone: string,      // user phone. This can be used to cancel or view booking
    plate: string,      // vehicle plate. This can be used to cancel or view booking
    status: string,
    stripesessionid: string
}

const BookingSchema = new Schema<Booking>({
    locationid: { type: mongoose.Types.ObjectId, ref: 'ParkingLocation', default: null},
    userid: String,
    bookingdate: Date,
    starttime: Date,
    endtime: Date,
    plate: String,
    phone: String,
    timeoffset: Number,
    amount: Number,
    status: {
        type: String,
        default: BookingStatus.PENDING
    },
    stripesessionid: String
}, {
    timestamps: true
})

export const BookingModel = models.Booking || model('Booking', BookingSchema)