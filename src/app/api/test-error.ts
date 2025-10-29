import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;

  if (type === "401") {
    return res.status(401).json({ message: "Unauthorized: This is a 401 error." });
  }

  if (type === "400") {
    return res.status(400).json({ message: "Bad Request: This is a 400 error." });
  }

  return res.status(200).json({ message: "Success: No error here!" });
}
