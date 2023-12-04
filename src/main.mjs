import "bootstrap/dist/css/bootstrap.min.css"
import "@assets/css/style.css"
import "bootstrap/dist/js/bootstrap"

import { Hotel } from '@models/Hotel.mjs'
import { Offer } from '@models/Offer.mjs'
import { Feature } from '@models/Feature.mjs'

import { priceFormatter } from "@utils/formatter.mjs"

import {http} from '@utils/http.mjs'

let Features
let Hotels
let Offers

let filtered



const featureFetch = http.get("features")
    .then(response => response.data)

const hotelFetch = http.get("hotels")
    .then(response => response.data)
   
const offerFetch = http.get("offers")
    .then(response => response.data)


Promise.all([featureFetch, hotelFetch, offerFetch])
    .then(([featuresData, hotelsData, offersData]) => {
        Features = featuresData.map(f => new Feature(f))

        Hotels = hotelsData.map(h => {
            h.features = h.features.map(
                hotelFeature => Features.find(
                    feature => feature.id === hotelFeature)
            )
            h.img = "./src/" + h.img.split('./')[1]
            return new Hotel(h)
        })

        Offers = offersData.map(o => {
            o.hotel = Hotels.find(h => h.id === o.hotel_id)
            return new Offer(o)
        })

        filtered = Offers
        loadOffers()
    })


function loadOffers() {
    const row = document.querySelector("#offers");
    while (row.firstChild) {
        row.firstChild.remove();
    }

    const template = document.querySelector("template");
    const templateContent = template.content.querySelector(".col-12");

    for (const offer of filtered) {
        const card = document.importNode(templateContent, true);
        card.querySelector("img").src = offer.hotelImage
        card.querySelector(".card-title").textContent = offer.hotelName
        card.querySelector(".card-text").textContent = offer.summary
        card.querySelector(".card-text>small").textContent = offer.hotelFeatures
        card.querySelector(".card-footer").textContent = `Ára: ${priceFormatter.format(offer.cost)}/fő/éj`
        row.append(card);
    }
}

function filter() {
    const minValue = document.querySelector("#min-price").value
    const maxValue = document.querySelector("#max-price").value

    filtered = Offers.filter(o => {
        if (minValue != "" && maxValue == "") {
            return o.cost >= minValue
        }
        if (minValue == "" && maxValue != "") {
            return o.cost <= maxValue
        }
        if (minValue != "" && maxValue != "") {
            return (o.cost >= minValue) && (o.cost <= maxValue)
        }
        return true
    })
    loadOffers()
}

function clearFilter() {
    document.querySelector("#min-price").value = ""
    document.querySelector("#max-price").value = ""
    filtered = Offers
    loadOffers()
}

document.querySelector("#run-filter").addEventListener("click", filter)
document.querySelector("#clear-filter").addEventListener("click", clearFilter)
