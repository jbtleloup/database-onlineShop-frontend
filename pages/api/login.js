import {login} from "../../library/apihandler";

export default async (req, res) => {
    const {username, password} = req.body;
    const user = await login(username, password);
    res.status(200).json(user);
}
