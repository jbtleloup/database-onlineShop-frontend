import {getItems} from "../../library/apihandler";

export default async (req, res) => {
        const user = await getItems();
        res.status(200).json(user);
}
