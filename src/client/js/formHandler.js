async function handleSubmit(event) {
  event.preventDefault();

  console.log("POST sent");

  let formText = document.getElementById("url").value;

  console.log("URL", formText);

  if (formText.value != "") {
    console.log("inside If Statement");

    const rawData = await fetch("http://localhost:8081/postData", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: formText }),
    });

    console.log("RawData", rawData);
    if (rawData.status == "200") {
      const data = await rawData.json();
      console.log(data);
      document.getElementById("results").innerHTML = data.score_tag;
    }
  } else {
    document.getElementById("result").innerHTML = "No message to send";
  }
}

export { handleSubmit };
