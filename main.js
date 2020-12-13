"use strict";

let container = document.getElementById("container");
let detailsContainer = document.getElementById("detailsContainer");
document.create;

//(5) edit details of a service
const editInfo = async (e) => {
  e.preventDefault();
  const data = e.target.data;
  console.log(data);
  document.getElementById(`detailsOf${data.id}`).innerHTML = `<p>Date: ${
    data.date.split("T", 1)[0]
  }</p>
  <input id="newDate" type="date" value=${data.date.split("T", 1)[0]}>
  <p>Service name: ${data.service_name}</p>
  <input id="newServiceName" type="text" value=${data.service_name}>
  <p>Url: ${data.url}</p>
  <input id="newUrl" type="text" value=${data.url}>
  <p>Price per year: ${data.price_per_year}</p>
  <input id="newPrice" type="integer" value=${data.price_per_year}>
  <p>Description: ${data.description}</p>
  <input id="newDescription" type="text" value=${data.description}><br>
  <button id="cancelButton" type="button" >Cancel</button>
  <button id="updateButton" type="submit">Update</button>`;

  function cancel(){document.getElementById("details")
  .remove()};
  document.getElementById("cancelButton").addEventListener("click", cancel);

  document.getElementById("updateButton").addEventListener("click", updateSubsc);

 function updateSubsc(e) {
   e.preventDefault();
  let date = document.getElementById("newDate").value;
  let service_name = document.getElementById("newServiceName").value;
  let url = document.getElementById("newUrl").value;
  let price = document.getElementById("newPrice").value;
  let description = document.getElementById("newDescription").value;

 fetch(`http://localhost:3000/info/update/${data.id}`, {
    method: "PUT",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      date: date,
      service_name: service_name,
      url: url,
      price: price,
      description: description,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
  
  };

};


//(4) delete by clicking on a button on details
const deleteInfo = async (e) => {
  e.preventDefault();
  const id = e.target.number;
  try {
    await fetch(`http://localhost:3000/info/delete/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err.message);
  }
};

//(3) Function to get the full data of the service clicked on the list
function showDetails(service) {
  // id is the service name

  fetch(`http://localhost:3000/info/${service}`)
    .then((res) => res.json())
    .then((data) => {
      let details = document.createElement("div");
      details.id = "details";
      let detailsOfService = document.createElement("div");
      detailsOfService.id = `detailsOf${data.id}`;

      detailsOfService.innerHTML = `<h4>Update information</h4><p>Date: ${data.date.split("T", 1)[0]}</p>
         <p>Service name: ${data.service_name}</p>
         <p>Url: ${data.url}</p>
         <p>Price per year: ${data.price_per_year}</p>
         <p>Description: ${data.description}</p>`;

      let editData = document.createElement("button");
      editData.id = "editData";
      editData.data = data;
      editData.innerText = "Edit";
      editData.addEventListener("click", editInfo);

      let deleteData = document.createElement("button");
      deleteData.id = "deleteData";
      deleteData.number = data.id;
      deleteData.innerText = "Delete";
      deleteData.addEventListener("click", deleteInfo);

      let closeData = document.createElement("button");
      closeData.id = "closeData"
      closeData.innerText = "Close";
      closeData.addEventListener("click", closeDetails);

      function closeDetails(){
        document.getElementById("details").remove()
      }



      detailsOfService.append(editData);
      detailsOfService.append(deleteData);
      detailsOfService.append(closeData);
      details.append(detailsOfService);
      detailsContainer.append(details);
    });
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
