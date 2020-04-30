import {purchasedItem, getPurchasedItem} from "../../library/apihandler";

export default async (req, res) => {
    if (req.method === "POST") {
        const {item_id, invoice_id, token} = req.body;
        const user = await purchasedItem(item_id, invoice_id, token);
        res.status(200).json(user);
    } else {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const items = await getPurchasedItem(token);
            res.status(200).json(items);
        }
    }
}
