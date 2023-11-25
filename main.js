const api_url = "https://retoolapi.dev/TZUlCU/Employes";

document.addEventListener("DOMContentLoaded",() =>{
        const employeForm = document.getElementById("employeForm");
        employeForm.addEventListener("submit", handleFormSubmit);
        let changeButton = document.getElementById('formChange')
        changeButton.addEventListener("click",resetForm);
        LoadData();
});

function handleFormSubmit(event) {
        event.preventDefault();
        const id = document.getElementById("id").value;
        const name = document.getElementById("nameInput").value;
        const age = document.getElementById("ageInput").value;
        const email = document.getElementById("emailInput").value;
        const phone_number = document.getElementById("phone_numberInput").value;
        const boss = document.getElementById("bossInput");
        const isBoss = boss.checked;
        const ratingInputs = document.querySelectorAll('input[name="rating"]:checked');
        let rank = 1;
        if (ratingInputs.length > 0) {
        rank = ratingInputs[0].value;
        }
        const class_ = document.getElementById("classInput").value;
        const starting_date = document.getElementById("starting_dateInput").value;
        const employe = {
                Name:name,
                Age:age,
                Email:email,
                Phone_number:phone_number,
                Boss:isBoss,
                Rank: parseInt(rank),
                Class:class_,
                Starting_date:starting_date
        };

        if (id == "") {
          addEmploye(employe);
        } else {
          updatePerson(id, employe);
        }
      }

      async function addEmploye(employe) {
        try {
          const response = await fetch(api_url, {
            method: "POST",
            body: JSON.stringify(employe),
            headers: {
              "Content-Type": "application/json"
            }
          });
      
          if (response.ok) {
            LoadData();
            resetForm();
          }
        } catch (error) {
          console.error("Hiba a dolgozó hozzáadásakor:", error);
        }
      }

async function updatePerson(id, person) {
        const response = await fetch(`${api_url}/${id}`, {
                method: "PATCH",
                body: JSON.stringify(person),
                headers: {
                        "Content-Type": "application/json"
                }
                });
                if (response.ok) {
                  resetForm();
                  LoadData();
                }
              }
              
function resetForm(){
        document.getElementById("nameInput").value = "";
        document.getElementById("ageInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("phone_numberInput").value = "";
        document.getElementById("bossInput").checked = false;
        document.querySelectorAll('input[name="rating"]').forEach(radio => {
                radio.checked = false;
        });
        document.getElementById("classInput").value = "";
        document.getElementById("starting_dateInput").value = "";
        document.getElementById("formSubmit").textContent = "Felvesz";
        document.getElementById("formSubmit").className="btn btn-success";
        
}

async function deletePerson(id) {
        const response = await fetch(`${api_url}/${id}`, { method: "DELETE" });
        if (response.ok) {
          LoadData();
        }
      }

function LoadData(){
        let employesData = document.getElementById("cardContainer");
        employesData.innerHTML = "";
         fetch(api_url).then(httpResponse => httpResponse.json())
        .then(responseBody => {
                responseBody.forEach(employe => {

                        let card = document.createElement("div");
                        card.className = "card, card border-success mb-3, m-3";
                        card.style = "width: 18rem;";
                        
                        let cardBody = document.createElement("div");
                        cardBody.className = "card-body";
                        
                        let cardHeader = document.createElement("div");
                        cardHeader.className = "card-header  text-white bg-dark";

                        let cardTitle = document.createElement("h5");
                        cardTitle.className = "card-title";
                        cardTitle.textContent = employe.Name;

                        let cardSubTitle = document.createElement("h6");
                        cardSubTitle.className = "card-subtitle mb-2 text-muted";
                        cardSubTitle.textContent = "ID: " + employe.id;
                        
                        let cardList = document.createElement("ul");
                        cardList.className = "list-group list-group-flush";

                        let cardListItem = document.createElement("li");
                        cardListItem.className = "list-group-item";
                        cardListItem.textContent = "Életkor: " + employe.Age;

                        let cardListItem2 = document.createElement("li");
                        cardListItem2.className = "list-group-item";
                        cardListItem2.textContent = "Email: " + employe.Email;
                        
                        let cardListItem3 = document.createElement("li");
                        cardListItem3.className = "list-group-item";
                        cardListItem3.textContent = "Telefonszám: " +  (employe.Phone_number);

                        let cardListItem4 = document.createElement("li");
                        cardListItem4.className = "list-group-item";
                        cardListItem4.textContent = "Főnök: " +  (employe.Boss ? "igen": "nem");


                        let cardListItem5 = document.createElement("li");
                        cardListItem5.className = "list-group-item";
       
                                function convertRankToStars(employe) {
                                        let stars = '';
                                        let numericRank = parseInt(employe.Rank);
                                        
                                        if (!isNaN(numericRank) && numericRank > 0) {
                                            for (let i = 0; i < numericRank; i++) {
                                                stars += '⭐️';
                                            }
                                        }
                                        else{
                                                stars = employe.Rank;
                                        }
                                
                                        return stars;
                                }
                        let starRank = convertRankToStars(employe);
                        cardListItem5.textContent = "Értékelés: " + starRank;
        
                        let cardListItem6 = document.createElement("li");
                        cardListItem6.className = "list-group-item";
                        cardListItem6.textContent = "Részleg: " + employe.Class;

                        let cardListItem7 = document.createElement("li");
                        cardListItem7.className = "list-group-item";
                        const formattedDate = new Date(employe.Starting_date).toISOString().slice(0, 10);
                        cardListItem7.textContent = "Munkába állás dátuma: " + formattedDate;



                        let updateButton = document.createElement("button");
                        updateButton.className="btn btn-warning m-2";
                        updateButton.textContent="Módosít";
                        updateButton.addEventListener("click",() => fillUpdateForm(employe.id));

                        let deleteButton = document.createElement("button");
                        deleteButton.className="btn btn-danger m-2";
                        deleteButton.textContent="Töröl";
                        deleteButton.addEventListener("click", () => deletePerson(employe.id));

                        cardHeader.appendChild(cardTitle);
                        cardBody.appendChild(cardSubTitle);     
                        cardBody.appendChild(cardList);
                        cardList.appendChild(cardListItem);
                        cardList.appendChild(cardListItem2);
                        cardList.appendChild(cardListItem3);
                        cardList.appendChild(cardListItem4);
                        cardList.appendChild(cardListItem5);
                        cardList.appendChild(cardListItem6);
                        cardList.appendChild(cardListItem7);
                        cardList.appendChild(updateButton);
                        cardList.appendChild(deleteButton);
                                
                        card.appendChild(cardHeader);    
                        card.appendChild(cardBody);

                        cardContainer.appendChild(card);
                        document.getElementById("formSubmit").className="btn btn-success";
                    
            })

    });
}

async function fillUpdateForm(id) {
        const response = await fetch(`${api_url}/${id}`);
        if (!response.ok) {
          alert("Hiba történt az adatok lekérése során");
          return;
        }
        const employe = await response.json();

        document.getElementById("id").value = employe.id;
        document.getElementById("nameInput").value = employe.Name;
        document.getElementById("ageInput").value = employe.Age;
        document.getElementById("emailInput").value = employe.Email;
        document.getElementById("phone_numberInput").value = employe.Phone_number;
        if(employe.Boss){
                document.getElementById("bossInput").checked = true;
        }
        else{
                document.getElementById("bossInput").checked = false;
        }

        
        if (isNaN(employe.Rank)) {
                let rank = employe.Rank;
                const numericRank = rank.replace(/ /g, '');
                let starCount = numericRank.length/2;

                for(let i = 1; i< starCount;i++){
        
                        document.getElementById("star" + (i+1)).checked = true;
                }    
        }
        else{
                let numericRank = parseInt(employe.Rank);
                for(let i = 0; i< numericRank;i++){
        
                        document.getElementById("star" + (i+1)).checked = true;
                }
        }

        document.getElementById("classInput").value = employe.Class;
        const formattedDate = new Date(employe.Starting_date).toISOString().slice(0, 10);

        document.getElementById("starting_dateInput").value = formattedDate;
        document.getElementById("formSubmit").textContent = "Módosít";
        document.getElementById("formSubmit").className= "btn btn-warning";
      }