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
    question: "How will homeopathy help me with my sleep disorder?",
    answer:
      "Homeopathy offers a natural and holistic approach to treating sleep disorders by addressing the root cause rather than just the symptoms. The treatment is personalized based on your specific condition and overall health profile.",
  },
  {
    question: "How do I know if I have a sleep disorder or not?",
    answer:
      "Common signs include difficulty falling asleep, frequent waking during the night, daytime fatigue, and loud snoring. Our experts can help evaluate your symptoms and provide a proper diagnosis.",
  },
  {
    question: "How long is the homeopathic course?",
    answer:
      "The duration of treatment varies depending on the severity and nature of your sleep disorder. Our doctors will provide a detailed treatment timeline after your initial consultation.",
  },
  {
    question:
      "Are the homeopathic doctors at Welcome Cure qualified/certified?",
    answer:
      "Yes, all our doctors are highly qualified and certified homeopathic practitioners with years of experience in treating sleep disorders and other chronic conditions.",
  },
  {
    question: "Will I face any side effects during my course?",
    answer:
      "Homeopathic treatments are generally safe with minimal to no side effects. Our medicines are natural and work gently with your body's healing mechanisms.",
  },
  {
    question: "Why should I choose Welcome Cure?",
    answer:
      "We offer expert-backed, personalized treatment plans, experienced doctors, and a proven track record of helping patients overcome sleep disorders naturally.",
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
