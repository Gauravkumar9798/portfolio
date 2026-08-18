const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

// AI Assistant Chatbot Functionality
const assistantForm = document.getElementById("assistantForm");
const userQueryInput = document.getElementById("userQuery");
const chatMessagesContainer = document.getElementById("chatMessages");

if (assistantForm) {
  assistantForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const userMessage = userQueryInput.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    const userMessageEl = document.createElement("div");
    userMessageEl.className = "message user-message";
    userMessageEl.innerHTML = `<p>${userMessage}</p>`;
    chatMessagesContainer.appendChild(userMessageEl);
    userQueryInput.value = "";
    
    // Scroll to bottom
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Add bot response
    const botMessageEl = document.createElement("div");
    botMessageEl.className = "message bot-message";
    botMessageEl.innerHTML = `<p>✓ Thank you for your message! I've received your query and Gaurav will get back to you shortly via email.</p>`;
    chatMessagesContainer.appendChild(botMessageEl);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Send email via FormSubmit
    try {
      const formData = new FormData();
      formData.append("email", "gauravkumarbhagat9798@gmail.com");
      formData.append("subject", "New Query from Portfolio AI Assistant");
      formData.append("message", userMessage);
      formData.append("_captcha", "false");

      await fetch("https://formsubmit.co/gauravkumarbhagat9798@gmail.com", {
        method: "POST",
        body: formData
      });
    } catch (error) {
      console.log("Message sent to chat (email service may need manual setup)");
    }
  });
}

