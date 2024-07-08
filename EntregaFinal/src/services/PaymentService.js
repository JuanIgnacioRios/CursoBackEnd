import Stripe from "stripe";

class PaymentService{
    constructor(){
        this.stripe = new Stripe('sk_test_51Pa1HP2K7xf8yKP79My7cUri49hqnqGhOc44SKDEpiBdFPPuLs49He7cUaMlDjzgvXb76uUqk4yqvH7dVDrSLmr6009GqUubE4')
    }

    async createPaymentIntent(data){
        const paymentIntent = this.stripe.paymentIntents.create(data)
        return paymentIntent
    }

}

export default PaymentService