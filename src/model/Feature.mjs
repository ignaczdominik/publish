export class Feature{
    #id
    #name
    constructor({id,name}){
        this.#id = id
        this.#name = name
    }

    get name(){
        return this.#name
    }

    get id(){
        return this.#id
    }
}