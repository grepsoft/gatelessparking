import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LocationToggleSwitch from "./location-enable-switch"
import { formatAmountForDisplay } from "@/lib/utils"
import LocationDeleteButton from "./location-delete-button"
import Link from "next/link"
import { PencilIcon } from "lucide-react"

type Props = {
    id: string,
    name: string,
    address: string,
    numberOfSpots: number,
    spotsBooked: number,
    spotsAvailable: number,
    status: string,
    price: {
        hourly: number
    }
}

const LocationCard: React.FC<Props> = ({
    id, name, address, numberOfSpots, spotsBooked, spotsAvailable, status, price
}) => {

    return (
        <Card className="w-full lg:w-[350px]">
            <CardHeader>
                <CardTitle>
                    <LocationToggleSwitch props={
                        JSON.stringify({
                            id: id,
                            name: name,
                            status: status
                        })
                    } />
                </CardTitle>
                <CardDescription className="text-md">{address}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 grid grid-cols-1 items-start pb-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium leading-none">Hourly price: {formatAmountForDisplay(price.hourly, 'CAD')}</p>
                        <p className="text-sm font-medium leading-none">Number of spots: {numberOfSpots}</p>
                        <hr />
                        <p className="text-sm font-medium leading-none">Spots booked: {spotsBooked}</p>
                        <p className="text-sm font-medium leading-none">Spots Available: {spotsAvailable}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                    <LocationDeleteButton props={
                        JSON.stringify({ id: id})
                    } />
                    <Link href={`./edit/${id}`} >
                        <PencilIcon color="blue" />
                    </Link>
            </CardFooter>
        </Card>
    )
}

export default LocationCard