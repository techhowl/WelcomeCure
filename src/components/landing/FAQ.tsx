import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section className="w-full max-w-[896px] mx-auto">
      <h2 className="text-[rgba(26,26,26,1)] text-5xl font-bold leading-none text-center mb-8 max-md:max-w-full max-md:text-[40px]">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="shadow-[0px_5px_16px_0px_rgba(8,15,52,0.06)] bg-white text-lg text-[rgba(26,26,26,1)] font-normal px-[55px] py-[15px] rounded-[15px] max-md:px-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-[55px] py-4 text-[rgba(26,26,26,1)]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
