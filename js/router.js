let pageUrls = {
  about: "/index.html?about",
  contact: "/index.html?contact",
  gallery: "/index.html?gallery",
};

// Funkcja uruchamiana podczas startu aplikacji
function OnStartUp() {
  popStateHandler();
}
OnStartUp();

// Obsługa kliknięcia w link "About"
document.querySelector("#about-link").addEventListener("click", () => {
  let stateObj = { page: "about" };
  document.title = "About";
  history.pushState(stateObj, "about", "?about");
  RenderAboutPage();
});

// Obsługa kliknięcia w link "Contact"
document.querySelector("#contact-link").addEventListener("click", () => {
  let stateObj = { page: "contact" };
  document.title = "Contact";
  history.pushState(stateObj, "contact", "?contact");
  RenderContactPage();
});

// Obsługa kliknięcia w link "Gallery"
document.querySelector("#gallery-link").addEventListener("click", () => {
  let stateObj = { page: "gallery" };
  document.title = "Gallery";
  history.pushState(stateObj, "gallery", "?gallery");
  RenderGalleryPage();
});

// Funkcja renderująca stronę "About"
function RenderAboutPage() {
  document.querySelector("main").innerHTML = `
        <h1 class="title">About Me</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

// Funkcja renderująca stronę "Contact" z formularzem
function RenderContactPage() {
  document.querySelector("main").innerHTML = `
        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <span class="error-message" id="name-error"></span>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <span class="error-message" id="email-error"></span>

            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <span class="error-message" id="message-error"></span>

            <div class="captcha-container">
                <label for="captcha">Enter the number shown:</label>
                <div id="captcha-code"></div>
                <input type="text" id="captcha" name="captcha" required>
                <span class="error-message" id="captcha-error"></span>
            </div>

            <button type="submit">Send</button>
        </form>`;

  setupCaptcha();

  document
    .getElementById("contact-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      if (validateForm()) {
        alert("Form submitted successfully!");
      }
    });
}

function validateForm() {
  let isValid = true;

  // Walidacja pola "Name"
  const name = document.getElementById("name").value.trim();
  if (!name) {
    document.getElementById("name-error").textContent = "Name is required.";
    isValid = false;
  } else {
    document.getElementById("name-error").textContent = "";
  }

  // Walidacja pola "Email"
  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    document.getElementById("email-error").textContent =
      "Valid email is required.";
    isValid = false;
  } else {
    document.getElementById("email-error").textContent = "";
  }

  // Walidacja pola "Message"
  const message = document.getElementById("message").value.trim();
  if (!message) {
    document.getElementById("message-error").textContent =
      "Message is required.";
    isValid = false;
  } else {
    document.getElementById("message-error").textContent = "";
  }

  // Walidacja CAPTCHA
  const captcha = document.getElementById("captcha").value.trim();
  const captchaCode = document
    .getElementById("captcha-code")
    .textContent.trim();
  if (!captcha || captcha !== captchaCode) {
    document.getElementById("captcha-error").textContent =
      "Captcha is incorrect.";
    isValid = false;
  } else {
    document.getElementById("captcha-error").textContent = "";
  }

  return isValid;
}
function setupCaptcha() {
  const captchaCode = Math.floor(1000 + Math.random() * 9000).toString(); // Losowy kod 4-cyfrowy
  document.getElementById("captcha-code").textContent = captchaCode;
}

// Funkcja renderująca stronę "Gallery"
function RenderGalleryPage() {
  document.querySelector("main").innerHTML = `
        <h1 class="title">Gallery</h1>
        <div id="gallery" class="gallery-container"></div>
        <div id="modal" class="modal hidden">
            <span id="close-modal">&times;</span>
            <img id="modal-image" class="modal-content" src="" alt="Image preview">
        </div>`;

  LoadGalleryImages();

  // Obsługa zamykania modalu
  const modal = document.getElementById("modal");
  document
    .getElementById("close-modal")
    .addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.add("hidden");
  });
}

// Funkcja asynchronicznego ładowania obrazów
async function LoadGalleryImages() {
  const gallery = document.getElementById("gallery");

  // Array of provided image URLs
  const imageUrls = [
    "https://manorhousedental.com/wp-content/uploads/2023/04/leaf-plate-wood-object-healthy-eating-1024x1024.jpg",
    "https://files.nccih.nih.gov/green-tea-steven-foster-square.jpg",
    "https://image.ceneostatic.pl/data/products/1485302/c1a52848-09f5-494b-9e5e-d671f78e87f0_i-elizabeth-arden-green-tea-tropical-woman-woda-toaletowa-100ml.jpg",
    "https://sklep.adalberts.pl/cdn/shop/files/moroccan-mint-110g-2_1.jpg?v=1700142003&width=700",
    "https://www.netmeds.com/images/cms/wysiwyg/blog/2019/11/Best_Tea_big_898.jpg",
    "https://www.byrdie.com/thmb/X4Qq09lJuYzXD8Sfr9PG6HVKU9I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Green-Tea-for-Skin-2124-1x1-hires-d7126fe4a84346efbbc553c00a9038fa.jpg",
    "https://www.traditionalmedicinals.com/cdn/shop/files/TM_PDP_GreenTeaMatcha_square_01_448x448.jpg?v=1728575238",
    "https://cdn.shopify.com/s/files/1/0533/6743/9558/t/5/assets/pf-63c3773c--brandcontent5.jpg?v=1622037071",
    "https://thetea.pl/wp-content/uploads/2024/04/IMG_8881-600x600.jpg",
  ];

  imageUrls.forEach((url, index) => {
    const img = document.createElement("img");
    img.classList.add("thumbnail", "lazy");
    img.dataset.src = url; // Lazy loading source
    gallery.appendChild(img);

    // Click event to open modal with high-resolution image
    img.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      const modalImage = document.getElementById("modal-image");
      modalImage.src = url; // Use the same URL for modal
      modal.classList.remove("hidden");
    });
  });

  LazyLoadImages();
}

// Lazy loading obrazów
function LazyLoadImages() {
  const lazyImages = document.querySelectorAll("img.lazy");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => observer.observe(img));
}

// Funkcja obsługująca zmianę stanu historii przeglądarki
function popStateHandler() {
  let loc = window.location.href.toString().split(window.location.host)[1];
  if (loc === pageUrls.contact) RenderContactPage();
  else if (loc === pageUrls.about) RenderAboutPage();
  else if (loc === pageUrls.gallery) RenderGalleryPage();
}

// Obsługa zdarzenia "onpopstate"
window.onpopstate = popStateHandler;
