<template>
  <div class="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-[#6A2E18] mb-8 text-center">
      Frequently Asked Questions
    </h2>

    <div v-for="(item, index) in faqs" :key="index" class="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <button
        @click="toggle(index)"
        class="w-full flex justify-between items-center px-4 py-3 bg-[#F7EDE5] hover:bg-[#eaddda] text-left focus:outline-none"
      >
        <span class="font-medium text-[#6A2E18]">{{ item.question }}</span>
        <svg
          :class="{ 'rotate-180': openIndex === index }"
          class="w-5 h-5 text-[#6A2E18] transition-transform duration-300"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div
        v-show="openIndex === index"
        class="px-4 py-3 bg-white text-gray-700"
      >
        <p v-for="line in item.answer" :key="line" class="mb-2">{{ line }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "FaqAccordion",
  setup() {
    const openIndex = ref(null);

    const toggle = (index) => {
      openIndex.value = openIndex.value === index ? null : index;
    };

    const faqs = [
      {
        question: "Where do you ship to?",
        answer: [
          "We offer global shipping! Our primary location is in the UK, but we ship to most countries around the world.",
          "Delivery times and shipping costs will vary depending on your location."
        ]
      },
      {
        question: "How long will my order take to arrive?",
        answer: [
          "Delivery times depend on your location and shipping method.",
          "Orders within the UK typically arrive in 3–7 business days, while international orders may take 7–21 business days."
        ]
      },
      {
        question: "How much does it cost to ship orders?",
        answer: [
          "Shipping costs depend on your location and the size/weight of your order.",
          "You can see the exact shipping fee at checkout before you place your order."
        ]
      },
      {
        question: "Can I track my order?",
        answer: ["Yes! Once your order ships, you will receive a tracking number via email to follow its progress."]
      },
      {
        question: "Do you offer express shipping?",
        answer: ["Yes, express shipping is available at an additional cost. The option will appear during checkout if available for your location."]
      },
      {
        question: "What is your return policy?",
        answer: [
          "UK Returns: Acceptable within 7 days of receiving your order. Items must be unused and in original packaging.",
          "International Returns: Acceptable within 14 days. You are responsible for return shipping costs."
        ]
      },
      {
        question: "Do you offer custom wigs?",
        answer: [
          "Yes! Custom wigs are tailored to your specific needs.",
          "You can choose hair type, color, length, texture, and style."
        ]
      },
      {
        question: "How do I place a custom order?",
        answer: ["Contact us via our website or email with your specifications, and we’ll guide you through the process."]
      },
      {
        question: "Can I return or exchange a custom wig?",
        answer: ["Custom wigs cannot be returned or exchanged unless they are defective or damaged upon arrival."]
      },
      {
        question: "What payment methods do you accept?",
        answer: [
          "Credit/Debit Cards: Visa, MasterCard, American Express, etc.",
          "PayPal: Secure checkout via PayPal.",
          "Apple Pay / Google Pay: For mobile payment convenience.",
          "Klarna: Pay in 3 interest-free installments."
        ]
      },
      {
        question: "Is it safe to shop on your website?",
        answer: ["Absolutely! We use secure encryption and trusted payment providers to protect your data."]
      }
    ];

    return { faqs, openIndex, toggle };
  }
};
</script>

<style scoped>
/* optional smooth slide down effect */
[v-cloak] > * { display:none; }
[v-cloak]::before { content: "loading…"; }
</style>
