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
      updateUI(data);
    }
  } else {
    document.getElementById("result").innerHTML = "No message to send";
  }
}

function updateUI(data) {
  document.getElementById("score_tag").innerHTML = `Score Tag: ${data.score_tag}`;
  document.getElementById("model").innerHTML = `Model: ${data.model}`;
  document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`;
  document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
  document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`;
  document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
}

export default updateUI;

export { handleSubmit };
