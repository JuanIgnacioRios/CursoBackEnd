import mongoose from "mongoose";
import orderModel from "./src/models/order.model.js";
import userModel from "./src/models/user.model.js";

const environment = async () => {
    await mongoose.connect("mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/PaginatorStudents?retryWrites=true&w=majority")

/*     let result = await orderModel.insertMany([
        {
            name: "Pepperoni", size: "small", price: 19,
            quantity: 10, date: "2021-03-13T08:14:30Z"
        },
        {
            name: "Pepperoni", size: "medium", price: 20,
            quantity: 20, date: "2021-03-13T09:13:24Z"
        },
        {
            name: "Pepperoni", size: "large", price: 21,
            quantity: 30, date: "2021-03-17T09:22:12Z"
        },
        {
            name: "Cheese", size: "small", price: 12,
            quantity: 15, date: "2021-03-13T11:21:39.736Z"
        },
        {
            name: "Cheese", size: "medium", price: 13,
            quantity: 50, date: "2022-01-12T21:23:13.331Z"
        },
        {
            name: "Cheese", size: "large", price: 14,
            quantity: 10, date: "2022-01-12T05:08:13Z"
        },
        {
            name: "Vegan", size: "small", price: 17,
            quantity: 10, date: "2021-01-13T05:08:13Z"
        },
        {
            name: "Vegan", size: "medium", price: 18,
            quantity: 10, date: "2021-01-13T05:10:13Z"
        }

    ]) */


    /* let orders = await orderModel.aggregate([
        {$match: {size: "medium"}},
        {$group: {_id: "$name", totalCuantity: {$sum: "$quantity"}}},
        {$sort: {totalCuantity: -1}},
        {$group: {_id:1, orders: {$push: "$$ROOT"}}},
        {$project: {"_id":0, orders: "$orders"}},
        {$merge: {into: "reports"}}
    ]) */

    /* await userModel.insertMany([{"first_name":"Justino","last_name":"Fidgin","email":"jfidgin0@boston.com","gender":"Male","grade":6,"group":"1B"},
    {"first_name":"Ketty","last_name":"Robson","email":"krobson1@prlog.org","gender":"Female","grade":10,"group":"2A"},
    {"first_name":"Dierdre","last_name":"Barron","email":"dbarron2@dailymail.co.uk","gender":"Female","grade":9,"group":"1B"},
    {"first_name":"Nana","last_name":"Pellew","email":"npellew3@nytimes.com","gender":"Female","grade":6,"group":"1A"},
    {"first_name":"Shannan","last_name":"Preshous","email":"spreshous4@paginegialle.it","gender":"Male","grade":8,"group":"2B"},
    {"first_name":"Mark","last_name":"Yurchishin","email":"iyurchishin5@google.it","gender":"Male","grade":10,"group":"2B"},
    {"first_name":"Tannie","last_name":"Takkos","email":"ttakkos6@mtv.com","gender":"Female","grade":7,"group":"2B"},
    {"first_name":"Debbi","last_name":"Eddowis","email":"deddowis7@jigsy.com","gender":"Female","grade":6,"group":"1B"},
    {"first_name":"Dugald","last_name":"Toun","email":"dtoun8@java.com","gender":"Male","grade":4,"group":"1A"},
    {"first_name":"Lorain","last_name":"Judkin","email":"ljudkin9@bigcartel.com","gender":"Genderqueer","grade":8,"group":"2B"},
    {"first_name":"Shelley","last_name":"Crinion","email":"scriniona@wsj.com","gender":"Genderfluid","grade":8,"group":"2A"},
    {"first_name":"Kellyann","last_name":"Doel","email":"kdoelb@merriam-webster.com","gender":"Female","grade":8,"group":"1B"},
    {"first_name":"Romona","last_name":"Derricoat","email":"rderricoatc@vkontakte.ru","gender":"Female","grade":5,"group":"1A"},
    {"first_name":"Lorine","last_name":"McVaugh","email":"lmcvaughd@unc.edu","gender":"Female","grade":4,"group":"2A"},
    {"first_name":"Ker","last_name":"Chiese","email":"kchiesee@prlog.org","gender":"Male","grade":8,"group":"1A"},
    {"first_name":"Aloisia","last_name":"Hovie","email":"ahovief@simplemachines.org","gender":"Female","grade":8,"group":"2B"},
    {"first_name":"Marshall","last_name":"Chatten","email":"mchatteng@creativecommons.org","gender":"Male","grade":9,"group":"2B"},
    {"first_name":"Marcelo","last_name":"Rubega","email":"mrubegah@house.gov","gender":"Male","grade":6,"group":"1A"},
    {"first_name":"Yves","last_name":"Halsey","email":"yhalseyi@naver.com","gender":"Male","grade":5,"group":"2A"},
    {"first_name":"Corene","last_name":"Greed","email":"cgreedj@epa.gov","gender":"Female","grade":8,"group":"1A"}]) */

    let users = await userModel.paginate({gender: "Female"}, {limit: 5, page: 2})
    console.log(users)
}

environment()