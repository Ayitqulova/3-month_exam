export class InternalServerError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
        this.name = "InternalServerError"
    }
}

export class BadRequestError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
        this.name = "BadRequestError"
    }
}

export class NotFoundError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
        this.name = "NotFoundError"
    }
}

export class ConfligError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
        this.name = "ConfligError"
    }
}

export class ForBiddenError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
        this.name = "ForBiddenError"
    }
}