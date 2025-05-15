import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Sparkles } from "lucide-react";
import { Form } from "@/components/ui/form";
import emailjs from '@emailjs/browser';

// Access environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCJk0564e6SKLC8D0NT2chWdxfWJu6E-JE";
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbz46n96c3QAdQXAjhVy5kIYfNS0LeFo8cuYSTdZuXjqChwrtBTKUCPO-3i0HKptvNOcoQ/exec';

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_iot67w3';
const EMAILJS_TEMPLATE_ID = 'template_1uaob81';
const EMAILJS_USER_TEMPLATE_ID = 'template_x8g4j6b'; // Updated template ID for user confirmation
const EMAILJS_PUBLIC_KEY = 'LYPZPgE_KJW9Fka5-';

// AiSensy OTP service credentials
const AISENSY_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjFiZTUyYTk3NTIzN2ZjMmE0NmM2NyIsIm5hbWUiOiJXZWxjb21lQ3VyZSIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NTBjMGNkMGIyMTlmYzIwNmQ0NjNjMzAiLCJhY3RpdmVQbGFuIjoiTk9ORSIsImlhdCI6MTcwMDkwNDUzMH0.iuMUtjZ2MGRc2jnpBJFUHOmKeJlWGghNKc4MFJb9pCA";
const AISENSY_API_URL = "https://backend.aisensy.com/campaign/t1/api/v2";
const OTP_CAMPAIGN_NAME = "otp_verification"; // Campaign name in AiSensy

// Major Indian cities list
const indianCities = [
 "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
"Ahmedabad", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", 
"Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", 
"Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", 
"Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", 
"Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", 
"Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", 
"Chandigarh", "Guwahati", "Solapur", "Hubli", "Dharwad", "Mysore", 
"Tiruchirappalli", "Bareilly", "Aligarh", "Moradabad", "Gorakhpur",
"Salem", "Warangal", "Tiruppur", "Bhavnagar", "Cuttack", "Ujjain",
"Bellary", "Thiruvananthapuram", "Bhilai", "Noida", "Firozabad",
"Rourkela", "Bhagalpur", "Muzaffarpur", "Bhiwandi", "Saharanpur",
"Guntur", "Bikaner", "Amravati", "Jamshedpur", "Bokaro", "Jhansi",
"Panipat", "Loni", "Kakinada", "Mangalore", "Erode", "Nellore",
"Bilaspur", "Tirunelveli", "Malegaon", "Udaipur", "Davanagere",
"Kozhikode", "Akola", "Kolhapur", "Nanded", "Ajmer", "Ichalkaranji"
];

interface BookingFormData {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  doctorPreference: string;
  city: string;
  problem: string;
}

// Function to generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via AiSensy WhatsApp
const sendOtpViaWhatsApp = async (formData: BookingFormData) => {
  try {
    console.log('Sending OTP via AiSensy to phone:', formData.phone);
    
    // Generate a unique 6-digit OTP
    const uniqueOTP = generateOTP();
    
    // Format phone number (ensure it has country code)
    let phoneNumber = formData.phone;
    if (!phoneNumber.startsWith('91') && !phoneNumber.startsWith('+91')) {
      phoneNumber = '91' + phoneNumber;
    }
    
    // Remove any + character if present
    phoneNumber = phoneNumber.replace('+', '');
    
    // Get first name for template parameter
    const firstName = formData.fullName.split(' ')[0] || 'user';
    
    // Keep the original structure but use the unique OTP
    const otpPayload = {
      apiKey: AISENSY_API_KEY,
      campaignName: OTP_CAMPAIGN_NAME,
      destination: phoneNumber,
      userName: "WelcomeCure",
      templateParams: [
        firstName
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
    
    console.log('Sending OTP request to AiSensy with payload:', JSON.stringify(otpPayload));
    
    const response = await fetch(AISENSY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(otpPayload)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('AiSensy API error response:', errorData);
      throw new Error(`AiSensy API error: ${errorData.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('AiSensy OTP response:', data);
    
    return { success: true, data, otp: uniqueOTP };
  } catch (error) {
    console.error('Error sending OTP via AiSensy:', error);
    return { success: false, error, otp: null };
  }
};

const callGeminiAPI = async (text: string): Promise<string> => {
  try {
    console.log('Calling Gemini API to enhance text...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Do Not say How can I help just fix Grammer and spelling mistake Do not Give Options Please just suggest only one Fix the grammar, spelling, and clarity of this patient's health issue description. Keep all symptoms and concerns the same. Description: "${text}"`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!enhancedText) {
      throw new Error('No enhanced text returned from Gemini API');
    }

    return enhancedText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Direct Google Sheets submission function
const submitToGoogleSheets = async (formData: BookingFormData) => {
  try {
    console.log('Submitting form data:', formData);
    console.log('City value being sent:', formData.city); // Add logging for city value
    
    // Method 1: Try fetch with no-cors first
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });
      console.log('Form submitted using fetch no-cors method');
      return { success: true };
    } catch (fetchError) {
      console.warn('Fetch submission failed, trying fallback method:', fetchError);
      
      // Method 2: Fallback - Submit via URL parameters (GET request)
      const params = new URLSearchParams();
      params.append('fullName', formData.fullName);
      params.append('age', formData.age || '');
      params.append('email', formData.email);
      params.append('phone', formData.phone);
      params.append('doctorPreference', formData.doctorPreference || '');
      params.append('city', formData.city || ''); // Ensure city is included
      params.append('problem', formData.problem || '');
      
      // Create image for tracking submission (invisible)
      const img = document.createElement('img');
      img.style.display = 'none';
      img.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
      document.body.appendChild(img);
      
      // Remove the image after a delay
      setTimeout(() => {
        document.body.removeChild(img);
      }, 5000);
      
      console.log('Form submitted using URL parameters method');
      return { success: true };
    }
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
};

// Function to send confirmation email to the user who submitted the form
const sendConfirmationEmail = async (formData: BookingFormData) => {
  try {
    const userEmail = formData.email.trim();
    console.log('Attempting to send confirmation email to user email:', userEmail);
    
    if (!userEmail || !userEmail.includes('@')) {
      console.error('Invalid email address provided:', userEmail);
      throw new Error('Invalid email address');
    }
    
    // Format doctor preference for readability
    const formattedDoctorPreference = formData.doctorPreference.replace(/-/g, ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    
    // Prepare template parameters for user confirmation email
    const emailParams = {
      to_name: formData.fullName,
      to_email: userEmail, // Explicitly set user's email
      doctor_preference: formattedDoctorPreference,
      user_city: formData.city,
      problem_description: formData.problem,
      reply_to: "info@welcomecure.com" // WelcomeCure support email
    };
    
    console.log('Confirmation email parameters:', JSON.stringify(emailParams));
    
    // Initialize EmailJS again just to be sure
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Send email directly with all parameters explicitly specified
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_USER_TEMPLATE_ID,
      emailParams,
      EMAILJS_PUBLIC_KEY
    );
    
    console.log('EmailJS Response:', response);
    console.log('Confirmation email sent successfully to:', userEmail);
    return { success: true };
  } catch (error) {
    console.error('Detailed error sending confirmation email:', error);
    // Continue execution even if email fails
    return { success: false, error };
  }
};

// Function to send notification email to admin
const sendAdminNotification = async (formData: BookingFormData) => {
  try {
    console.log('Sending notification email to admin');
    
    // Format doctor preference for readability
    const formattedDoctorPreference = formData.doctorPreference.replace(/-/g, ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    
    // Prepare template parameters for admin notification
    const templateParams = {
      to_email: 'sameer@howl.in', // Admin email
      full_name: formData.fullName,
      age: formData.age,
      email: formData.email,
      phone: formData.phone,
      doctor: formattedDoctorPreference,
      city: formData.city,
      symptoms: formData.problem,
      reply_to: formData.email
    };
    
    // Send email notification to admin
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    console.log('Admin notification email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    // Continue execution even if email fails
    return { success: false, error };
  }
};

export const BookingForm = () => {
  const [isRefining, setIsRefining] = useState(false);
  const [refinementError, setRefinementError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  
  // OTP related states
  const [otpStatus, setOtpStatus] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);

  // Reference to store the actual OTP for verification
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  
  // Filter cities based on search term
  const filteredCities = indianCities.filter(city => 
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  ).slice(0, 5); // Show only first 5 matches

  // Initialize EmailJS
  useEffect(() => {
    try {
      console.log('Initializing EmailJS with public key:', EMAILJS_PUBLIC_KEY);
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      // Test EmailJS configuration
      const testConfig = async () => {
        try {
          console.log('Testing EmailJS configuration...');
          console.log('Service ID:', EMAILJS_SERVICE_ID);
          console.log('Admin Template ID:', EMAILJS_TEMPLATE_ID);
          console.log('User Template ID:', EMAILJS_USER_TEMPLATE_ID);
        } catch (error) {
          console.error('Error testing EmailJS configuration:', error);
        }
      };
      
      testConfig();
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  // Close city dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.city-dropdown-container')) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const form = useForm<BookingFormData>({
    defaultValues: {
      fullName: "",
      age: "",
      email: "",
      phone: "",
      doctorPreference: "",
      city: "",
      problem: "",
    }
  });

  // Watch the problem field to enable/disable the button reactively
  const problemText = form.watch("problem");
  const phoneNumber = form.watch("phone");

  const validatePhoneNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Check if OTP is verified
      if (!otpVerified) {
        setSubmitError('Please verify your phone number first');
        return;
      }
      
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(null);
      
      // Validate email format
      if (!data.email || !data.email.includes('@')) {
        setSubmitError('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }
      
      // Format doctor preference to make it readable (if it's in kebab-case)
      const formattedData = {
        ...data,
        doctorPreference: data.doctorPreference.replace(/-/g, ' ')
          .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
      };
      
      console.log('Form submission - user email:', data.email);
      
      // Send data to Google Sheets directly
      try {
        await submitToGoogleSheets(formattedData);
        console.log('Data successfully submitted to Google Sheets');
      } catch (sheetError) {
        console.error('Google Sheets submission error:', sheetError);
        // Continue with email sending even if sheets submission fails
      }
      
      // Send confirmation email to the user
      let userEmailSent = false;
      try {
        const emailResult = await sendConfirmationEmail(data);
        userEmailSent = emailResult.success;
        if (userEmailSent) {
          console.log('Confirmation email successfully sent to user');
        } else {
          console.error('Failed to send confirmation email to user');
        }
      } catch (emailError) {
        console.error('Exception sending confirmation email:', emailError);
      }
      
      // Send notification to admin
      let adminEmailSent = false;
      try {
        const adminResult = await sendAdminNotification(data);
        adminEmailSent = adminResult.success;
        if (adminEmailSent) {
          console.log('Admin notification email sent successfully');
        } else {
          console.error('Failed to send admin notification');
        }
      } catch (emailError) {
        console.error('Exception sending admin notification:', emailError);
      }
      
      // Show success message and reset form
      if (userEmailSent) {
        setSubmitSuccess(`Thank you for booking an appointment! A confirmation has been sent to ${data.email}.`);
      } else {
        setSubmitSuccess('Appointment booked successfully! We will contact you shortly.');
      }
      
      // Reset form and states
      form.reset();
      setCitySearchTerm('');
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode('');
      setGeneratedOtp(null);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRefineProblem = async () => {
    const currentProblem = form.getValues("problem");
    
    if (!currentProblem.trim()) {
      return;
    }
    
    setIsRefining(true);
    setRefinementError(null);
    
    try {
      // Call the Gemini API to enhance the text
      const refinedText = await callGeminiAPI(currentProblem);
      form.setValue("problem", refinedText);
    } catch (error) {
      console.error('Error during refinement:', error);
      setRefinementError(error instanceof Error ? error.message : "An error occurred with the AI service");
    } finally {
      setIsRefining(false);
    }
  };

  const handleCitySelect = (city: string) => {
    form.setValue("city", city);
    setCitySearchTerm(city);
    setShowCityDropdown(false);
    console.log("City selected:", city); // Log when a city is selected
  };

  // Handler to request OTP
  const handleRequestOtp = async () => {
    try {
      // Validate the phone number before requesting OTP
      if (!validatePhoneNumber(phoneNumber)) {
        setSubmitError('Please enter a valid phone number (at least 10 digits)');
        return;
      }
      
      setIsRequestingOtp(true);
      setOtpStatus('Sending OTP...');
      setSubmitError(null);
      
      // Get the current form values
      const formData = form.getValues();
      
      // Send OTP via WhatsApp
      const otpResult = await sendOtpViaWhatsApp(formData);
      
      if (otpResult.success && otpResult.otp) {
        setOtpSent(true);
        setGeneratedOtp(otpResult.otp);
        setOtpStatus('OTP sent to your WhatsApp. Please enter it below.');
        console.log('OTP sent successfully:', otpResult.otp);
      } else {
        setOtpStatus('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setOtpStatus('Error sending OTP. Please try again.');
      setSubmitError('Could not send verification code. Please check your phone number.');
    } finally {
      setIsRequestingOtp(false);
    }
  };
  
  // Handler to verify OTP
  const handleVerifyOtp = () => {
    if (otpCode && otpCode === generatedOtp) {
      setOtpVerified(true);
      setOtpStatus('Phone number verified successfully!');
      setSubmitError(null);
    } else {
      setSubmitError('Invalid verification code. Please try again.');
    }
  };

  return (
    <section className="bg-[#B5E7FF] w-full py-8 md:py-12" id="booking-form">
      <div className="container mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Left side with sleeping person image and text */}
          <div className="relative w-full lg:h-full overflow-hidden rounded-xl md:rounded-xl">
            <img
              src="/assets/form.webp"
              alt="Person with sleep disorder"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col justify-start p-4 sm:p-6 md:p-8">
              <div className="text-[#1D9BD7]">
                <h3 className="text-sm md:text-2xl sm:text-2xl font-normal md:mb-1">
                  Don't sleep on potential sleep disorders.
                </h3>
                <p className="text-xl sm:text-3xl md:text-3xl font-bold">
                  Get a free evaluation done now.
                </p>
              </div>
            </div>
          </div>

          {/* Right side with form */}
          <div className="p-2 sm:p-6 md:p-8 rounded-bl-xl rounded-br-xl lg:rounded-bl-none lg:rounded-tr-xl bg-[#B5E7FF]/40">
            <Form {...form}  >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <Input 
                    placeholder="Full Name" 
                    className="bg-white h-12 md:h-14 rounded-xl text-base" 
                    {...form.register("fullName")}
                    required
                  />
                  <Input 
                    placeholder="Age" 
                    className="bg-white h-12 md:h-14 rounded-xl text-base" 
                    {...form.register("age")}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <Input 
                    placeholder="Email address" 
                    className="bg-white h-12 md:h-14 rounded-xl text-base" 
                    type="email" 
                    {...form.register("email")}
                    required
                  />
                  <div className="relative">
                    <Input 
                      placeholder="Phone Number" 
                      className="bg-white h-12 md:h-14 rounded-xl text-base pr-24" 
                      {...form.register("phone")}
                      required
                      disabled={otpSent}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleRequestOtp}
                      disabled={isRequestingOtp || otpVerified || !validatePhoneNumber(phoneNumber || '') || otpSent}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FBDC00] hover:bg-[#e6ca00] text-black rounded-lg h-10 px-2"
                    >
                      {isRequestingOtp ? (
                        <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                      ) : otpVerified ? (
                        "Verified"
                      ) : otpSent ? (
                        "Resend OTP"
                      ) : (
                        "Get OTP"
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* OTP verification input - only visible when OTP is sent */}
                {otpSent && !otpVerified && (
                  <>
                    <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm mb-2">
                      We've sent a WhatsApp message with a verification code to your phone. Please enter it below.
                    </div>
                    <div className="relative">
                      <Input 
                        placeholder="Enter verification code" 
                        className="bg-white h-12 md:h-14 rounded-xl text-base pr-24" 
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleVerifyOtp}
                        disabled={!otpCode || otpCode.length < 6}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FBDC00] hover:bg-[#e6ca00] text-black rounded-lg h-10 px-2"
                      >
                        Verify OTP
                      </Button>
                    </div>
                  </>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* Doctor Preference */}
                  <div className="relative">
                    <Input 
                      placeholder="Doctor Preference"
                      readOnly
                      className="bg-white h-12 md:h-14 rounded-xl text-base w-full pr-10"
                      value={form.watch("doctorPreference") ? 
                        form.watch("doctorPreference").replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) 
                        : ""}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#FBDC00] rounded-full flex items-center justify-center">
                        <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-black" />
                      </div>
                    </div>
                    <select 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => form.setValue("doctorPreference", e.target.value)}
                    >
                      <option value="" disabled selected>Doctor Preference</option>
                      <option value="first-time-consultation">First Time Consultation</option>
                      <option value="dr-jawahar-shah">Dr. Jawahar Shah</option>
                      <option value="dr-rita-maity">Dr. Rita Maity</option>
                      <option value="dr-bhavna-ahuja">Dr. Bhavna Ahuja</option>
                      <option value="dr-nida-qazi">Dr. Nida Qazi</option>
                    </select>
                  </div>
                  
                  {/* City Input with autocomplete */}
                  <div className="relative city-dropdown-container">
                    <Input 
                      placeholder="Your City"
                      className="bg-white h-12 md:h-14 rounded-xl text-base w-full"
                      value={citySearchTerm}
                      {...form.register("city")}
                      onChange={(e) => {
                        setCitySearchTerm(e.target.value);
                        form.setValue("city", e.target.value);
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                    />
                    
                    {/* City dropdown */}
                    {showCityDropdown && citySearchTerm && filteredCities.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
                        {filteredCities.map((city, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCitySelect(city)}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <Textarea 
                    placeholder="Tell us your symptoms or concern (refine it with AI for better clarity)" 
                    className="bg-white min-h-[150px] sm:min-h-[150px] md:min-h-[180px] rounded-xl text-base resize-none p-3 md:p-4" 
                    {...form.register("problem")}
                  />
                  
                  <div className="absolute bottom-3 right-3 z-10">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRefineProblem}
                      disabled={isRefining || !problemText?.trim()}
                      className="bg-white border border-[#FBDC00] hover:bg-[#FBDC00]/10 text-black rounded-lg flex items-center gap-2 h-9"
                    >
                      {isRefining ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-[#FBDC00] border-t-transparent rounded-full" />
                          <span>Refining...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} className="text-[#FBDC00]" />
                          <span>Refine with AI</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {refinementError && (
                    <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-md">
                      {refinementError}
                    </div>
                  )}
                </div>
                
                {otpStatus && (
                  <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                    {otpStatus}
                  </div>
                )}
                
                {submitSuccess && (
                  <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                    {submitSuccess}
                  </div>
                )}
                
                {submitError && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {submitError}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#FBDC00] hover:bg-[#FBDC00]/90 text-black font-semibold text-base md:text-lg h-12 md:h-14 rounded-xl"
                  disabled={isSubmitting || !otpVerified}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Book your appointment"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};