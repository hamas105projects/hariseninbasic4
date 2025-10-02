document.addEventListener("DOMContentLoaded", () => {
  const currentDate = document.getElementById("currentDate");
  const today = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  currentDate.textContent = `📅 ${today.toLocaleDateString("id-ID", options)}`;

  const taskForm = document.getElementById("todoForm");
  const taskInput = document.getElementById("taskInput");
  const receiveDateInput = document.getElementById("receiveDate");
  const deadlineDateInput = document.getElementById("deadlineDate");
  const taskBody = document.getElementById("taskBody");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const showFinishedBtn = document.getElementById("showFinishedBtn");
  const finishedSection = document.getElementById("finishedSection");
  const finishedList = finishedSection.querySelector(".finished-list");

  let selectedPriority = "";

  // Prioritas tombol
  document.querySelectorAll("#priorityButtons button").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      selectedPriority = btn.textContent;
      document.querySelectorAll("#priorityButtons button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Submit form
  taskForm.addEventListener("submit", e => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const receiveDate = receiveDateInput.value;
    const deadlineDate = deadlineDateInput.value;

    if (!taskText) {
      alert("⚠️ Tugas tidak boleh kosong. Silakan isi terlebih dahulu.");
      return;
    }

    if (!receiveDate) {
      alert("⚠️ Tanggal terima harus diisi.");
      return;
    }

    if (!deadlineDate) {
      alert("⚠️ Deadline harus diisi.");
      return;
    }

    if (!selectedPriority) {
      alert("⚠️ Silakan pilih prioritas tugas terlebih dahulu.");
      return;
    }

    if (new Date(deadlineDate) < new Date(receiveDate)) {
      alert("⚠️ Deadline tidak boleh lebih awal dari tanggal terima.");
      return;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${taskBody.rows.length + 1}</td>
      <td>${taskText}</td>
      <td>${new Date(receiveDate).toLocaleDateString("id-ID", options)}</td>
      <td>${new Date(deadlineDate).toLocaleDateString("id-ID", options)}</td>
      <td><span class="${selectedPriority.toLowerCase()}">${selectedPriority}</span></td>
      <td>
        <div class="btn-group">
          <button class="btn btn-check">✔️</button>
          <button class="btn btn-delete">🗑️</button>
        </div>
      </td>
    `;
    taskBody.appendChild(row);

    // Reset form
    taskInput.value = "";
    receiveDateInput.value = "";
    deadlineDateInput.value = "";
    selectedPriority = "";
    document.querySelectorAll("#priorityButtons button").forEach(b => b.classList.remove("active"));
  });

  // Aksi tombol ✔️ dan 🗑️
  taskBody.addEventListener("click", e => {
    if (e.target.classList.contains("btn-check")) {
      const row = e.target.closest("tr");
      row.classList.add("completed");
      const taskText = row.children[1].textContent;
      const item = document.createElement("li");
      item.className = "finished-item";
      item.textContent = taskText;
      finishedList.appendChild(item);
    }
    if (e.target.classList.contains("btn-delete")) {
      const row = e.target.closest("tr");
      row.remove();
    }
  });

  // Hapus semua tugas
  clearAllBtn.addEventListener("click", () => {
    taskBody.innerHTML = "";
  });

  // Tampilkan/semmbunyikan panel selesai
  showFinishedBtn.addEventListener("click", () => {
    finishedSection.classList.toggle("show");
  });
});