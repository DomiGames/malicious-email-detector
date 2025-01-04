import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type HuggingFaceResponse = Array<{
  label: string;
  score: number;
}>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  if (!process.env.HUGGINGFACE_API_KEY) {
    return res.status(500).json({ message: 'Hugging Face API key is not configured' });
  }

  try {
    const response = await axios.post<HuggingFaceResponse>(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
        },
        timeout: 10000,
      }
    );

    return res.status(200).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error:', error.response.data);
      return res.status(500).json({
        message: 'Error analyzing text',
        error: error.response.data,
      });
    }

    console.error('Unexpected Error:', error);
    return res.status(500).json({
      message: 'An unexpected error occurred',
      error: String(error),
    });
  }
};

export default handler;
