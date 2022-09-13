// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import browser from "../../services/browser";
export default async function handler(req, res) {
  try {
    let data = await (await browser()).getBlackListAccount();
    res.status(200).json(data)
  } catch (error) {
    res.status(200).json(error)
  }
}
