import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Sparkles } from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface BookingFormData {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  doctorPreference: string;
  problem: string;
}

const callGeminiAPI = async (text: string): Promise<string> => {
  // Your Gemini API key (Note: Store this securely in production, e.g., in environment variables)
  const GEMINI_API_KEY = "AIzaSyCJk0564e6SKLC8D0NT2chWdxfWJu6E-JE";

  try {
    console.log('Calling Gemini API to enhance text...');

    // Using the correct endpoint for Gemini API with proper API key interpolation
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

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    // Parse the response
    const data = await response.json();

    // Extract the enhanced text from the response
    const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!enhancedText) {
      throw new Error('No enhanced text returned from Gemini API');
    }

    return enhancedText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const BookingForm = () => {
  const [isRefining, setIsRefining] = useState(false);
  const [refinementError, setRefinementError] = useState<string | null>(null);
  
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

  const onSubmit = (data: BookingFormData) => {
    console.log(data);
  };
  
  const handleRefineProblem = async () => {
    const currentProblem = form.getValues("problem");
    
    if (!currentProblem.trim()) {
      // Don't refine empty text
      return;
    }
    
    setIsRefining(true);
    setRefinementError(null); // Clear any previous errors
    
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
    <section className="bg-[#B5E7FF] w-full py-8 md:py-12">
      <div className="container mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Left side with sleeping person image and text */}
          <div className="relative w-full lg:h-full overflow-hidden rounded-xl md:rounded-xl">
            <img
              src="/assets/form.png"
              alt="Person with sleep disorder"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white">
                <h3 className="text-xl sm:text-2xl font-normal mb-2 md:mb-2">
                  Don't sleep on potential sleep disorders.
                </h3>
                <p className="text-2xl sm:text-3xl md:text-3xl font-bold">
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
                  />
                  <Input 
                    placeholder="Phone Number" 
                    className="bg-white h-12 md:h-14 rounded-xl text-base" 
                    {...form.register("phone")}
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#FBDC00] hover:bg-[#FBDC00]/90 text-black font-semibold text-base md:text-lg h-12 md:h-14 rounded-xl"
                >
                  Book your appointment
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

// added code 

