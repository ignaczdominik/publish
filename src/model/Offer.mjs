import { isBefore, isAfter } from "date-fns"

export class Offer {
    #hotel
    #id
    #cost
    #summary
    #available

    constructor({
        hotel,
        id,
        cost,
        summary,
        available
    }) {
        this.#hotel = hotel
        this.#id = id
        this.#cost = cost
        this.#summary = summary
        this.#available = available
    }
    
    get hotelFeatures(){
        return this.#hotel.allFeatures
    }

    get hotelName(){
        return this.#hotel.name
    }

    get hotelImage(){
        return this.#hotel.image
    }

    get cost(){
        return this.#cost
    }

    get summary(){
        return this.#summary
    }

    get available(){
        const before = new Date(this.#available.before)
        const after = new Date(this.#available.after)
        const now = new Date();

        return isBefore(now,before) && isAfter(now,after)
    }
}