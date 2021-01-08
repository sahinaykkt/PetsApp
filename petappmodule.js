window.isEditing = false;
window.editPet = (id) => {
    const $cardEl = document.querySelector(`#pet${id}`);
    document.querySelector("#petName").value = $cardEl.querySelector("h5").textContent;
    document.querySelector("#petImage").value = $cardEl.querySelector("img").src;
    window.isEditing = id;
};

const addPet = (pet) => {
    const petCardHTML = `<div class="card" style="margin-bottom: 20px" id="pet${pet.id}">
                    <img src=${pet.image} class="card-img-top" onclick="editPet(${pet.id})">
                    <div class="card-body">
                        <h5 class="card-title">${pet.name}</h5>
                    </div>
                      <div class="card-footer">
    <button type="button" class="btn btn-primary" onclick="openPetDetail(${pet.id})">Detay</button>
    <button type="button" class="btn btn-danger"  onclick="removePet(${pet.id})">Sil</button>
  </div>
                </div>
`;
    document.querySelector("#petsHolder").innerHTML += petCardHTML;
};

document.querySelector("#petForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name        = document.querySelector("#petName").value;
    const image       = document.querySelector("#petImage").value;
    const description = document.querySelector("#petDesc").value;
    const data = JSON.stringify({name, image, description});
    document.querySelector("#petSubmitButton").textContent = "Ekleniyor";
    document.querySelector("#petSubmitButton").style.backgroundColor = "gray";
    if(window.isEditing){
        fetch(`${window.mockApiUrl}${window.isEditing}`, {
            method: "PUT",
            body: data,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((pet) => {
            document.querySelector("#petSubmitButton").textContent = "Submit";
            document.querySelector("#petSubmitButton").style.backgroundColor = "blue";
            document.querySelector("#petName").value = "";
            document.querySelector("#petImage").value = "";
            document.querySelector("#petDesc").value = "";
            const $cardEl = document.querySelector(`#pet${window.isEditing}`);
            $cardEl.querySelector("h5").textContent = name;
            $cardEl.querySelector("img").src = image;
            window.isEditing = false;

            //addPet(pet);
        }).catch((err) => {
            document.querySelector("#petSubmitButton").textContent = "Submit";
            document.querySelector("#petSubmitButton").style.backgroundColor = "blue";
            document.querySelector("#petName").value = "";
            document.querySelector("#petImage").value = "";
            document.querySelector("#petDesc").value = "";
            window.isEditing = false;
        });
    }else{
        fetch(`${window.mockApiUrl}`, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((pet) => {
            document.querySelector("#petSubmitButton").textContent = "Submit";
            document.querySelector("#petSubmitButton").style.backgroundColor = "blue";
            document.querySelector("#petName").value = "";
            document.querySelector("#petImage").value = "";
            document.querySelector("#petDesc").value = "";
            addPet(pet);
        }).catch((err) => {
            document.querySelector("#petSubmitButton").textContent = "Submit";
            document.querySelector("#petSubmitButton").style.backgroundColor = "blue";
            document.querySelector("#petName").value = "";
            document.querySelector("#petImage").value = "";
            document.querySelector("#petDesc").value = "";
        });
    }
});

fetch(`${window.mockApiUrl}`).then((response) => response.json()).then((pets) => {
    pets.forEach((pet) => {
        addPet(pet)
    })
});