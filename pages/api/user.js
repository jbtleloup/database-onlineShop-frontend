import {getUserFromEmail, getUsers} from "../../library/apihandler";

export default async (req, res) => {
    if (req.method === 'POST') {
        const {username} = req.body;
        const user = await getUserFromEmail(username);
        res.status(200).json(user);
    } else {
        const users = await getUsers();
        res.status(200).json(users);
    }
}
