import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

export const handler: Handler = async (event) => {
  // Get the Resend API key from environment variables
  const resend = new Resend(process.env['RESEND_API_KEY']);

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use the default Resend domain
      to: 'sumantasahu.sm@gmail.com', // YOUR email address
      subject: `New Message from ${data.name} via Portfolio`,
      html: `
        <p>You have a new contact form submission:</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message.' }),
    };
  }
};