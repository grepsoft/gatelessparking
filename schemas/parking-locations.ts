
import { LatLng, ParkingLocationStatus, Price } from '@/types'
import { Document, Schema, model, models } from 'mongoose'

export interface ParkingLocation extends Document {
    address: string,
    gpscoords: LatLng,
    numberofspots: number,
    price: Price,
    status: string,
    bookedspots?: number,
    location: {
        type: string,
        coordinates: [number]
    }
}

const ParkingLocationSchema = new Schema<ParkingLocation>({
    address: String,
    location: {
        type: { type: String, default: "Point"},
        coordinates: [Number]
    },
    gpscoords: {
        lat: Number,
        lng: Number
    },
    numberofspots: Number,
    price: {
        hourly: Number,
    },
    status: {
        type: String,
        default: ParkingLocationStatus.AVAILABLE
    }
}, {
    timestamps: true
})

export const ParkingLocationModel = models.ParkingLocation || model('ParkingLocation', ParkingLocationSchema)