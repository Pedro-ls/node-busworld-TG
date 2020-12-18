import { Router } from "express";
import con from '../database/connection';
import { login } from "./middlewares/user.route";

const routeUser = Router();

routeUser.post('/users/register', async (req, res) => {

    const { name, email, password, location, date } = req.body;

    try {

        const retorno = await con('users')
            .insert({
                "name": name,
                "email": email,
                "password": password,
                "location": location,
                "date_birth": date
            });

        if (retorno) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }

    } catch {

        return res.json({ success: false });

    }
});

routeUser.get('/users', async (req, res) => {
    const users = await con('users').select('*');

    return res.json(users);

});

routeUser.get('/users/:id',async (req, res) => {

    const { id } = req.params;

    const user = await con('users').where('id', id).select('*');

    if (user.length) {
        return res.json(user);
    } else {
        return res.json({ success: false });
    }

});

routeUser.put('/users/modify/:id',async (req, res) => {
    const { id } = req.params;
    const { name, email, password, location, date } = req.body;

    const resul = await con('users')
        .where('id', id)
        .update({
            "name": name,
            "email": email,
            "password": password,
            "location": location,
            "date_birth": date
        });

    res.json(resul);

});

routeUser.delete('/users/destroy/:id', async (req, res) => {

    const { id } = req.params;
    const resul = await con('users').where("id", id).delete();
    return res.json(resul);

});


export default routeUser;