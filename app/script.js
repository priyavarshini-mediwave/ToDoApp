works = [
  { id: 1, name: "Clean the house", ischecked: false },
  {
    id: 2,
    name: "Cook food",
    ischecked: false,
  },
];
function updateUI() {
  clearapp();
  for (let i = 0; i < works.length; i++) {
    let work = makeWorkdiv(works[i]);
    //appendtoapp(work);
  }
}
function clearapp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}
function makeWorkdiv(work) {
  if (work.ischecked) {
    const ulwork = document.createElement("ul");
    ulwork.setAttribute("class", "ulwork");
    ulwork.setAttribute("id", "ulwork");

    const liwork = document.createElement("li");
    liwork.setAttribute("class", "liwork");
    liwork.setAttribute("id", `liwork-${work.id}`);

    const checkinput = document.createElement("input");
    checkinput.setAttribute("type", "checkbox");
    checkinput.checked = true;
    checkinput.setAttribute("class", "checkinput");
    checkinput.setAttribute("id", `check-${work.id}`);
    checkinput.setAttribute("name", `check-${work.id}`);
    checkinput.setAttribute("value", work.name);

    const p = document.createElement("p");
    p.setAttribute("class", "para");
    p.setAttribute("id", `para-${work.id}`);
    p.innerHTML = work["name"];
    p.style.textDecoration = "line-through";

    liwork.appendChild(checkinput);
    liwork.appendChild(p);
    ulwork.appendChild(liwork);
    checkinput.addEventListener("change", function () {
      if (checkinput.checked) {
        checktheCheckBox(work["id"], true);
      } else {
        checktheCheckBox(work["id"], false);
      }
    });
    //return li;
    const app = document.querySelector("#app");
    app.appendChild(ulwork);
  } else {
    //<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
    // <label for="vehicle1"> I have a bike</label><br></br>
    const checkinput = document.createElement("input");
    checkinput.setAttribute("type", "checkbox");
    checkinput.setAttribute("class", "checkinput");
    checkinput.setAttribute("id", `check-${work.id}`);
    checkinput.setAttribute("name", `check-${work.id}`);
    checkinput.setAttribute("value", work.name);

    //   const checklabel=document.createElement('label')
    //   checklabel.setAttribute('for',`check-${work.id}`)
    var labelText = document.createElement("p");
    labelText.htmlFOR = `check-${work.id}`;
    labelText.innerHTML = work.name;
    labelText.style.textDecoration = " ";
    console.log(checkinput);

    const ulwork = document.createElement("ul");
    ulwork.setAttribute("class", "ulwork");
    ulwork.setAttribute("id", "ulwork");
    const liwork = document.createElement("li");
    liwork.setAttribute("class", "liwork");
    liwork.setAttribute("id", `liwork-${work.id}`);

    liwork.appendChild(checkinput);
    liwork.appendChild(labelText);

    ulwork.appendChild(liwork);

    checkinput.addEventListener("change", function () {
      if (checkinput.checked) {
        checktheCheckBox(work["id"], true);
      }
    });

    //appending to screen
    const app = document.querySelector("#app");
    app.appendChild(ulwork);
  }
}

function checktheCheckBox(workId, bool) {
  const tocheckIndex = works.findIndex((work) => work.id == workId);
  if (tocheckIndex != -1) {
    works[tocheckIndex]["ischecked"] = bool;
    sortworksArray();
    savetoLocal();
    updateUI();
  }
}
function sortworksArray() {
  works.sort((a, b) =>
    a.ischecked === b.ischecked ? 0 : a.ischecked ? 1 : -1
  );
}

function hookform() {
  const form = document.querySelector("#add-task-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.querySelector("#work-input");
    let namevalue = name.value;

    const work = {
      id: new Date().getTime(),
      name: namevalue,
      ischecked: false,
    };
    addWork(work);

    refresh();
  });
}
function addWork(work) {
  works.push(work);
  savetoLocal();
  updateUI();
}
function refresh() {
  let name = document.querySelector("#work-input");
  name.value = "";
}
function savetoLocal() {
  const str = JSON.stringify(works);
  localStorage.setItem("my-works-list", str);
}

function getfromLocal() {
  const str = localStorage.getItem("my-works-list");
  if (!str) {
    return works;
  } else {
    works = JSON.parse(str);
  }
}

/*let name = document.querySelector("#work-input");
let buttoninput=document.querySelector("#work-input-btn")
name.addEventListener('input', () => {
    if (name.value.length <= 0) {
        buttoninput.disabled = true;
    }
    else {
        buttoninput.disabled = false;
    }
});*/

getfromLocal();
updateUI();
hookform();
