// get the weather form and search input
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("msg1");
const messageTwo = document.getElementById("msg2");

// add listener when form is submited (by search click)
weatherForm.addEventListener("submit", (e) => {

    //prevent refresh of page when submit is executed
    e.preventDefault();

    // update messages
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    // get the location from search input
    const location = search.value;

    // use fetch API to fetch data
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });

});