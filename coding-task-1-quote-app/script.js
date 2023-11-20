const getQuote = document.querySelector("#getQuote");
const mainEl = document.querySelector("main");
const state = {
  author: [],
  quote: [],
};

getQuote.addEventListener("click", () => {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      state.author = data.author;
      state.quote = data.quote;
      renderQuote();
    });
});

function renderQuote() {
  const pTagQuote = document.createElement("p");
  const pTagAuthor = document.createElement("p");
  pTagAuthor.setAttribute("id", "author");
  mainEl.innerText = "";
  pTagQuote.innerText = state.quote;
  pTagAuthor.innerText = state.author;
  mainEl.appendChild(pTagQuote);
  mainEl.appendChild(pTagAuthor);
}
