const query = document.getElementById("query");
const getBtn = document.getElementById("get-btn");

const content = (data) => {
  query.value == "books"
    ? data.books.map((item) => {
        let contentBox = `
        <div class="info-box">
            <img src="${item.imgUrl}" alt="" />
            <h3>${item.name}</h3>
            <p>${item.author.name}</p>
        </div>
    `;

        document.querySelector(".info").innerHTML += contentBox;
      })
    : data.authors.map((item) => {
        let contentBox = `
        <div class="info-box">
            <img src="${item.imgUrl}" alt="" />
            <h3>${item.name}</h3>
        </div>
    `;

        document.querySelector(".info").innerHTML += contentBox;
      });

  console.log(data);
  query.value = "";
};

getBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const headers = {
    "content-type": "application/json",
    Authorization: "<token>",
  };

  const graphqlQuery = {
    query: `query { ${query.value} { id name ${
      query.value != "books" ? "books { name }" : "authorId"
    } imgUrl ${query.value != "books" ? "" : "author { name }"} } }`,
    variables: {},
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(graphqlQuery),
  };

  fetch(
    "http://ec2-3-110-214-191.ap-south-1.compute.amazonaws.com:5001/graphql",
    options
  )
    .then((res) => res.json())
    .then((data) => content(data.data));

  console.log(query.value);
});
