import { v4 as uuidv4 } from 'uuid';

class TicketDTO{
    constructor({amount, purchaser}){
        this.code = uuidv4(),
        this.purchase_datetime = new Date(),
        this.amount = amount,
        this.purchaser = purchaser
    }
}

export default TicketDTO