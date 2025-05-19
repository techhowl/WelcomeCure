const AISENSY_API_URL = 'https://backend.aisensy.com/campaign/t1/api/v2';
const AISENSY_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjFiZTUyYTk3NTIzN2ZjMmE0NmM2NyIsIm5hbWUiOiJXZWxjb21lQ3VyZSIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NTBjMGNkMGIyMTlmYzIwNmQ0NjNjMzAiLCJhY3RpdmVQbGFuIjoiTk9ORSIsImlhdCI6MTcwMDkwNDUzMH0.iuMUtjZ2MGRc2jnpBJFUHOmKeJlWGghNKc4MFJb9pCA';
const OTP_CAMPAIGN_NAME = 'otp_verification_trail1';
const SUCCESS_CAMPAIGN_NAME = 'booking_success'; // Your confirmation template name

interface BookingFormData {
  phone: string;
  fullName: string;
  bookingId?: string; // Optional, used in confirmation
  age?: string;
  email?: string;
  doctorPreference?: string;
  city?: string;
  problem?: string;
}

// Utility function to format phone number
const formatPhoneNumber = (phone: string): string => {
  let formatted = phone.trim();
  if (!formatted.startsWith('91') && !formatted.startsWith('+91')) {
    formatted = '91' + formatted;
  }
  return formatted.replace('+', '');
};

// ✅ 1. Send OTP message
export const sendOtpMessage = async (formData: BookingFormData, uniqueOTP: string) => {
  try {
    const phoneNumber = formatPhoneNumber(formData.phone);
    const firstName = formData.fullName.split(' ')[0] || 'user';

    const otpPayload = {
      apiKey: AISENSY_API_KEY,
      campaignName: OTP_CAMPAIGN_NAME,
      destination: phoneNumber,
      userName: "WelcomeCure",
      templateParams: [
        "$FirstName"
      ],
      source: "new-landing-page form",
      media: {},
      buttons: [
        {
          type: "button",
          sub_type: "url",
          index: 0,
          parameters: [
            {
              type: "text",
              text: uniqueOTP
            }
          ]
        }
      ],
      carouselCards: [],
      location: {},
      attributes: {},
      paramsFallbackValue: {
        FirstName: firstName
      }
    };

    const response = await fetch(AISENSY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(otpPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OTP Message Error:', data);
      throw new Error(`OTP API Error: ${data.message || response.statusText}`);
    }

    console.log('OTP Message Sent:', data);
    return { success: true, data, otp: uniqueOTP };

  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error, otp: null };
  }
};

// ✅ 2. Send confirmation message after form submission
export const sendConfirmationMessage = async (formData: BookingFormData) => {
  try {
    const phoneNumber = formatPhoneNumber(formData.phone);
    const firstName = formData.fullName.split(' ')[0] || 'user';
    const bookingId = formData.bookingId || `WC${Date.now().toString().slice(-6)}`;

    const confirmationPayload = {
      apiKey: AISENSY_API_KEY,
      campaignName: SUCCESS_CAMPAIGN_NAME,
      destination: phoneNumber,
      userName: "WelcomeCure",
      templateParams: [firstName, bookingId],
      source: "new-landing-page form",
      media: {},
      buttons: [],
      carouselCards: [],
      location: {},
      attributes: {},
      paramsFallbackValue: {
        FirstName: firstName
      }
    };

    const response = await fetch(AISENSY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(confirmationPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Confirmation Message Error:', data);
      throw new Error(`Confirmation API Error: ${data.message || response.statusText}`);
    }

    console.log('Confirmation Message Sent:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Error sending confirmation message:', error);
    return { success: false, error };
  }
}; 