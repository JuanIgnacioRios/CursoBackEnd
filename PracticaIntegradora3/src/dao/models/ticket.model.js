import moongose from 'mongoose'
import moongosePaginate from 'mongoose-paginate-v2'

const ticketsCollection = "tickets"

const ticketsSchema = new moongose.Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true
    }
})

ticketsSchema.plugin(moongosePaginate)
const ticketsModel = moongose.model(ticketsCollection, ticketsSchema)

export default ticketsModel