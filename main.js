let container = document.getElementById("container");

//server側のendpoint(ここではinfo）からデータをとる。
fetch("http://localhost:3000/info")
  //responseオブジェクトからJSONを取り出すにはjson()をする必要がある。
  .then((res) => res.json())
  .then((data) => {
    data.forEach(item=>(container.innerHTML+=`<li>${item}</li>`))
  });
