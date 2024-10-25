import { Booking } from "@/schemas/booking"
import { Library } from "@googlemaps/js-api-loader"
import { type ClassValue, clsx } from "clsx"
import { compareAsc, differenceInMinutes, getHours, getMinutes } from "date-fns"
import { twMerge } from "tailwind-merge"

export const libs: Library[] = ['core', 'maps', 'places', 'marker']

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatAmountForDisplay(
  amount: number, currency: string
): string {

  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style:'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })

  const formatedAmount = numberFormat.format(amount)
  return formatedAmount === 'NaN' ? '' : formatedAmount
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {

  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style:'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })

  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true

  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}


export function getStreetFromAddress(address: string) {
  return address.split(',')[0]
}

/// google maps
export const buildMapInfoCardContent = (title: string, address: string, totalSpots: number, price: number)
: string => {

  return `
    <div class="map_infocard_content">
      <div class="map_infocard_title">${title}</div>
      <div class="map_infocard_body">
      <div>${address}</div>
      <hr />
      <div>Total spots: ${totalSpots}</div>
      <div>Hourly price: ${formatAmountForDisplay(price, 'CAD')}</div>
      </div>
      
  </div>
  `
}

export const buildMapInfoCardContentForDestination = (title: string, address: string): string => {
  return `
  <div class="map_infocard_content">
      <div class="map_infocard_title">${title}</div>
      <div class="map_infocard_body">
      <div>${address}</div>
      </div>
      
  </div>`;
}

export const parkingPin = (type: string) => {
  const glyphImg = document.createElement('div')
  glyphImg.innerHTML = `
    <div class="map_pin_container">
      <img src='http://localhost:3000/${type}.png' />
    </div>
  `

  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg
  })

  return pinElement
}

export const parkingPinWithIndex = (type: string, index: number) => {
  const glyphImg = document.createElement('div')
  glyphImg.innerHTML = `
    <div class="map_pin_container">
      <div class="map_pin_id"><span>${index}</span></div>
      <img src='http://localhost:3000/${type}.png' />
    </div>
  `

  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg
  })

  return pinElement
}

export const destinationPin = (type: string) => {
  const glyphImg = document.createElement('img');
  glyphImg.src = `http://localhost:3000/${type}.png`;
  const pinElement = new google.maps.marker.PinElement({
      glyph: glyphImg
  })

  return pinElement
}

export type ReturnType = {
  time: string,
  display: string
}
export function getTimeSlots(startTime = "00:00", endTime="23:45"): ReturnType[] {
  const timeArray : ReturnType[] = []
  const parsedStartTime: Date = new Date(`2000-01-01T${startTime}:00`)
  const parsedEndTime: Date = new Date(`2000-01-01T${endTime}:00`)

  let currentTime: Date = parsedStartTime
  while (currentTime <= parsedEndTime) {
    const hours = currentTime.getHours().toString().padStart(2, "0")
    const minutes = currentTime.getMinutes().toString().padStart(2, "0")
    const ampm = currentTime.getHours() < 12 ? "AM" : "PM"
    const timeString = `${hours}:${minutes} ${ampm}`
    timeArray.push({
      time: `${hours}:${minutes}`,
      display: timeString
    })

    currentTime.setMinutes(currentTime.getMinutes() + 30)
  }

  return timeArray
}

export function sortcomparer(b1: Booking, b2: Booking) {
  return compareAsc(b1.starttime, b2.starttime)
}

export function blockLength(starttime: Date, endtime: Date) {
  return differenceInMinutes(endtime, starttime)
}

export function blockPostion(starttime: Date) {
  const h = getHours(starttime)
  const m = getMinutes(starttime)
  return (h * 60) + m
}