
var rowId = 0;
var catBreeds = [];
document.getElementById("petsave-button").onclick = function () {
	rowId += 1;

	let pet = {
		dateInput: document.getElementById("date-input").value,
		ownerInput: document.getElementById("owner-input").value,
		petNameInput: document.getElementById("petname-input").value,
		petAgeInput: +document.getElementById("petage-input").value,
		petSpeciesInput: document.getElementById("petspecies-input").value,
		petSizeInput: document.getElementById("petsize-input").value,
	};

	let tr = document.createElement("tr");
	tr.setAttribute("id", "row-" + rowId);

	let tdId = document.createElement("td");
	tdId.innerHTML = rowId;
	tr.appendChild(tdId);

	Object.keys(pet).forEach((key) => {
		console.log(key);

		let td = document.createElement("td");
		td.innerHTML = pet[key];

		tr.appendChild(td);

	});

	let tdActions = document.createElement("td");
	
	let input = document.createElement("input");
	input.setAttribute("id", "delete-" + rowId);
	input.setAttribute("type", "button");
	input.value = "Eliminar";
	input.onclick = function () {
		let id = this.getAttribute("id");
		id = +id.replace("delete-", "");

		document.getElementById("row-" + id).remove();
	};

	tdActions.appendChild(input);
	
	tr.appendChild(tdActions);

	document.getElementById("body-table").appendChild(tr);

};


fetch('https://api.thecatapi.com/v1/breeds')
	.then(response => response.json())
	.then(data => {
		catBreeds=data;
		let petBreed1 = document.getElementById("petbreed-input1");
		let breeds = data.map(breed=>breed.name);
		
		breeds.forEach(function(breeds) {
			
			let option = document.createElement("option")
			option.innerHTML = breeds;
			petBreed1.appendChild(option)
		});
	});

fetch('https://dog.ceo/api/breeds/list/all')
		.then(response => response.json())
		.then(data => {
			
			let petBreed2 = document.getElementById("petbreed-input2");

			Object.keys(data.message).map((breed) => {
				let option = document.createElement("option");
				option.innerHTML = breed;
				petBreed2.appendChild(option);

			});
		});

document.getElementById("petspecies-input").onclick = function(){
let algo =document.getElementById("petspecies-input").value;

if(algo =="Perro"){
	console.log("perro")
	
	document.getElementById("petbreed-input1").setAttribute("disabled",true)
	document.getElementById("petbreed-input2").removeAttribute("disabled")
	
	document.getElementById("show-image").onclick = function () {

		let breed = document.getElementById("petbreed-input2").value;
		
		fetch('https://dog.ceo/api/breed/' + breed + '/images/random')
			.then(response => response.json())
			.then(data => {
				document.getElementById("pet-image").setAttribute("src", data.message);
			});
		
		};

}else if(algo=="Gato"){
	
	document.getElementById("petbreed-input2").setAttribute("disabled",true)
	document.getElementById("petbreed-input1").removeAttribute("disabled")
	
	document.getElementById("show-image").onclick = function () {

		let breedName = document.getElementById("petbreed-input1").value;
		let breedId =catBreeds.find(breed => breedName==breed.name).id;
	
		fetch('https://api.thecatapi.com/v1/images/search?breed_ids='+breedId)
			.then(response => response.json())
			.then(data => {
				let image = data.map(cat=>cat.url);
				
				image.forEach(function(image)  {
					document.getElementById("pet-image").setAttribute("src", image)
				});
			});
		let catBreed = document.getElementById("show-imag").value;

	
	};
}
}


