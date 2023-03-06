async function handleSubmit(event) {
  event.preventDefault();

  let formText = document.getElementById("url").value;

  if (Client.checkForUrl(formText)) {
    await fetch("http://localhost:8080")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        document.getElementById("results").innerHTML = data;
      });
  } else {
    alert("Invalid URL");
  }
}

export { handleSubmit };
