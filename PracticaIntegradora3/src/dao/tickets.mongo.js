import ticketsModel from "./models/ticket.model.js";

class TicketDAO {
    constructor() {}

    create = async(ticket) => {
        try {
            let result = await ticketsModel.create(ticket)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default TicketDAO