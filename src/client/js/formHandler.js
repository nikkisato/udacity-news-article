async function handleSubmit(event) {
  event.preventDefault();

  let formText = document.getElementById("url").value;

  if (Client.checkForUrl(formText)) {
    const formdata = new FormData();

    formdata.append("key", `${process.env.API_KEY}`);
    formdata.append("url", "text");
    formdata.append("lang", "en");

    const requestOptions = {
      method: "POST",
      credential: "same-origin",
      body: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // https://www.opb.org/article/2023/03/03/think-out-loud-conversation-oregon-governor-tina-kotek/

    await fetch(
      `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${url}&lang=en`,
      requestOptions
    )
      .then((response) => ({
        status: response.status,
        body: response.json(),
      }))
      .then(({ status, body }) => {
        document.getElementById("results").innerHTML = data;
      })
      .catch((error) => console.log("error", error));
  }
}

export { handleSubmit };
