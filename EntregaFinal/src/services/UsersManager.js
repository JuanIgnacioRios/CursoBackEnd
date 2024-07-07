import usersModel from '../dao/models/users.model.js'
import { transport } from '../../utils.js';
import { PORT } from '../app.js';

class UsersManager{
    constructor(){}

    async getUsers(){
        try {
            const users = await usersModel.find({});
            console.log(users)
            return { status: "success", payload: users };
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async deleteUnactiveUsers(){
        try {
            const today = Date.now();
            const users = await usersModel.find({});
            let deletedUsers = []
            for (const user of users) {
                console.log(user)
                const lastConnection = new Date(user.last_connection);
                const datesDifference = Math.floor((today - lastConnection) / (1000 * 60));
    
                if (datesDifference > 30 || !user.last_connection) {
                    await usersModel.deleteOne({ _id: user._id });
                    deletedUsers.push(user)
                    await transport.sendMail({
                        from: "juaniganciorios2003@gmail.com",
                        to: user.email,
                        subject: "CoderhouseEcomm | Su usuario se eliminó",
                        html:`
                        <p>Hola! Como estas? <br></br> Su usuario fue eliminado por inactividad,le pedimos por favor que vuelva a registrarse en nuestro sitioweb <br></br></p>
                        <a href=" http://localhost:${PORT}/register">Hacelo haciendo click acá</a>
                        `
                    })  
                }
            }

            if(deletedUsers.length > 0) return {status: "success", message: `Se eliminaron ${deletedUsers.length} por inactividad`}
            return {status: "success", message: "No se eliminó ningun usuario por inactividad"}

        } catch (error) {
            return { status: "error", error: error }
        }
    }
}


export default UsersManager