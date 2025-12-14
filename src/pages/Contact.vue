<template>
  <div class="min-h-screen w-full py-10">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">

      <!-- LEFT: Contact Form -->
      <div class="bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-2xl font-semibold mb-6">Contact Us</h2>

        <form @submit.prevent="submitForm" class="space-y-4">

          <div>
            <label class="block mb-1 font-medium">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">Message</label>
            <textarea
              v-model="form.message"
              rows="5"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>

        </form>
      </div>

      <!-- RIGHT: Map -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Our Location</h2>

        <div class="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            class="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9934.24487319536!2d-0.13682773109060875!3d51.502919052199076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c7b764c501%3A0x61a09eaf07649a32!2sLondon%20Eye%20River%20Cruise!5e0!3m2!1sen!2sng!4v1765465769058!5m2!1sen!2sng"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { toast } from "../stores/toast.js";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const submitForm = () => {
  console.log("Form submitted:", form);
  toast.show("Your message has been sent successfully!", "success");
};
</script>
