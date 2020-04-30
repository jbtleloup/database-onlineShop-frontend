import {fetchPost} from "../../library/fetch";

export default async (req, res) => {
    const {email, first_name, last_name, password} = req.body;
    const user = await fetchPost('http://3.87.30.125:8000/user/', req.body);
    res.status(200).json(user);
}
