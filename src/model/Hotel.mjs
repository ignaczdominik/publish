export class Hotel {
    #id
    #name
    #address
    #type
    #phone
    #email
    #features
    #img
    constructor({
        id,
        name,
        address,
        type,
        phone,
        email,
        features,
        img
    }) {
        this.#id = id
        this.#name = name
        this.#address = address
        this.#type = type
        this.#phone = phone
        this.#email = email
        this.#features = features
        this.#img = img
    }

    get id(){
        return this.#id
    }
    get name(){
        return this.#name
    }
    get address(){
        return Object.values(this.#address).join(" ")
    }

    get allFeatures(){
        return this.#features.map(feature => feature.name).join(", ");
    }

    get phone(){
        return this.#phone
    }

    get email(){
        return this.#email
    }

    get image(){
        return this.#img
    }
}