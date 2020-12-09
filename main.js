"use strict";

let container = document.getElementById("container");

//server側のendpoint(ここではinfo）からデータをとる。
fetch("http://localhost:3000/info")
  //responseオブジェクトからJSONを取り出すにはjson()をする必要がある。
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => (container.innerHTML += `<li>${item}</li>`));
  });

let addSubscription = document.getElementById("addSubscription");
addSubscription.addEventListener("submit", addSubsc);

function addSubsc(e) {
  e.preventDefault();
  let date = form.date.value;
  let service_name = form.service_name.value;
  let url = form.url.value;
  let price = form.price.value;
  let description = form.description.value;
  console.log(typeof date);

  fetch("http://localhost:3000/form", {
    method: "POST",
    headers: {
      Accetpt: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      date: date,
      service_name: service_name,
      url: url,
      price: price,
      description: description
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
