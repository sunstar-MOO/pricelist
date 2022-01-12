const burger = document.querySelector(".burger");
const menus = document.querySelector(".menus");

burger.addEventListener("click", function () {
  if (menus.classList.contains("move")) {
    menus.classList.remove("move");
    burger.classList.add("bi-list");
    burger.classList.remove("bi-arrow-left");
  } else {
    menus.classList.add("move");
    burger.classList.remove("bi-list");
    burger.classList.add("bi-arrow-left");
  }
});

var category1 = [];

for (x in data) {
  category1.push(data[x]["app"]);
}
var category1 = [...new Set(category1)];

var category = [];

for (let x = 0; x < category1.length; x++) {
  category.push(`suns${x}`);
}

const accordionp = document.querySelector(".accordion");
for (x in category) {
  const divcat = document.createElement("div");
  // divcat.innerText = `${category[x]}`;
  divcat.setAttribute("class", `${category[x]} accordion-item`);

  const header = document.createElement("h2");
  header.setAttribute("class", "accordion-header");
  header.setAttribute("id", `heading${category[x]}`);
  const button = document.createElement("button");
  button.innerText = category1[x];
  button.setAttribute("class", `accordion-button`);
  button.setAttribute("type", `button`);
  button.setAttribute("data-bs-toggle", `collapse`);
  button.setAttribute("data-bs-target", `#collapse${category[x]}`);
  button.setAttribute("aria-expanded", `true`);
  button.setAttribute("aria-control", `collapse${category[x]}`);
  button.innerText = `${category1[x]}`;
  header.append(button);

  const divcoll = document.createElement("div");
  divcoll.setAttribute("id", `collapse${category[x]}`);
  divcoll.setAttribute("class", `accordion-collapse collapse`);
  divcoll.setAttribute("aria-labelledby", `heading${category[x]}`);
  divcoll.setAttribute("data-bs-parent", `#accordionExample`);
  divcat.append(header, divcoll);

  const collbod = document.createElement("div");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const row = document.createElement("div");
  row.setAttribute("class", "row");

  for (p in data) {
    if (data[p]["app"] == category1[x]) {
      const cardcon = document.createElement("div");
      cardcon.setAttribute("class", "card col-md-5");

      const cardbody = document.createElement("div");
      cardbody.setAttribute("class", "card-body");

      const cardtitle = document.createElement("h6");
      cardtitle.setAttribute("class", "card-title");
      cardtitle.innerText = `${data[p]["name"]} ${data[p]["time"]}`;

      const pricetext = document.createElement("p");
      pricetext.innerText = `Rp. ${data[p]["price"]} \n${data[p]["desc"]}`;
      pricetext.setAttribute("class", "card-text");

      cardbody.append(cardtitle, pricetext);
      cardcon.append(cardbody);
      row.append(cardcon);
    }
  }
  container.append(row);
  collbod.append(container);
  divcoll.append(collbod);
  accordionp.append(divcat);
}

// Search bar //

const searchbar = document.querySelector(".searchbar");

const searchtext = document.querySelector(".typing");
const searchbutton = document.querySelector(".searchnow");

searchbutton.addEventListener("click", function () {
  if (searchtext.value) {
    const text = searchtext.value;
    const result = [];

    for (x in data) {
      texttest = data[x]["name"].includes(text.toUpperCase());
      if (texttest) {
        result.push(data[x]["iden"]);
      }
    }
    cek(result);
  } else {
    window.alert("Teks Tidak Ada");
  }
});

function cek(x) {
  const result = x;

  if (result.length) {
    erase();
    makeresult();
    writing(result);
  } else {
    erase();
    window.alert("Tidak Ditemukan");
  }
}

function erase() {
  if (document.querySelectorAll(".searchresult").length) {
    const results = document.querySelectorAll(".searchresult");
    for (let x = 0; x < results.length; x++) {
      results[x].remove();
    }
  }
}

//BERMASALAH VYPRVPN, DAN SEMUA YANG 1 ITEM SAJA

function makeresult() {
  const kosong = document.createElement("div");
  const searchres = document.createElement("div");
  searchres.setAttribute("class", "searchresult");
  const title = document.createElement("h2");
  title.innerText = "Search Result";
  const clear = document.createElement("button");
  clear.setAttribute("class", "btn btn-danger");
  clear.innerText = "Clear Result";
  clear.addEventListener("click", function () {
    erase();
  });

  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  container.append(row);

  kosong.append(container);
  searchres.append(title, clear, kosong);
  searchbar.append(searchres);
}

function writing(x) {
  const result = x;
  const searchresult = document.querySelector(".searchresult .row");

  for (j in data) {
    for (y in result) {
      if (data[j]["iden"] == result[y]) {
        const card = document.createElement("div");
        card.setAttribute("class", "card col-md-5");

        const cardbody = document.createElement("div");
        cardbody.setAttribute("class", "card-body");

        const title = document.createElement("h6");
        title.setAttribute("class", "card-title");
        title.innerText = `${data[j]["name"]} ${data[j]["time"]}`;

        const price = document.createElement("h6");
        price.setAttribute("class", "card-subtitle");
        price.innerText = `Rp. ${data[j]["price"]}`;

        const text = document.createElement("p");
        text.setAttribute("class", "card-text");
        text.innerText = `${data[j]["desc"]}`;

        cardbody.append(title, price, text);
        card.append(cardbody);
        searchresult.append(card);
      }
    }
  }
}
