import TicketDTO from "../dao/dtos/ticket.dto.js";
import TicketDAO from "../dao/tickets.mongo.js";

const ticketsModel = new TicketDAO();

class TicketManager {
    constructor() {}

    async createTicket({ amount, purchaser }) {
        try {
            if (amount && purchaser) {
                let newTicket = new TicketDTO({ amount, purchaser })
                let result = await ticketsModel.create(newTicket)
                return { status: "success", payload: result }
            } else {
                return { status: "error", error: "El ticket que se quiere crear no cuenta con todos los campos necesarios." }
            }
        } catch (error) {
            return { status: "error", error: error }
        }
    }
}

export default TicketManager