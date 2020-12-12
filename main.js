"use strict";

let container = document.getElementById("container");
let detailsContainer = document.getElementById("detailsContainer");
document.create;

//(4) delete by clicking on a button on details
const deleteInfo = async (e) => {
  e.preventDefault();
  const id = e.target.number;
  try { 
    await fetch(`http://localhost:3000/info/${id}`, {
      method: "DELETE"
    })
    
  } catch(err){
    console.error(err.message);
  }
}


//(3) Function to get the full data of the service clicked on the list
function showDetails(service) {
 
  // id is the service name
  
  fetch(`http://localhost:3000/info/${service}`)
  .then((res) => res.json())
  .then((data) => 
    {
         let details = document.createElement("div");
         details.id = "details";
         let detailsOfService = document.createElement("ul");
         detailsOfService.id = "detailsOfService";
        
         detailsOfService.innerHTML =
         `<li>Date: ${data.date.split("T", 1)[0]}</li>
         <li>Service name: ${data.service_name}</li>
         <li>Url: ${data.url}</li>
         <li>Price per year: ${data.price_per_year}</li>
         <li>Description: ${data.description}</li>`;

         let editData = document.createElement("button");
         editData.id = "editData";
         editData.innerText = "Edit";
        // editData.addEventListener("click", editInfo); (this will be added)
         let deleteData = document.createElement("button");
         deleteData.id = "deleteData";
         deleteData.number = data.id;
         deleteData.innerText = "Delete";
         deleteData.addEventListener("click", deleteInfo);
        
        detailsOfService.append(editData);
        detailsOfService.append(deleteData);
        details.append(detailsOfService);
        detailsContainer.append(details);
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