// ===== Dummy Data Kandidat =====
const candidates = [
  { id: 1, name: "<span class='kandidat'>Kandidat 1</span> <br><br> Ketua : Andi <br> Wakil : Dafa", desc: "Visi: Bersih, Tertib, Kreatif" },
  { id: 2, name: "<span style='font-size : 30px'>Kandidat 2</span> <br><br> Ketua : Siti <br> Wakil : Lina", desc: "Visi: Inovasi dan Keterlibatan" },
  { id: 3, name: "<span style='font-size : 30px'>Kandidat 3</span> <br><br> Ketua : Budi <br> Wakil : Adi", desc: "Visi: Ramah dan Profesional" }
];

// ===== Element =====
const loginCard = document.getElementById("login-card");
const otpSection = document.getElementById("otp-section");
const votingSection = document.getElementById("voting-section");
const candidatesContainer = document.getElementById("candidates");
const messageBox = document.getElementById("message");

// ===== Login + OTP Dummy =====
function sendOTP() {
  const email = document.getElementById("email-input").value;

  if (!email.includes("@")) {
    alert("Masukkan email valid!");
    return;
  }

  // simulasi kirim OTP
  localStorage.setItem("otp", "1");
  otpSection.style.display = "block";
  alert("Kode OTP dikirim ke "+email+"! (demo: 1)");
}

function verifyOTP() {
  const otpInput = document.getElementById("otp-input").value;
  const realOTP = localStorage.getItem("otp");

  if (otpInput === realOTP) {
    alert("Login berhasil!");
    loginCard.style.display = "none";
    votingSection.style.display = "block";
    renderCandidates();
  } else {
    alert("OTP salah!");
  }
}

// ===== Voting System =====
const votedKey = "user_vote";

function renderCandidates() {
  const voted = localStorage.getItem(votedKey);
  candidatesContainer.innerHTML = "";

  candidates.forEach(c => {
    const div = document.createElement("div");
    div.className = "candidate-card";
    div.innerHTML = `
      <div class="candidate-info">
        <strong>${c.name}</strong>
        <p>${c.desc}</p>
      </div>
      <button ${voted ? "disabled" : ""} onclick="vote(${c.id})">
        ${voted == c.id ? "Dipilih ✓" : voted ? "Terkunci" : "Pilih"}
      </button>
    `;
    candidatesContainer.appendChild(div);
  });

  if (voted) {
    messageBox.innerText = "Anda sudah memilih. Terima kasih!";
  }
}

function vote(id) {
  if (!confirm("Yakin memilih kandidat ini?")) return;

  // simpan ke localStorage (di backend nanti disimpan ke DB)
  localStorage.setItem(votedKey, id);

  // refresh tampilan
  renderCandidates();
}