<template>
  <div class="whatsapp-container">
    <!-- Floating Bubble -->
    <div class="whatsapp-bubble" @click="toggleChat">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        class="w-12 h-12"
      />
    </div>

    <!-- Chat Box -->
    <transition name="slide-fade">
      <div v-if="chatOpen" class="chat-box">
        <!-- Header -->
        <div class="chat-header">
          <span>Chat with Vendor</span>
          <button class="close-btn" @click="toggleChat">&times;</button>
        </div>

        <!-- Chat Body -->
        <div class="chat-body" ref="chatBody">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.type]"
          >
            {{ msg.text }}
          </div>
        </div>

        <!-- Chat Footer -->
        <div class="chat-footer">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const chatOpen = ref(false);
const inputMessage = ref("");
const messages = ref([
  { type: "vendor", text: "Hi! How can we help you today?" },
]);

const vendorNumber = "2347069386058"; // Replace with actual vendor number

const chatBody = ref(null);

function toggleChat() {
  chatOpen.value = !chatOpen.value;
  if (chatOpen.value) {
    nextTick(() => scrollToBottom());
  }
}

function sendMessage() {
  if (!inputMessage.value.trim()) return;

  // Add user's message to the chat
  messages.value.push({ type: "user", text: inputMessage.value });
  nextTick(() => scrollToBottom());

  // Open WhatsApp with all messages
  const allMessages = messages.value
    .map((m) => `${m.type === "user" ? "You: " : ""}${m.text}`)
    .join("\n");
  const url = `https://wa.me/${vendorNumber}?text=${encodeURIComponent(
    allMessages
  )}`;
  window.open(url, "_blank");

  inputMessage.value = "";
}

function scrollToBottom() {
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
}
</script>

<style scoped>
.whatsapp-container {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 10000;
}

/* Floating Bubble */
.whatsapp-bubble {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.whatsapp-bubble:hover {
  transform: scale(1.1);
}

/* Chat Box */
.chat-box {
  width: 300px;
  max-height: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 10px;
}

/* Header */
.chat-header {
  background-color: #25d366;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

/* Chat Body */
.chat-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f5f5f5;
}
.message {
  max-width: 80%;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  word-wrap: break-word;
}
.message.user {
  background-color: #dcf8c6;
  align-self: flex-end;
}
.message.vendor {
  background-color: #fff;
  align-self: flex-start;
  border: 1px solid #ddd;
}

/* Footer */
.chat-footer {
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
}
.chat-footer input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
}
.chat-footer button {
  background-color: #25d366;
  color: white;
  border: none;
  padding: 6px 12px;
  margin-left: 5px;
  border-radius: 20px;
  cursor: pointer;
}

/* Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
