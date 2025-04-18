import { NextApiRequest, NextApiResponse } from 'next';
import dynamodb from '@/lib/dynamodb';
import AWS from 'aws-sdk';

const ses = new AWS.SES({
  region: 'ap-south-1', // e.g. 'us-east-1'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const params = {
    TableName: 'Appointments',
    Item: {
      appointmentID: Date.now().toString(),
      name,
      email,
      date,
      time,
    },
  };

  try {
    console.log("📦 Attempting to write to DynamoDB with params:", params);
    await dynamodb.put(params).promise();
const emailParams = {
  Source: 'vahixi5116@f5url.com', // ✅ your verified "From" email
  Destination: {
    ToAddresses: [email], // the appointer's email from the form
  },
  Message: {
    Subject: {
      Data: 'Appointment Confirmed',
    },
    Body: {
      Text: {
        Data: `Hello ${name},\n\nYour appointment for ${date} at ${time} has been confirmed.\n\nThanks!`,
      },
    },
  },
};

try {
  await ses.sendEmail(emailParams).promise();
  console.log("📧 Email sent successfully");
} catch (emailErr) {
  console.error("❌ Failed to send email:", emailErr);
}

    console.log("✅ Saved successfully!");
    res.status(200).json({ message: 'Appointment booked successfully!' });
  }catch (err: any) {
    console.error("❌ FULL ERROR DETAILS:");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("Full error object:", err);
    res.status(500).json({ message: 'Error saving appointment', error: err.message });
  }
  }

