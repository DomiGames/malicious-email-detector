import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Error analyzing text',
      error: error.response?.data || error.message,
    });
  }
};

export default handler;
