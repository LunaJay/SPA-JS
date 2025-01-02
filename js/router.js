let pageUrls = {
  about: "/index.html?about",
  contact: "/index.html?contact",
};

// Funkcja uruchamiana podczas startu aplikacji
function OnStartUp() {
  popStateHandler();
}
OnStartUp();

// Obsługa kliknięcia w link "About"
document.querySelector("#about-link").addEventListener("click", (event) => {
  let stateObj = { page: "about" };
  document.title = "About";
  history.pushState(stateObj, "about", "?about");
  RenderAboutPage();
});

// Obsługa kliknięcia w link "Contact"
document.querySelector("#contact-link").addEventListener("click", (event) => {
  let stateObj = { page: "contact" };
  document.title = "Contact";
  history.pushState(stateObj, "contact", "?contact");
  RenderContactPage();
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
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            
            <button type="submit">Send</button>
        </form>`;

  // Dodajemy obsługę zdarzenia "submit" dla formularza
  document
    .getElementById("contact-form")
    .addEventListener("submit", (event) => {
      event.preventDefault(); // Zapobiega domyślnemu działaniu formularza

      // Pobieranie danych z formularza
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Wyświetlenie danych w alercie
      alert(
        `Form submitted!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
      );
    });
}

// Funkcja obsługująca zmianę stanu historii przeglądarki
function popStateHandler() {
  let loc = window.location.href.toString().split(window.location.host)[1];
  if (loc === pageUrls.contact) {
    RenderContactPage();
  } else if (loc === pageUrls.about) {
    RenderAboutPage();
  }
}

// Obsługa zdarzenia "onpopstate" (przyciski Wstecz/Dalej w przeglądarce)
window.onpopstate = popStateHandler;

// Funkcja przełączania motywów
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
