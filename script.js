// ===== Dummy Data Kandidat + FOTO =====
const candidates = [
  { id: 1, candidate:"Kandidat 1", name: "Ketua : Acha Arfiani<br>Wakil     : Erli Maulidia", desc: "Visi: Bersih, Tertib, Kreatif", photo: "img/1.png" },
  { id: 2, candidate:"Kandidat 2",name: "Ketua  : Dwi Maulana<br>Wakil     : Husni Mubarok", desc: "Visi: Inovasi dan Keterlibatan", photo: "img/2.png" },
  { id: 3, candidate:"Kandidat 3",name: "Ketua  : Wahyu Saputra<br>Wakil     : Akbar Maulana", desc: "Visi: Ramah dan Profesional", photo: "img/3.png" },
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

  localStorage.setItem("otp", "123456");
  otpSection.style.display = "block";
  alert("Kode OTP dikirim ke "+email+" (demo: 123456)");
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
	<strong><p class="kandidat_nama">${c.candidate}</p></strong>
  <img src="${c.photo}" class="candidate-photo">

  <div class="candidate-info">
  
    <strong><center>${c.name}</center></strong>
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

  localStorage.setItem(votedKey, id);
  renderCandidates();
}

// ===== Hasil Voting =====
function showResults() {
  const resultsModal = document.getElementById("results-modal");
  const resultsList = document.getElementById("results-list");

  let counts = { 1: 17, 2: 40, 3: 5 };
  const voted = localStorage.getItem(votedKey);

  if (voted) counts[voted]++;

  const total = counts[1] + counts[2] + counts[3];

  resultsList.innerHTML = candidates.map(c => {
    const percent = total ? ((counts[c.id] / total) * 100).toFixed(1) : 0;

    return `
      <p><strong>${c.candidate}</strong>: ${percent}%</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
    `;
  }).join("");

  resultsModal.style.display = "block";
}

function closeResults() {
  document.getElementById("results-modal").style.display = "none";
}