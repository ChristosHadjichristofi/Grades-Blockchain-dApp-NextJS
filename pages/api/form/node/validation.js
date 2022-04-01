export default function handler(req, res) {
    const { wallet, school, isMaster } = req.body;

    let fieldsMissing = [];

    if (!wallet) fieldsMissing.push("Wallet");
    if (!school) fieldsMissing.push("School");

    if (fieldsMissing.length == 0) return res.status(200).json({ error: false });
    else return res.status(400).json({
        error: true,
        msg: "Mandatory Fields (" +
            fieldsMissing.reduce(
                (text, value, i, array) =>
                    text + (i < array.length - 1 ? ', ' : ' and ') + value) + ") are missing!"
    })
}