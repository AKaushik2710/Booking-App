import type { NextApiRequest, NextApiResponse } from 'next';
import dynamodb from '@/lib/dynamodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

  const params = {
    TableName: 'Appointments',
  };

  try {
    const data = await dynamodb.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (err: any) {
    console.error("❌ Error fetching appointments:", err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
}

