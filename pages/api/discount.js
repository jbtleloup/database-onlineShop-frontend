import fetch from "node-fetch";

export default async (req, res) => {
    const {discountUrl} = req.query;
    const raw = await fetch(discountUrl);
    const discount = await raw.json();
    res.status(200).json(discount);
}
