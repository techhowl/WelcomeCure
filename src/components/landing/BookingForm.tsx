import React from "react";
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
import { ChevronDown } from "lucide-react";
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

export const BookingForm = () => {
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

  const onSubmit = (data: BookingFormData) => {
    console.log(data);
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
                
                <Textarea 
                  placeholder="Problem" 
                  className="bg-white min-h-[120px] sm:min-h-[150px] md:min-h-[180px] rounded-xl text-base resize-none p-3 md:p-4" 
                  {...form.register("problem")}
                />
                
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

