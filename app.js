window.mockApiUrl = "https://5ff1a6a7db1158001748b2d3.mockapi.io/pets/";

window.removePet = (id) => {
  fetch(`${window.mockApiUrl}${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    window.location.reload();
  });
};

window.generateDetailModal = (pet) => {
  return `<div class="modal fade" id="exampleModal${pet.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Pretty Pet</h5>
        <button type="button" class ="btn btn-success" data-bs-dismiss="modal">Close</button>
      </div>
      <div class="modal-body">
        ...
        ${pet.description}
      </div>
      
    </div>
  </div>
</div>`;
};

window.openPetDetail = (id) => {
  fetch(`${window.mockApiUrl}${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      const petModalHtml = generateDetailModal(data);
      document.querySelector("body").innerHTML += petModalHtml;
      $(`#exampleModal${id}`).modal("show");
    });
};