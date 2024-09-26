'use server'

import { connectToDB } from "@/lib/db"
import { ParkingLocation, ParkingLocationModel } from "@/schemas/parking-locations"
import { ParkingLocationStatus, UpdateLocationParams } from "@/types"
import { revalidatePath } from "next/cache"


export async function toggleLocation({ id, path }: {
    id: string, path: string
}) {

    await connectToDB()

    const location = await ParkingLocationModel.findById<ParkingLocation>(id)

    if (location) {
        location.status = location.status === ParkingLocationStatus.AVAILABLE
            ? ParkingLocationStatus.NOTAVAILABLE : ParkingLocationStatus.AVAILABLE

        const result = await location.save()

        if (result) {
            revalidatePath(path)
        }
    }
}

export async function deleteLocation({ id, path }: {
    id: string, path: string
}) {

    await connectToDB()

    const deleteResult = await ParkingLocationModel.findByIdAndDelete(id)

    if (deleteResult) {
        revalidatePath(path)
    }
}


export async function updateLocation({ id, path, location }: {
    id: string, path: string, location: UpdateLocationParams
}) {

    try {
        await connectToDB()
        
        const result = await ParkingLocationModel.updateOne({
            _id: id
        }, {
            $set: location
        })
        
        revalidatePath(path)
    } catch(error) {
        console.log(error)
        throw error
    }

}
