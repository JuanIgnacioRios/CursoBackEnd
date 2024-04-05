import Router from './router.js'

const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Alice" }
];

export default class UsersRouter extends Router {
    init() {
        this.get("/users", this.getUsers);
        this.get("/users/:id", this.getUser)
    }

    async getUsers(req, res) {
        res.send(users)
    }

    async getUser(req, res) {
        res.send("getUser")
    }
}