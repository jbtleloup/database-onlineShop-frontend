import {getPurchase, purchase} from "../../library/apihandler";

export default async (req, res) => {
    if (req.method === "POST") {
        const {final_price, payment_method, token} = req.body;
        const user = await purchase(final_price, payment_method, token);
        res.status(200).json(user);
    } else {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const purchases = await getPurchase(token);
            res.status(200).json(purchases);
        }
    }
}
