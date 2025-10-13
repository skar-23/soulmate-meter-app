
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // The request body is automatically parsed by Vercel
    const { name, email, subject, message } = req.body;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'contactskarlove@gmail.com',
        subject: `New Contact Form Submission: ${subject}`,
        html: `<p>You have a new submission from:</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
      });

      // Send a success response
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Resend API Error:', error);
      // Send an error response
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
