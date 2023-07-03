// HOW TO ADD AN IMAGE TO A DOM OBJECT

// let frontPage = ['/photos/pizza-items/pizza-classic-1.png', '/photos/pizza-items/pizza-classic-2.png'] // array of images
// let image = new Image()
// image.src = frontPage[0]
// let firstImage = document.getElementById('myImage') // assuming that there is an img element in the html
// firstImage.src = image.src

// It is reseting to 0 each time you open the site.
// let orderNumber = 0

const loadEvent = async _ => 
{
    const modal = ""


    const currentUrl = window.location.href;
    console.log(currentUrl)

    // Getting the current path of the URL.   
    const parts = currentUrl.split('/');
    const path = parts.slice(3).join('/');
    console.log(path);

    let root = document.getElementById("root");

    // Chinese work for inserting the photos in an array, ordered by the pizzas from pizzas.json file.
    let pizzaImages = 
    [
        '/photos/pizza-items/01-classic-pizza.png', 
        '/photos/pizza-items/02-double-pepperoni.png', 
        '/photos/pizza-items/03-pizza-hell-fire.png', 
        '/photos/pizza-items/04-pizza-margherita.png', 
        '/photos/pizza-items/05-pizza-cheese.png', 
        '/photos/pizza-items/06-pizza-threesome.png',
        '/photos/pizza-items/07-pizza-double-trouble.png'
    ]

    const objectSchema = 
    {
        id: 0,
        pizzas: 
            [
                {
                    id: 0, 
                    amount: 0
                }
            ],
        date: 
        {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        },
        customer: 
        {
            name: "",
            email: "",
            address: 
            {
                city: "",
                street: "",
                number: 0
            }
        }
    }

    // Automatization for inserting the photos.
    // const pizzaImages = [];

    // for (let i = 1; i <= 7; i++) 
    // {
    //     const imagePath = `/photos/pizza-items/pizza-${i}.png`;
    //     pizzaImages.push(imagePath);
    // }

    function createModalHtml() 
    {
        return `
            <!-- Modal -->
            <div class="modal fade" id="pizzaModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Outside of modal -->
                    <div class="input-group my-2">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-danger btn-number mx-1" data-type="minus" data-field="quant[2]">
                                <span class="bi bi-dash"></span>
                            </button>
                        </span>
                        <input type="text" name="" class="form-control input-number text-center" id="inputAmount" value="1" min="1" max="100">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-success btn-number mx-1" data-type="plus" data-field="quant[2]">
                                    <span class="bi bi-plus"></span>
                                </button>
                            </span>
                    </div>
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="inputFirstName" class="form-label">First Name</label>
                            <input type="email" class="form-control" id="inputFirstName">
                        </div>
                        <div class="col-md-6">
                            <label for="inputLastName" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="inputLastName">
                        </div>
                        <div class="col-12">
                            <label for="inputEmail" class="form-label">Email</label>
                            <input type="text" class="form-control" id="inputEmail" placeholder="name@example.com">
                        </div>
                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">City</label>
                            <input type="text" class="form-control" id="inputCity">
                        </div>
                        <div class="col-md-4">
                            <label for="inputStreet" class="form-label">Street</label>
                            <input type="text" class="form-control" id="inputStreet">
                        </div>
                        <div class="col-md-2">
                            <label for="inputNo" class="form-label">No.</label>
                            <input type="text" class="form-control" id="inputNo">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="placeOrder">Place Order</button>
                </div>
            </div>
            </div>
            </div>`;
    }

    if(path === "pizza/list")
    {
        console.log("am intrat pe /pizza/list");

        let data = await fetch(`${currentUrl}/details`)
        .then(res => res.json())

        // console.log(data)
        // console.log(data[0].pizzas) // pizzas object
        // console.log(data[0].allergens) // allergens object

        // Matching the allergens name with the pizza's allergens ID.
        data[0].pizzas.forEach(pizza => 
        {
            pizza.allergens = pizza.allergens.map(allergenId => 
            {
              const matchingAllergen = data[0].allergens.find(a => a.id === allergenId);
              return matchingAllergen ? matchingAllergen.name + " " : '';
            });
        });

        // console.log(data[0].pizzas) // pizzas object
        // console.log(data[0].pizzas[1].name)

        // Creating the pizzas as cards.
        let cardHtml = '';

        for (let i = 0; i < pizzaImages.length; i++) 
        {
            // The element created are padded, centered and responsive.
            cardHtml += `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                <img src="${pizzaImages[i]}" class="card-img-top bg-dark" alt="..." style="object-fit: cover; width: 100%; height: 350px;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center fs-2 fw-bolder">${data[0].pizzas[i].name}</h5>
                    <p class="card-title fw-bold text-center fs-3">Ingredients:</p>
                    <p class="card-text text-center fs-5 ingredient-text">${data[0].pizzas[i].ingredients}</p>
                    <p class="card-text text-center fs-6 ingredient-text">Allergens: ${data[0].pizzas[i].allergens}</p>
                    <div class="text-center mt-auto">
                    <button type="button" class="btn btn-primary btn-lg" id="orderButton${i}" data-bs-toggle="modal" data-bs-target="#pizzaModal" data-pizza-id="${data[0].pizzas[i].id}">Add to cart</button>
                    </div>
                </div>
                </div>
            </div>`;
        }

        // Inserting the cards
        root.insertAdjacentHTML("beforeend",
        `<div class="container">
            <div class="row justify-content-center align-items-stretch">
            ${cardHtml}
            </div>
        </div>`);

        root.insertAdjacentHTML("afterEnd", createModalHtml())

        let pizzaId = 0

        // Getting the pizzaId of the pizza to insert it in the document.
        document.addEventListener("click", (event) => 
        {
            if (event.target.id.includes("orderButton")) 
            {
                pizzaId = event.target.dataset.pizzaId;
            }
        });

        let order = document.getElementById("placeOrder");

        order.addEventListener("click", async (event) => 
        {
            event.preventDefault();
            let inputs = document.querySelectorAll(".form-control");
            let isAnyInputEmpty = false;
          
            inputs.forEach((input) => 
            {
                if (input.value == "") 
                {
                    var label = document.querySelector(`label[for=${input.id}]`);
                    // console.log(label)
                    if (label !== null) {
                        input.placeholder = `Please insert ${label.textContent}`;
                    }
                    inputs.forEach((input) => (input.value = ""));
                    // input.placeholder = `Please insert ${label.textContent}`;
                    // order.disabled = true
                    isAnyInputEmpty = true;
                }                
            })

            if (!isAnyInputEmpty) 
            {
                const currentDate = new Date()
                // The customer object.
                objectSchema.customer.name = document.getElementById("inputFirstName").value + " " + document.getElementById("inputLastName").value
                objectSchema.customer.email = document.getElementById("inputEmail").value
                objectSchema.customer.address.city = document.getElementById("inputCity").value
                objectSchema.customer.address.street = document.getElementById("inputStreet").value
                objectSchema.customer.address.number = document.getElementById("inputNo").value
                // The date object.
                objectSchema.date.year = currentDate.getFullYear();
                objectSchema.date.month = currentDate.getMonth() + 1;
                objectSchema.date.day = currentDate.getDate();
                objectSchema.date.hour = currentDate.getHours();
                objectSchema.date.minute = currentDate.getMinutes();
                objectSchema.date.second = currentDate.getSeconds();
                // The identification object.   
                objectSchema.pizzas[0].id = pizzaId
                objectSchema.pizzas[0].amount = document.getElementById("inputAmount").value
                // The order ID.
                // orderNumber++
                // objectSchema.id = orderNumber
                // order.disabled = false
    
                console.log(objectSchema)
                inputs.forEach((input) => (input.value = ""));

                let put = await fetch("http://127.0.0.1:9002/api/orders", 
                {
                    //HTTP method set to POST.
                    method: "POST",
                    //Set the headers that specify you're sending a JSON body request and accepting JSON response
                    headers: 
                    {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    // POST request body as JSON string.
                    body: JSON.stringify(objectSchema)
                })
                .then(res => res.json())

                console.log(put)
                 
            }

        })
    }

    if (path === "api/orders") {
        console.log("am intrat pe /api/orders");
      
        let data = await fetch(`${currentUrl}/details`).then((res) => res.json());
      
        console.log(data);
      
        root.insertAdjacentHTML(
          "afterEnd",
          `<div class="d-flex justify-content-center align-items-start" style="height: 100vh;">
              <div class="card col-lg-6 my-3 mx-3" id="cardContainer">
                  <div class="card-header fs-5 fw-5">
                      Orders
                  </div>
                  <div class="card-body">
                      <h5 class="card-title">Search for an order!</h5>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <ul class="list-group" id="orders">
                          <!-- List items go here -->
                      </ul>
                  </div>
              </div>
          </div>`
        );
      
        // Adjust the card size based on the number of list items
        function adjustCardSize() 
        {
          var cardContainer = document.getElementById("cardContainer");
          var list = document.getElementById("orders");
          var listItemHeight = 50; // Height of each list item in pixels
          var minHeight = 200; // Minimum height of the card in pixels
      
          var listHeight = list.children.length * listItemHeight;
          var newHeight = Math.max(minHeight, listHeight);
      
          cardContainer.style.height = newHeight + "px";
        }
      
        window.addEventListener("load", adjustCardSize);
      
        if (data.orders.length === 0) 
        {
          let ordersList = document.getElementById("orders");
      
          let noItem = document.createElement("li");
          noItem.classList.add("list-group-item");
          noItem.textContent = "No orders yet...";
      
          ordersList.append(noItem);
        } 
        else 
        {
          data.orders.forEach((el, index) => 
          {
            let ordersList = document.getElementById("orders");
            console.log(data.orders);
      
            let item = document.createElement("li");
            item.innerHTML = `<div class="text-center mt-auto">
                      <button type="button" class="btn btn-secondary btn-lg" id="orderButton${index}" data-bs-toggle="modal" data-bs-target="#pizzaModal${index}" data-pizza-id="">Order Number: ${el.id}</button>
                      </div>`;
      
            ordersList.append(item);
      
            root.insertAdjacentHTML(
              "afterEnd",
              `<div class="modal fade" id="pizzaModal${index}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="ModalLabel">Modal title</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                  <!-- Outside of modal -->
                                      <form class="row g-3">
                                          <div class="col-md-6">
                                              <label for="inputFirstName" class="form-label">First Name</label>
                                              <input type="email" class="form-control" id="inputFirstName${index}" value=${el.customer.name.split(" ")[0]} disabled>
                                          </div>
                                          <div class="col-md-6">
                                              <label for="inputLastName" class="form-label">Last Name</label>
                                              <input type="text" class="form-control" id="inputLastName${index}" value=${el.customer.name.split(" ")[1]} disabled>
                                          </div>
                                          <div class="col-12">
                                              <label for="inputAddress" class="form-label">Email</label>
                                              <input type="text" class="form-control" id="inputAddress${index}" value=${el.customer.email} disabled>
                                          </div>
                                          <div class="col-md-6">
                                              <label for="inputCity" class="form-label">City</label>
                                              <input type="text" class="form-control" id="inputCity${index}" value=${el.customer.address.city} disabled>
                                          </div>
                                          <div class="col-md-4">
                                              <label for="inputStreet" class="form-label">Street</label>
                                              <input type="text" class="form-control" id="inputStreet${index}" value=${el.customer.address.street} disabled>
                                          </div>
                                          <div class="col-md-2">
                                              <label for="inputNo" class="form-label">No.</label>
                                              <input type="text" class="form-control" id="inputNo${index}" value=${el.customer.address.number} disabled>
                                          </div>
                                          <div class="col-md-2">
                                              <label for="inputYear" class="form-label">Year</label>
                                              <input type="text" class="form-control" id="inputYear${index}" value=${el.date.year} disabled>
                                          </div>
                                          <div class="col-md-2">
                                              <label for="inputMonth" class="form-label">Month</label>
                                              <input type="text" class="form-control" id="inputMonth${index}" value=${el.date.month} disabled>
                                          </div>
                                          <div class="col-md-2">
                                              <label for="inputDay" class="form-label">Day</label>
                                              <input type="text" class="form-control" id="inputDay${index}" value=${el.date.day} disabled>
                                          </div>
                                          <div class="col-md-2">
                                              <label for="inputHour" class="form-label">Hour</label>
                                              <input type="text" class="form-control" id="inputHour${index}" value=${el.date.hour} disabled>
                                          </div>
                                          <div class="col-md-2">
                                              <label for="inputMinute" class="form-label">Minute</label>
                                              <input type="text" class="form-control" id="inputMinute${index}" value=${el.date.minute} disabled>
                                          </div>
                                          <div class="col-md-2">
                                              <label for="inputSecond" class="form-label">Second</label>
                                              <input type="text" class="form-control" id="inputSecond${index}" value=${el.date.second} disabled>
                                          </div>
                                          <div class="col-md-6">
                                              <label for="inputProductID" class="form-label">Product ID</label>
                                              <input type="text" class="form-control" id="inputProductID${index}" value=${el.pizzas[0].id} disabled>
                                          </div>
                                          <div class="col-md-6">
                                              <label for="inputAmount" class="form-label">Amount</label>
                                              <input type="text" class="form-control" id="inputAmount${index}" value=${el.pizzas[0].amount} disabled>
                                          </div>
                                      </form>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary" id="placeOrder">Place Order</button>
                                  </div>
                              </div>
                          </div>
                      </div>`
            );
            
            // Attach a click event listener to each button
            let orderButton = document.getElementById(`orderButton${index}`);

            orderButton.addEventListener("click", () => {
              // Update the modal content dynamically
              document.getElementById(`inputFirstName${index}`).value =
                el.customer.name.split(" ")[0];
              document.getElementById(`inputLastName${index}`).value =
                el.customer.name.split(" ")[1];
              document.getElementById(`inputAddress${index}`).value =
                el.customer.email;
              document.getElementById(`inputCity${index}`).value =
                el.customer.address.city;
              document.getElementById(`inputStreet${index}`).value =
                el.customer.address.street;
              document.getElementById(`inputNo${index}`).value =
                el.customer.address.number;
              document.getElementById(`inputYear${index}`).value = el.date.year;
              document.getElementById(`inputMonth${index}`).value = el.date.month;
              document.getElementById(`inputDay${index}`).value = el.date.day;
              document.getElementById(`inputHour${index}`).value = el.date.hour;
              document.getElementById(`inputMinute${index}`).value = el.date.minute;
              document.getElementById(`inputSecond${index}`).value = el.date.second;
              document.getElementById(`inputProductID${index}`).value =el.pizzas[0].id;
              document.getElementById(`inputAmount${index}`).value =el.pizzas[0].amount;
            });
          });
        }
      }
}

window.addEventListener("load", loadEvent);