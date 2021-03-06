class Event {
	constructor(artistName, date, category, arena) {
		this.artistName = artistName;
		this.date = date;
		this.category = category;
		this.arena = arena;
	}
}
/*--------------ARENA------------------*/
class Arena {
	constructor() {
		if (localStorage.getItem("arenaStorage") === null) {
			localStorage.setItem(
				"arenaStorage",
				JSON.stringify(["Globen", "Annexet"])
			);
		}
	}

	addArena() {
		// adderar ny arena från admin gränsnitt till localStorage och sparar i array

		let arenaStorage = JSON.parse(localStorage.getItem("arenaStorage"));
		let arenaName = document.getElementById("arena-name").value;

		arenaStorage.push(arenaName);

		// arenaStorage[arenaStorage.idCounter] = this.arenaArray;

		localStorage.setItem("arenaStorage", JSON.stringify(arenaStorage));
		AdminUI.createSelectMenus();
	}

	removeArena(arena_delete) {
		//Hämtar arenaStorage från localStorage, tar bort eventet med id:et som användaren klickade på,
		//skriver över arenaStorage i localStorage.
		let arenaStorage = JSON.parse(localStorage.getItem("arenaStorage"));
		arenaStorage.splice(arenaStorage.indexOf(arena_delete), 1);
		localStorage.setItem("arenaStorage", JSON.stringify(arenaStorage));
	}

	editArena(arena_edit, obj) {
		let arenaStorage = JSON.parse(localStorage.getItem("arenaStorage"));
		document.getElementById("arena-name").value = arena_edit;
		//när admin trycker Ändra då vill vi spara detta nya värde

		let saveBtn = document.getElementById("arena-edit-btn");

		let saveFunction = () => {
			let arenaName = document.getElementById("arena-name").value;
			arenaStorage[arenaStorage.indexOf(arena_edit)] = arenaName;
			localStorage.setItem("arenaStorage", JSON.stringify(arenaStorage));
			saveBtn.removeEventListener("click", saveFunction);

			document.getElementById("arena-submit-btn").style.display = "inline";
			document.getElementById("arena-edit-btn").style.display = "none";
			AdminUI.clearArenaForm();
			AdminUI.clearArenaTable();
			AdminUI.showArenas();
			obj.updateEvents("arena", [arena_edit, arenaName]);
			AdminUI.createSelectMenus();
			saveBtn.removeAttribute("listener");
		};

		if (!saveBtn.getAttribute("listener") === true) {
			saveBtn.addEventListener("click", saveFunction);
			saveBtn.setAttribute("listener", "added");
		}
	}
}

/*--------------KATEGORI------------------*/
class Category {
	constructor() {
		if (localStorage.getItem("categoryStorage") === null) {
			localStorage.setItem("categoryStorage", JSON.stringify(["Jazz", "Rock"]));
		}
	}

	addCategory() {
		let categoryStorage = JSON.parse(localStorage.getItem("categoryStorage"));
		let categoryName = document.getElementById("category-name").value;

		categoryStorage.push(categoryName);

		localStorage.setItem("categoryStorage", JSON.stringify(categoryStorage));
		AdminUI.createSelectMenus();
	}

	removeCategory(category_delete) {
		let categoryStorage = JSON.parse(localStorage.getItem("categoryStorage"));
		categoryStorage.splice(categoryStorage.indexOf(category_delete), 1);
		localStorage.setItem("categoryStorage", JSON.stringify(categoryStorage));
	}
	editCategory(category_edit, obj) {
		let categoryStorage = JSON.parse(localStorage.getItem("categoryStorage"));
		document.getElementById("category-name").value = category_edit;
		//när admin trycker EDIT då vill vi spara detta nya värde

		let saveBtn = document.getElementById("category-edit-btn");

		let saveFunction = () => {
			let categoryName = document.getElementById("category-name").value;
			categoryStorage[categoryStorage.indexOf(category_edit)] = categoryName;
			localStorage.setItem("categoryStorage", JSON.stringify(categoryStorage));
			saveBtn.removeEventListener("click", saveFunction);

			document.getElementById("category-submit-btn").style.display = "inline";
			document.getElementById("category-edit-btn").style.display = "none";
			AdminUI.clearCategoryForm();
			AdminUI.clearCategoryTable();
			AdminUI.showCategory();
			obj.updateEvents("category", [category_edit, categoryName]);
			AdminUI.createSelectMenus();
			saveBtn.removeAttribute("listener");
		};

		if (!saveBtn.getAttribute("listener") === true) {
			saveBtn.addEventListener("click", saveFunction);
			saveBtn.setAttribute("listener", "added");
		}
	}
}

class EventControl {
	//Skapar ett nytt objekt: eventstorage som innehåller en id-counter och alla eventobjekt.
	//koden i konstruktorn körs bara första gången man laddar sidan.
	constructor() {
		if (localStorage.getItem("eventStorage") === null) {
			localStorage.setItem("eventStorage", JSON.stringify({ idCounter: 0 }));
		}
	}
	createEvent() {
		//skapa ett nytt eventobjekt. Hämtar eventStorage från localstorage och lägger in det nya objektet. Lägger till ++ på id-counter
		//och uppdaterar eventStorage i localStorage
		let artist = document.getElementById("artist-name").value;
		let date = document.getElementById("date").value;
		let category = document.getElementById("category-select").value;
		let arena = document.getElementById("arena-select").value;

		let event = new Event(artist, date, category, arena);

		let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));
		eventStorage[eventStorage.idCounter] = event;
		eventStorage.idCounter++;

		localStorage.setItem("eventStorage", JSON.stringify(eventStorage));
	}

	removeEventObject(id) {
		//Hämtar eventStorage från localStorage, tar bort eventet med id:et som användaren klickade på, skriver över eventStorage i localStorage.
		let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));
		delete eventStorage[id];
		localStorage.setItem("eventStorage", JSON.stringify(eventStorage));
	}

	editEventObject(id) {
		//Uppdaterar ett event.
		//Hämtar eventStorage från localStorange. Värdena från eventet som användaren tryckte på läggs in i form.
		//eventlistener-funktionen skapar ett nytt event-objekt och skriver över det gamla objektet i eventStorage. Sedan läggs eventStorage in i localStorage igen.
		//I slutet av eventlistenerfunktionen tas eventlistener bort, redigera-knappen blir osynlig och visar den ursprungliga submit-knappen.
		let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));

		document.getElementById("artist-name").value = eventStorage[id].artistName;
		document.getElementById("date").value = eventStorage[id].date;
		document.getElementById("category-select").value =
			eventStorage[id].category;
		document.getElementById("arena-select").value = eventStorage[id].arena;

		let saveBtn = document.getElementById("event-edit-btn");

		let saveFunction = () => {
			let artist = document.getElementById("artist-name").value;
			let date = document.getElementById("date").value;
			let category = document.getElementById("category-select").value;
			let arena = document.getElementById("arena-select").value;

			let event = new Event(artist, date, category, arena);

			eventStorage[id] = event;
			localStorage.setItem("eventStorage", JSON.stringify(eventStorage));
			saveBtn.removeEventListener("click", saveFunction);

			document.getElementById("event-submit-btn").style.display = "inline";
			document.getElementById("event-edit-btn").style.display = "none";
			AdminUI.clearForm();
			AdminUI.clearTable();
			AdminUI.showEvents();
			saveBtn.removeAttribute("listener");
		};

		//om saveBtn har attributet listener, gör inte det här.
		if (!saveBtn.getAttribute("listener") === true) {
			saveBtn.addEventListener("click", saveFunction);
			saveBtn.setAttribute("listener", "added");
		}
	}

	updateEvents(obj, valueArray) {
		let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));
		delete eventStorage.idCounter;
		let keys = Object.keys(eventStorage);
		for (let key of keys) {
			if (eventStorage[key][obj] === valueArray[0]) {
				eventStorage[key][obj] = valueArray[1];
			}
		}
		localStorage.setItem("eventStorage", JSON.stringify(eventStorage));
		AdminUI.clearTable();
		AdminUI.showEvents();
	}
}

class AdminUI {
	//Kontrollerar vad som visar på skärmen i admingränssnittet

	static createSelectMenus() {
		//skapar options för arena och categories select-menyer
		//hämta data från localStorage för kategorier.
		let categories = JSON.parse(localStorage.getItem("categoryStorage"));
		let categorySelect = document.getElementById("category-select");
		categorySelect.innerHTML =
			'<option value="-" selected>Välj en kategori</option>';

		//loopa igenom varje array och sätt värdet som option.
		for (let category of categories) {
			categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
		}

		//hämta data från localStorage för select.
		let arenas = JSON.parse(localStorage.getItem("arenaStorage"));
		let arenaSelect = document.getElementById("arena-select");
		arenaSelect.innerHTML = '<option value="-" selected>Välj en arena</option>';

		for (let arena of arenas) {
			arenaSelect.innerHTML += `<option value="${arena}">${arena}</option>`;
		}
	}

	static showEvents() {
		//Går igenom alla events i localstorage och skriver ut dem i en tabell. Om key är idCounter hoppar den över
		let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));
		let keys = Object.keys(eventStorage).sort();
		for (let key of keys) {
			if (key !== "idCounter") {
				
				let eventObject = eventStorage[key];
				let table = document.getElementById("event-table");
				let tr = document.createElement("tr");
				tr.id = key;
				tr.innerHTML += `
                <td>${eventObject.artistName}</td>
                <td>${eventObject.date}</td>
                <td>${eventObject.category}</td>
                <td>${eventObject.arena}</td>
                <td><span class='delete'>DELETE</span></td> 
                <td><span class='edit'>EDIT</span></td>
           		 `;
				table.append(tr);
			}
		}
	}

	static clearTable() {
		//Rensar tabellen med events.
		let eventTable = document.getElementById("event-table");
		eventTable.innerHTML =
			"<tr>" + eventTable.firstElementChild.innerHTML + "</tr>";
	}

	static clearForm() {
		//Återställer formuläret
		document.getElementById("event-flex-form").reset();
	}

	/*------------category---------------------------*/
	static showCategory() {
		//metod som visar en lista/tabell kategorierna
		let categoryStorage = JSON.parse(localStorage.getItem("categoryStorage"));

		for (let category of categoryStorage) {
			let categoryTable = document.getElementById("category-table");
			let category_tr = document.createElement("tr");
			category_tr.innerHTML += `
                <td>${category}</td>
                <td><span class='delete'>DELETE</span></td> 
                <td><span class='edit'>EDIT</span></td>
           		 `;
			categoryTable.append(category_tr);
		}
	}

	static clearCategoryForm() {
		document.getElementById("category-flex-form").reset();
	}

	static clearCategoryTable() {
		//Rensar tabellen med events.
		let categoryTable = document.getElementById("category-table");
		categoryTable.innerHTML =
			"<tr>" + categoryTable.firstElementChild.innerHTML + "</tr>";
	}

	/*------------ARENA---------------------------*/
	static showArenas() {
		//metod som visar en lista/tabell med arenorna
		let arenaStorage = JSON.parse(localStorage.getItem("arenaStorage"));

		for (let arena of arenaStorage) {
			let arenaTable = document.getElementById("arena-table");
			let arena_tr = document.createElement("tr");
			arena_tr.innerHTML += `
                <td>${arena}</td>
                <td><span class='delete'>DELETE</span></td> 
                <td><span class='edit'>EDIT</span></td>
           		 `;
			arenaTable.append(arena_tr);
		}
	}

	static clearArenaForm() {
		document.getElementById("arena-flex-form").reset();
	}

	static clearArenaTable() {
		//Rensar tabellen med events.
		let arenaTable = document.getElementById("arena-table");
		arenaTable.innerHTML =
			"<tr>" + arenaTable.firstElementChild.innerHTML + "</tr>";
	}
}
