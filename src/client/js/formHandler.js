async function handleSubmit(event) {
  event.preventDefault();

  let formText = document.getElementById("name").value;

  const response = await fetch("http://localhost:8080");
  console.log(response);
  document.getElementById("results").innerHTML = response;
}

export { handleSubmit };
