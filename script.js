const elements = {
  photoGrid: document.getElementById("photoGrid"),
  uploadModal: document.getElementById("uploadModal"),
  addPhotoButton: document.getElementById("addPhotoBtn"),
  closeButton: document.querySelector(".close"),
  uploadForm: document.getElementById("uploadForm"),
  toast: document.getElementById("toast"),
  nameInput: document.getElementById("name"),
  fileInput: document.getElementById("file"),
};

const config = {
  apiUrl: "http://localhost:4000/pictures",
  placeholderImage: "path/to/placeholder.png", // Adicione o caminho para uma imagem placeholder
};

function showNotification(message, type = "success") {
  const { toast } = elements;
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 3000);
}

async function fetchPhotos() {
  try {
    const response = await fetch(config.apiUrl);
    if (!response.ok) {
      throw new Error(`Erro na requisição: status ${response.status}`);
    }
    const data = await response.json();
    return data.pictures || [];
  } catch (error) {
    console.error("Falha ao carregar fotos", error);
    showNotification("Falha ao carregar fotos", "error");
    return [];
  }
}

function renderPhotoGrid(photos) {
  const { photoGrid } = elements;
  photoGrid.innerHTML = "";
  if (photos.length === 0) {
    photoGrid.innerHTML = '<p class="no-photos">Nenhuma foto encontrada</p>';
    return;
  }
  photos.forEach((photo) => {
    const photoCard = createPhotoCardElement(photo);
    photoGrid.appendChild(photoCard);
  });
}

function createPhotoCardElement(photo) {
  const card = document.createElement("div");
  card.className = "photo-card";
  const imageUrl = `${config.apiUrl}/${photo._id}/image`;
  card.innerHTML = `
    <img src="${imageUrl}" alt="${photo.name}" onerror="this.onerror=null; this.src='${config.placeholderImage}'">
    <div class="photo-info">
      <div class="photo-name">${photo.name}</div>
      <button class="btn-delete" data-id="${photo._id}">Excluir</button>
    </div>
  `;
  card.querySelector(".btn-delete").addEventListener("click", async () => {
    await deletePhoto(photo._id);
  });
  return card;
}

async function deletePhoto(photoId) {
  try {
    const response = await fetch(`${config.apiUrl}/${photoId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Falha ao excluir a foto");
    }
    showNotification("Foto excluída com sucesso!");
    loadAndDisplayPhotos();
  } catch (error) {
    console.error("Erro ao excluir foto:", error);
    showNotification("Falha ao excluir foto", "error");
  }
}

async function uploadNewPhoto(formData) {
  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Falha no upload da foto");
    }
    showNotification("Foto enviada com sucesso!");
    closeUploadModal();
    elements.uploadForm.reset();
    loadAndDisplayPhotos();
  } catch (error) {
    console.error("Erro no upload:", error);
    showNotification("Falha ao enviar foto", "error");
  }
}

function openUploadModal() {
  elements.uploadModal.style.display = "block";
}

function closeUploadModal() {
  elements.uploadModal.style.display = "none";
}

function handleOutsideClick(event) {
  if (event.target === elements.uploadModal) {
    closeUploadModal();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append("name", elements.nameInput.value);
  formData.append("file", elements.fileInput.files[0]);
  uploadNewPhoto(formData);
}

function setupEventListeners() {
  elements.addPhotoButton.addEventListener("click", openUploadModal);
  elements.closeButton.addEventListener("click", closeUploadModal);
  window.addEventListener("click", handleOutsideClick);
  elements.uploadForm.addEventListener("submit", handleFormSubmit);
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadAndDisplayPhotos();
});
