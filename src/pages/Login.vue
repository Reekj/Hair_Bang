<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const API_URL = "https://wig-api.onrender.com/api/auth/login";

async function handleLogin() {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    // If server responds with an error status
    if (!res.ok) {
      const errText = await res.text();
      alert("Login failed: " + errText);
      return;
    }

    // Fast JSON parsing
    const data = await res.json();

    // Store token
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    // Quick redirect
    router.push("/");
  } catch (error) {
    alert("Network error. Please try again.");
  }
}
</script>
