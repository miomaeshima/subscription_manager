"use strict";

let container = document.getElementById("container");
let detailsContainer = document.getElementById("detailsContainer");
document.create;


//(3) Function to get the full data of the service clicked on the list
function showDetails(service) {
 
  // id is the service name
  
  fetch(`http://localhost:3000/info/${service}`)
  .then((res) => res.json())
  .then((data) => 
    {
      let detailsOfService = document.createElement("ul");
      detailsOfService.id = "box";
      detailsOfService.innerHTML = `<li>Date: ${data.date.split("T", 1)[0]}</li>
      <li>Service name: ${data.service_name}</li>
      <li>Url: ${data.url}</li>
      <li>Price per year: ${data.price_per_year}</li>
      <li>Description: ${data.description}</li>`;
      detailsContainer.append(detailsOfService);
    }
    );
  }
  
  //(2) insert a new service information from form
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
        description: description,
      }),
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
  }
  
  //(1) Getting all the service names in the current subsctiptions from the endpoint (which is "/info" here) on server side.
  //calling json() is necessary to take the response object from the promise.
  // function (3) is called if line item is clicked.
  fetch("http://localhost:3000/info")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
        //actually data is an array of service_name's
        (service_name) =>
          (container.innerHTML += `<li class="lineitem" id=${service_name} onclick=showDetails(id)>${service_name}</li>`)
      );
    });