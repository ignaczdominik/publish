import "bootstrap/dist/css/bootstrap.min.css"
import "@assets/css/style.css"
import "bootstrap/dist/js/bootstrap"

import { Hotel } from '@models/Hotel.mjs'
import { Offer } from '@models/Offer.mjs'
import { Feature } from '@models/Feature.mjs'

let Features
let Hotels
let Offers

let filtered

const featureFetch = fetch("https://frontend.njit.ut-idb.com/travel/features")
    .then(r => r.json())
const hotelFetch = fetch("https://frontend.njit.ut-idb.com/travel/hotels")
    .then(r => r.json())
const offerFetch = fetch("https://frontend.njit.ut-idb.com/travel/offers")
    .then(r => r.json())

Promise.all([featureFetch, hotelFetch, offerFetch])
    .then(([featuresData, hotelsData, offersData]) => {
        Features = featuresData.map(f => new Feature(f))

        Hotels = hotelsData.map(h => {
            h.features = h.features.map(
                hotelFeature => Features.find(
                    feature => feature.id === hotelFeature)
            )
            return new Hotel(h)
        })

        Offer = offersData.map(o => {
            o.hotel = Hotels.find(h => h.id === o.hotel_id)
            return Offer(o)
        })

        filtered = Offers
        
    })


