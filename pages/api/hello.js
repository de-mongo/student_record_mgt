// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const body = req.body
  console.log("image-data: ", body)
  res.status(200).json({ name: 'John Doe' })
}
