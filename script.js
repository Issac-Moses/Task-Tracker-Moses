const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const inputType = document.querySelector("#input-type");
const exportFormat = document.querySelector("#export-format");
const youtubeInput = document.querySelector("#youtube-link");
const fileInput = document.querySelector("#audio-file");

const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const deleteChatsBtn = document.querySelector("#delete-chats-btn");

const BACKEND_URL = "http://127.0.0.1:5000/summarize";

// Handle UI toggle based on input type
inputType.addEventListener("change", () => {
  youtubeInput.style.display = inputType.value === "youtube" ? "block" : "none";
  fileInput.style.display = inputType.value === "file" ? "block" : "none";
});

// Display chat-style summary blocks
function showResultBlock(title, content, type = "bot-message") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);
  messageDiv.innerHTML = `
    <img class="avatar" src="frenzy.svg" />
    <div class="message-text"><strong>${title}</strong><br><br>${content}</div>
  `;
  chatsContainer.appendChild(messageDiv);
  document.body.classList.add("chats-active");
  setTimeout(() => {
    messageDiv.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 100);
}

// Submit to backend
promptForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  chatsContainer.innerHTML = ""; // Clear previous

  const selected = inputType.value;
  const format = exportFormat.value;
  const youtubeURL = youtubeInput.value;
  const file = fileInput.files[0];

  if (!selected || !format) {
    alert("Please select input type and export format.");
    return;
  }

  if (selected === "youtube" && !youtubeURL.trim()) {
    alert("Enter a valid YouTube URL.");
    return;
  }

  if (selected === "file" && !file) {
    alert("Upload a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("input_type", selected);
  formData.append("export_format", format);

  if (selected === "file") {
    formData.append("file", file);
  } else if (selected === "youtube") {
    formData.append("youtube_url", youtubeURL);
  } else if (selected === "mic") {
    formData.append("duration", "60");
  }

  showResultBlock("🔄 Processing Input...", "Please wait...");

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    chatsContainer.innerHTML = "";

    if (data.error) {
      showResultBlock("❌ Error", data.error);
    } else {
      showResultBlock("📜 Overall Summary", data.overall_summary);
      showResultBlock("📄 Overview", data.overview);
      showResultBlock("📌 Key Points", data.keypoints);
      showResultBlock("⬇️ Export", `File saved as: <code>${data.output_file}</code>`);
    }
  } catch (err) {
    chatsContainer.innerHTML = "";
    showResultBlock("❌ Server Error", err.message || "Failed to connect to backend.");
  }
});

// Theme toggle
themeToggleBtn.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("themeColor", isLight ? "light_mode" : "dark_mode");
  themeToggleBtn.textContent = isLight ? "dark_mode" : "light_mode";
});

// Delete chats
deleteChatsBtn.addEventListener("click", () => {
  chatsContainer.innerHTML = "";
  document.body.classList.remove("chats-active");
});
