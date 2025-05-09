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
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxqWCF0PSEFgqpztYrKOMYPoNMiNEbARThv9dbbQIzqhUD1Dz_hFQ6OlcaXJ1CSuTsMOQ/exec';

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_iot67w3';
const EMAILJS_TEMPLATE_ID = 'template_1uaob81';
const EMAILJS_PUBLIC_KEY = 'LYPZPgE_KJW9Fka5-';

interface BookingFormData {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  doctorPreference: string;
  problem: string;
}

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

// Function to send email using EmailJS
const sendEmail = async (formData: BookingFormData) => {
  try {
    console.log('Sending email with EmailJS...');
    
    // Format doctor preference for readability
    const formattedDoctorPreference = formData.doctorPreference.replace(/-/g, ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    
    // Prepare template parameters - match with email template variables
    const templateParams = {
      to_email: 'sameer@howl.in',
      full_name: formData.fullName,
      age: formData.age,
      email: formData.email,
      phone: formData.phone,
      doctor: formattedDoctorPreference,
      symptoms: formData.problem,
      reply_to: formData.email
    };
    
    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response.status, response.text);
    return { success: true };
  } catch (error) {
    console.error('Error sending email with EmailJS:', error);
    throw error;
  }
};

export const BookingForm = () => {
  const [isRefining, setIsRefining] = useState(false);
  const [refinementError, setRefinementError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const form = useForm<BookingFormData>({
    defaultValues: {
      fullName: "",
      age: "",
      email: "",
      phone: "",
      doctorPreference: "",
      problem: "",
    }
  });

  // Watch the problem field to enable/disable the button reactively
  const problemText = form.watch("problem");

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(null);
      
      // Format doctor preference to make it readable (if it's in kebab-case)
      const formattedData = {
        ...data,
        doctorPreference: data.doctorPreference.replace(/-/g, ' ')
          .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
      };
      
      // Send data to Google Sheets directly
      await submitToGoogleSheets(formattedData);
      
      // Send email notification
      try {
        await sendEmail(data);
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email, but form data was saved:', emailError);
        // Continue with success flow even if email fails - data is already saved to sheets
      }
      
      // Show success message and reset form
      setSubmitSuccess('Appointment booked successfully! We will contact you shortly.');
      form.reset();
      
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
          <div className="p-4 sm:p-6 md:p-8 rounded-bl-xl rounded-br-xl lg:rounded-bl-none lg:rounded-tr-xl bg-[#B5E7FF]/40">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-8">
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
                  <Input 
                    placeholder="Phone Number" 
                    className="bg-white h-12 md:h-14 rounded-xl text-base" 
                    {...form.register("phone")}
                    required
                  />
                </div>
                
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
                    <option value="dr-jawahar-shah">Dr. Jawahar Shah</option>
                    <option value="dr-rita-maity">Dr. Rita Maity</option>
                    <option value="dr-bhavna-ahuja">Dr. Bhavna Ahuja</option>
                    <option value="dr-nida-qazi">Dr. Nida Qazi</option>
                  </select>
                </div>
                
                <div className="relative">
                  <Textarea 
                    placeholder="Explain your symptoms or health concerns (click 'Refine with AI' to improve your description)" 
                    className="bg-white min-h-[120px] sm:min-h-[150px] md:min-h-[180px] rounded-xl text-base resize-none p-3 md:p-4" 
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
                  disabled={isSubmitting}
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