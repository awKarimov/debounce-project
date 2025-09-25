const container = document.getElementById("userCards");
const searchBox = document.getElementById("searchBox");

import { data } from "./data.js";

function debounce(el, delay) {
  let timeout;
  return function (...result) {
    clearTimeout(timeout);
    timeout = setTimeout(() => el.apply(this, result), delay);
  };
}

function cards(list) {
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>Hech narsa topilmadi</p>";
    return;
  }
  list.forEach((user) => {
    const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <h2>${user.name}</h2>
          <p><strong>Telefon:</strong> ${user.phone}</p>
          <p><strong>Email:</strong> <a  href="#">${user.email}</a></p>
          <p><strong>Address:</strong> ${address}</p>
        `;
    container.appendChild(card);
  });
}

function searchNames(e) {
  const text = e.target.value.toLowerCase();
  const filtered = data.filter((user) =>
    user.name.toLowerCase().includes(text)
  );
  cards(filtered);
}

searchBox.addEventListener("input", debounce(searchNames, 100));

cards(data);
