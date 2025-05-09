import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Is Homeopathy a proven science?",
    answer:
      "It definitely is. Homeopathy is a science based on sound logic and vast experimental data. It is the only medical science where data has been collected by proving on healthy human beings and not on animals because human beings can communicate their actual feelings during the testing while animals cannot. The principles of Homeopathy have been derived and authenticated by vast clinical experiments and data. The homeopathic pharmacopoeia lists more than 3000 remedies, whose clinical efficiency has been proved in various clinical trials conducted all over the world.",
  },
  {
    question: "Are homeopathic medicines just sugar pills?",
    answer:
      "No. The pills of Homeopathic medicines are made from sugar but they work only as vehicles. Actual liquid medicine prepared from various natural medicinal substances is poured over the pills and dispensed as medications. Homeopathic medicines are also available in liquid form or tinctures, which can be administered directly or by diluting them in water whenever required.",
  },
  {
    question: "Are there any side effects of homeopathic medicines?",
    answer:
      "No, there are no side effects of homeopathic medicines. Sometimes you may get a cold, skin rash or little discharge after taking homeopathic medicines. This means that the system is getting cleared. In the same way, your old symptoms like constipation, warts or any skin rash may reappear. Do not take any medicine to treat these reappearing old symptoms, as these old symptoms will go away in a short while and you will be healed for a long-lasting period of time.",
  },
  {
    question:
      "What are the different modes of online communication between the patient and the physician on WelcomeCure?",
    answer:
      "To make communication simple and time-saving, we have created a Profile Dashboard for every patient who registers with us. Through this dashboard, patients can submit queries or send their case history. Apart from this, patients can also request the portal admin to arrange for a meeting with their Doctor through Chat or Skype.",
  },
  {
    question: "What are the advantages of online homeopathic treatment over physically visiting a doctor?",
    answer:
      "You can save your valuable time with online health consultation.You no longer need to take time out of your busy schedule and wait for your doctor’s appointment, long queues in the clinic, and waste time on travelling to reach your doctor.",
  },
  {
    question: "What is the minimum age for patient registration?",
    answer:
      "There is no minimum age requirement to register for WelcomeCure. But, if the patient is a child, a differently abled person, or someone who is not internet-savvy, then a parent or guardian can register on their behalf.",
  },
  {
    question: "Can I register on behalf of my child or elderly parents/relatives?",
    answer:
      "Yes, you can register on behalf of your child or elderly parents/relatives. Make sure all the data you provide in the patient profile and other medical records is accurate.",
  },
  {
    question: "Can I choose my own physician or the system will assign one to me on registration?",
    answer:
      "You have the benefit of choosing your own Expert. If you are not sure or feel confused, the portal will recommend an Expert to you based on your disease condition.",
  },
  {
    question: "How will the medicine/s be dispensed to me?",
    answer:
      "After your Expert physician forwards your prescription, our Delivery department will take charge of dispensing and sending the medicine to you. Our Delivery Department has people who are well-trained and skilled in the task of dispensing medicines. We follow the utmost precautions while doing so and all our medicines are of superlative quality.",
  },
  {
    question: "How will you help me if the treatment does not work?",
    answer:
      "Your Expert will review your case again, and we will dispatch fresh medicines free of cost. If necessary, we will forward your case history for a Panel Consult.",
  },
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const handleToggle = (itemValue: string) => {
    setOpenItems(prevState => {
      // If the item is already open, close it
      if (prevState[itemValue]) {
        const newState = {...prevState};
        delete newState[itemValue];
        return newState;
      }
      
      // Otherwise, open it
      return {
        ...prevState,
        [itemValue]: true
      };
    });
  };

  return (
    <section className="w-full py-6">
      <div className="max-w-[900px]  mx-auto px-5">
        <h2 className="text-[#1a1a1a] text-5xl font-bold text-center mb-16 max-md:text-4xl max-md:mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => {
            const itemValue = `item-${index}`;
            const isOpen = Boolean(openItems[itemValue]);
            
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-[0px_4px_15px_0px_rgba(8,15,52,0.06)] transition-all duration-200 ${isOpen ? 'shadow-lg' : ''}`}
              >
                <div className="w-full">
                  <button 
                    onClick={() => handleToggle(itemValue)}
                    className="flex w-full justify-between items-center p-5 text-left hover:no-underline"
                  >
                    <span className="font-normal text-lg text-[#1a1a1a]">{item.question}</span>
                    <div className={`w-10 h-10 min-w-[2.5rem] bg-[#FBDC00] rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown className="h-5 w-5 text-black" />
                    </div>
                  </button>
                  
                  <div className={`p-5 pt-1 text-base text-[#1a1a1a]/80 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0 opacity-0 py-0'}`}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
