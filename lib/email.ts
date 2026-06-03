import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Booking - CineHaven</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background-color: #0a0a0f;
          font-family: 'Inter', sans-serif;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
          border: 1px solid rgba(255, 215, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 40px 30px;
          text-align: center;
          border-bottom: 2px solid #ffd700;
        }
        
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffd700;
          letter-spacing: 2px;
        }
        
        .tagline {
          color: #a0a0b0;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-top: 8px;
        }
        
        .content {
          padding: 40px 30px;
        }
        
        .greeting {
          color: #e8e8f0;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .message {
          color: #b0b0c0;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 30px;
        }
        
        .otp-box {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
        }
        
        .otp-label {
          color: #a0a0b0;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 15px;
        }
        
        .otp-code {
          font-family: 'Courier New', monospace;
          font-size: 42px;
          font-weight: 700;
          color: #ffd700;
          letter-spacing: 12px;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
        
        .expiry {
          color: #ff6b6b;
          font-size: 13px;
          margin-top: 15px;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
          margin: 30px 0;
        }
        
        .footer {
          background: rgba(0, 0, 0, 0.3);
          padding: 30px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .footer-text {
          color: #606070;
          font-size: 12px;
          line-height: 1.6;
        }
        
        .social-links {
          margin-top: 20px;
        }
        
        .social-links a {
          color: #ffd700;
          text-decoration: none;
          margin: 0 15px;
          font-size: 13px;
        }
        
        .security-note {
          background: rgba(255, 107, 107, 0.05);
          border-left: 3px solid #ff6b6b;
          padding: 15px 20px;
          margin-top: 25px;
          border-radius: 0 8px 8px 0;
        }
        
        .security-note p {
          color: #ff9999;
          font-size: 13px;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">CINEHAVEN</div>
          <div class="tagline">Private Cinema Experience</div>
        </div>
        
        <div class="content">
          <div class="greeting">Hello ${name},</div>
          
          <div class="message">
            Thank you for choosing CineHaven for your private cinema experience. To secure your booking, please verify your email address using the code below.
          </div>
          
          <div class="otp-box">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-code">${otp}</div>
            <div class="expiry">⏰ Expires in 10 minutes</div>
          </div>
          
          <div class="security-note">
            <p>🔒 Never share this code with anyone. Our team will never ask for your OTP.</p>
          </div>
          
          <div class="divider"></div>
          
          <div class="message" style="font-size: 13px; color: #808090;">
            If you didn't request this booking, please ignore this email or contact us immediately at <a href="mailto:support@cinehaven.com" style="color: #ffd700;">support@cinehaven.com</a>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-text">
            CineHaven Private Theaters<br>
            Making celebrations unforgettable<br><br>
            📍 Multiple locations across India<br>
            📞 +91 98765 43210 | ✉️ hello@cinehaven.com
          </div>
          <div class="social-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"CineHaven Private Theaters" <${process.env.SMTP_USER}>`,
    to: email,
    subject: '🔐 Verify Your Booking - OTP Code',
    html,
  });
}

export async function sendBookingConfirmationEmail(
  email: string,
  bookingData: {
    name: string;
    bookingId: string;
    location: string;
    room: string;
    package: string;
    date: string;
    timeSlot: string;
    guests: number;
    totalAmount: number;
  }
) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmed - CineHaven</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background-color: #0a0a0f;
          font-family: 'Inter', sans-serif;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
          border: 1px solid rgba(255, 215, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 40px 30px;
          text-align: center;
          border-bottom: 2px solid #ffd700;
        }
        
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffd700;
          letter-spacing: 2px;
        }
        
        .tagline {
          color: #a0a0b0;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-top: 8px;
        }
        
        .success-banner {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.05) 100%);
          border: 2px solid rgba(76, 175, 80, 0.3);
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          margin: 30px;
        }
        
        .success-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        
        .success-title {
          color: #4caf50;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        
        .success-subtitle {
          color: #a0a0b0;
          font-size: 14px;
        }
        
        .content {
          padding: 0 30px 30px;
        }
        
        .booking-id {
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          margin-bottom: 30px;
        }
        
        .booking-id-label {
          color: #a0a0b0;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        
        .booking-id-value {
          font-family: 'Courier New', monospace;
          font-size: 24px;
          font-weight: 700;
          color: #ffd700;
          letter-spacing: 2px;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .detail-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
        }
        
        .detail-label {
          color: #a0a0b0;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .detail-value {
          color: #e8e8f0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .amount-section {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 100%);
          border: 1px solid rgba(255, 215, 0, 0.15);
          border-radius: 16px;
          padding: 25px;
          margin-bottom: 30px;
        }
        
        .amount-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        
        .amount-label {
          color: #a0a0b0;
          font-size: 14px;
        }
        
        .amount-value {
          color: #e8e8f0;
          font-size: 14px;
          font-weight: 500;
        }
        
        .amount-total {
          border-top: 1px solid rgba(255, 215, 0, 0.2);
          padding-top: 15px;
          margin-top: 15px;
        }
        
        .amount-total .amount-label {
          color: #ffd700;
          font-size: 16px;
          font-weight: 600;
        }
        
        .amount-total .amount-value {
          color: #ffd700;
          font-size: 24px;
          font-weight: 700;
        }
        
        .cta-button {
          display: block;
          background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
          color: #0a0a0f;
          text-decoration: none;
          text-align: center;
          padding: 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 20px;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
          margin: 30px 0;
        }
        
        .info-box {
          background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid #ffd700;
          padding: 20px;
          border-radius: 0 12px 12px 0;
          margin-bottom: 20px;
        }
        
        .info-box h4 {
          color: #ffd700;
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        
        .info-box p {
          color: #b0b0c0;
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
        }
        
        .footer {
          background: rgba(0, 0, 0, 0.3);
          padding: 30px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .footer-text {
          color: #606070;
          font-size: 12px;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">CINEHAVEN</div>
          <div class="tagline">Private Cinema Experience</div>
        </div>
        
        <div class="success-banner">
          <div class="success-icon">🎉</div>
          <div class="success-title">Booking Confirmed!</div>
          <div class="success-subtitle">Your private cinema experience is all set</div>
        </div>
        
        <div class="content">
          <div class="booking-id">
            <div class="booking-id-label">Booking Reference</div>
            <div class="booking-id-value">${bookingData.bookingId}</div>
          </div>
          
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Location</div>
              <div class="detail-value">${bookingData.location}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Room</div>
              <div class="detail-value">${bookingData.room}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Package</div>
              <div class="detail-value">${bookingData.package}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Date</div>
              <div class="detail-value">${bookingData.date}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Time</div>
              <div class="detail-value">${bookingData.timeSlot}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Guests</div>
              <div class="detail-value">${bookingData.guests} People</div>
            </div>
          </div>
          
          <div class="amount-section">
            <div class="amount-row">
              <span class="amount-label">Total Amount</span>
              <span class="amount-value">₹${bookingData.totalAmount.toLocaleString()}</span>
            </div>
            <div class="amount-row amount-total">
              <span class="amount-label">Amount to Pay</span>
              <span class="amount-value">₹${bookingData.totalAmount.toLocaleString()}</span>
            </div>
          </div>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/bookings/${bookingData.bookingId}" class="cta-button">
            View Booking Details
          </a>
          
          <div class="divider"></div>
          
          <div class="info-box">
            <h4>📍 Arrival Instructions</h4>
            <p>Please arrive 15 minutes before your scheduled time. Our concierge will greet you at the entrance and escort you to your private theater.</p>
          </div>
          
          <div class="info-box">
            <h4>🎬 What to Expect</h4>
            <p>Your private theater includes premium seating, state-of-the-art sound system, and personalized decorations. Feel free to bring your own content or choose from our curated collection.</p>
          </div>
          
          <div class="info-box">
            <h4>📞 Need Help?</h4>
            <p>Call us at +91 98765 43210 or WhatsApp us anytime. Our celebration experts are available 24/7 to assist you.</p>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-text">
            CineHaven Private Theaters<br>
            Making celebrations unforgettable<br><br>
            📍 Multiple locations across India<br>
            📞 +91 98765 43210 | ✉️ hello@cinehaven.com
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"CineHaven Private Theaters" <${process.env.SMTP_USER}>`,
    to: email,
    subject: '🎉 Your Booking is Confirmed!',
    html,
  });
}

export async function sendAdminNotificationEmail(bookingData: {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  room: string;
  package: string;
  date: string;
  guests: number;
  totalAmount: number;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: #1a1a2e; color: #ffd700; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .content { padding: 30px; }
        .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px; border-radius: 0 8px 8px 0; }
        .alert strong { color: #856404; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f8f9fa; font-weight: 600; color: #333; width: 35%; }
        td { color: #555; }
        .amount { font-size: 20px; font-weight: 700; color: #28a745; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎬 New Booking Alert</h1>
        </div>
        <div class="content">
          <div class="alert">
            <strong>New booking confirmed!</strong> A customer has successfully completed their booking.
          </div>
          
          <table>
            <tr><th>Booking ID</th><td><strong>${bookingData.bookingId}</strong></td></tr>
            <tr><th>Customer</th><td>${bookingData.name}</td></tr>
            <tr><th>Email</th><td>${bookingData.email}</td></tr>
            <tr><th>Phone</th><td>${bookingData.phone}</td></tr>
            <tr><th>Location</th><td>${bookingData.location}</td></tr>
            <tr><th>Room</th><td>${bookingData.room}</td></tr>
            <tr><th>Package</th><td>${bookingData.package}</td></tr>
            <tr><th>Date</th><td>${bookingData.date}</td></tr>
            <tr><th>Guests</th><td>${bookingData.guests}</td></tr>
            <tr><th>Total Amount</th><td class="amount">₹${bookingData.totalAmount.toLocaleString()}</td></tr>
          </table>
        </div>
        <div class="footer">
          CineHaven Admin Dashboard | New Lead Generated
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"CineHaven System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'admin@cinehaven.com',
    subject: `🎬 New Booking: ${bookingData.bookingId} - ₹${bookingData.totalAmount.toLocaleString()}`,
    html,
  });
}

export async function sendContactAcknowledgementEmail(contactData: {
  name: string;
  email: string;
  phone?: string;
  occasion?: string;
  message: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0D0B14;font-family:Arial,sans-serif;color:#F0EBE3;">
      <div style="max-width:620px;margin:0 auto;background:#16121F;border:1px solid rgba(232,168,56,.18);">
        <div style="padding:32px;text-align:center;border-bottom:2px solid #E8A838;">
          <div style="font-size:28px;font-weight:700;color:#E8A838;letter-spacing:2px;">CINEHAVEN</div>
          <div style="margin-top:8px;color:#9B96A8;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Private Theatre Celebrations</div>
        </div>
        <div style="padding:32px;">
          <h1 style="margin:0 0 16px;color:#F0EBE3;font-size:24px;">Hi ${contactData.name}, we received your message.</h1>
          <p style="margin:0 0 24px;color:#BDB7C9;line-height:1.7;">
            Thanks for reaching out to CineHaven. Our celebration team will get back to you within 2 hours during support hours.
          </p>
          <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:20px;">
            <p style="margin:0 0 8px;color:#E8A838;font-size:13px;text-transform:uppercase;letter-spacing:2px;">Your Inquiry</p>
            <p style="margin:0;color:#F0EBE3;line-height:1.7;">${contactData.message}</p>
          </div>
          <p style="margin:24px 0 0;color:#9B96A8;line-height:1.6;font-size:14px;">
            For urgent same-day bookings, call us at +91 98765 43210.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"CineHaven Private Theaters" <${process.env.SMTP_USER}>`,
    to: contactData.email,
    subject: 'We received your CineHaven inquiry',
    html,
  });
}

export async function sendContactAdminNotificationEmail(contactData: {
  name: string;
  email: string;
  phone?: string;
  occasion?: string;
  message: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);">
        <div style="background:#1a1a2e;color:#ffd700;padding:24px;text-align:center;">
          <h1 style="margin:0;font-size:22px;">New Contact Inquiry</h1>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><th style="text-align:left;padding:12px;background:#f8f9fa;width:34%;">Name</th><td style="padding:12px;border-bottom:1px solid #eee;">${contactData.name}</td></tr>
            <tr><th style="text-align:left;padding:12px;background:#f8f9fa;">Email</th><td style="padding:12px;border-bottom:1px solid #eee;">${contactData.email}</td></tr>
            <tr><th style="text-align:left;padding:12px;background:#f8f9fa;">Phone</th><td style="padding:12px;border-bottom:1px solid #eee;">${contactData.phone || '-'}</td></tr>
            <tr><th style="text-align:left;padding:12px;background:#f8f9fa;">Occasion</th><td style="padding:12px;border-bottom:1px solid #eee;">${contactData.occasion || '-'}</td></tr>
          </table>
          <div style="margin-top:20px;padding:18px;background:#fff8e1;border-left:4px solid #ffc107;border-radius:0 8px 8px 0;">
            <strong>Message</strong>
            <p style="margin:10px 0 0;line-height:1.6;">${contactData.message}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"CineHaven System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'admin@cinehaven.com',
    replyTo: contactData.email,
    subject: `New Contact Inquiry: ${contactData.name}`,
    html,
  });
}
