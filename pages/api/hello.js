// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import browser from "../../services/browser";
export default async function handler(req, res) {
  let data = await (await browser()).getBlackListAccount();
  res.status(200).json(data)
}
