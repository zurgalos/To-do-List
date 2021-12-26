// Define new array to save details in JSON
let notesListArray = [];
// Save key for local storage
const storeKey = "storeNotes";
// Save function
function saveNote() {
  // Get elements to clear inputs
  const clearText = document.getElementById("InputText");
  const clearDate = document.getElementById("InputDate");
  const clearTime = document.getElementById("InputTime");
  const text = clearText.value;
  const date = clearDate.value;
  const time = clearTime.value;
  event.preventDefault();
  const note = {
    text: text,
    date: date,
    time: time,
  };
  // Get all stored notes
  const savedNotesArrayJson = JSON.parse(localStorage.getItem(storeKey));
  if (savedNotesArrayJson != null) {
    notesListArray = savedNotesArrayJson;
  }
  // Validation
  if (text == 0) {
    alert("Please insert text!");
    clearText.focus();
    return;
  } else if (date == 0) {
    alert("Please insert a date!");
    clearDate.focus();
    return;
  }
  notesListArray.push(note);
  // Save notes list array to local storage
  const notesArrayJson = JSON.stringify(notesListArray);
  localStorage.setItem(storeKey, notesArrayJson);
  // Clear inputs after sumbit
  clearText.value = "";
  clearDate.value = "";
  clearTime.value = "";
  createNote(note, notesListArray.length);
  location.reload();
}
function createNote(note, placeInArray) {
  // Create new div to contain all p's and btn
  let div = document.createElement("div");
  // Create new elements for glyph icon Exit function
  let exitBtn = document.createElement("BUTTON");
  let exitSPAN = document.createElement("SPAN");
  // Set classes
  div.className = "MainDivContainer fade-in";
  exitBtn.className = "exitBtn btn btn-danger btn-sm";
  exitSPAN.className = "glyphicon glyphicon-remove-sign";
  exitBtn.ariaLabel = "Close";
  exitBtn.addEventListener("click", function () {
    removeItem(placeInArray);
  });
  // Create P's to contain Text, Date, Time separated
  const PText = document.createElement("P");
  const PDate = document.createElement("P");
  const PTime = document.createElement("P");
  // Set P's classes and innertext
  PText.className = "fade-in PText";
  PDate.className = "fade-in PDate";
  PTime.className = "fade-in PTime";
  PText.innerText = `${note.text}`;
  PDate.innerText = `${note.date}`;
  PTime.innerText = `${note.time}`;
  // Append Childs
  notesContainer.appendChild(div);
  div.appendChild(PText);
  div.appendChild(PDate);
  div.appendChild(PTime);
  div.appendChild(exitBtn);
  exitBtn.appendChild(exitSPAN);
}
loadNotes();
// Load Function of saved notes from local storage
function loadNotes() {
  const notesListArray = localStorage.getItem(storeKey)
    ? JSON.parse(localStorage.getItem(storeKey))
    : [];
  console.log(notesListArray);
  if (notesListArray) {
    for (const note of notesListArray) {
      createNote(note, notesListArray.indexOf(note));
    }
  }
}
// Exit Button function
function removeItem(placeInArray) {
  // Load saved json array
  const savedNotesArrayJson = localStorage.getItem(storeKey);
  let notesListArray = JSON.parse(savedNotesArrayJson);
  // Remove from local storage and display
  notesListArray.splice(placeInArray, 1);
  // Save to local storage new array
  const SavednotesArrayJson = JSON.stringify(notesListArray);
  localStorage.setItem(storeKey, SavednotesArrayJson);
  location.reload();
}
