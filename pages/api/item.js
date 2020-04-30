import fetch from "../../library/fetch";

export default async (req, res) => {
        const {id} = req.body;
        const user = await fetch(id);
        res.status(200).json(user);
}
