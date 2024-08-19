var dt = new DataTransfer();

// toggle/switch
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const sectionAbit = document.getElementById("abit");
const sectionDiploma = document.getElementById("diplomSec");
const sectionScientist = document.getElementById("scientist");
const sectionAdditional = document.getElementById("additional");

function curSelect() {
  if (option1.checked) {
    console.log("Current select: Абитуриент");
    sectionAbit.classList.toggle("hidden");
    sectionDiploma.classList.toggle("hidden");
    sectionScientist.classList.toggle("hidden");
    sectionAdditional.classList.toggle("hidden");
  } else if (option2.checked) {
    sectionAbit.classList.toggle("hidden");
    sectionDiploma.classList.toggle("hidden");
    sectionScientist.classList.toggle("hidden");
    sectionAdditional.classList.toggle("hidden");

    console.log("Current select: Аспирант");
  }
}
option1.addEventListener("change", curSelect);
option2.addEventListener("change", curSelect);

const select = document.getElementById("date-select");
for (let year = 2024; year >= 1910; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  select.appendChild(option);
}

const choices = new Choices(select, {
  searchEnabled: false,
  itemSelectText: "",
  sorter: function (a, b) {
    return b.label.length - a.label.length;
  },
});

for (let year = 1920; year <= 2025; year++) {
  let option = document.createElement("option");
  option.value = year;
  option.innerHTML = year;
  document.getElementById("date-select").appendChild(option);
}

// end toggle

const max_files = 10;
document.querySelectorAll(".input-file input[type=file]").forEach((input) => {
  input.addEventListener("change", function () {
    let filesList = this.closest(".input-file").nextElementSibling;

    let existingFiles = Array.from(dt.items).map(
      (item) => item.getAsFile().name
    );

    if (dt.items.length >= max_files) {
      alert("Вы не можете загрузить больше 10 файлов");
      this.valie = "";
      return;
    }

    Array.from(this.files).forEach((file) => {
      if (!existingFiles.includes(file.name)) {
        let fileItem = document.createElement("div");
        fileItem.classList.add("input-file-list-item");

        let fileName = document.createElement("span");
        fileName.classList.add("input-file-list-name");
        fileName.textContent = file.name;

        let removeLink = document.createElement("a");
        removeLink.href = "#";
        removeLink.textContent = "x";
        removeLink.classList.add("input-file-list-remove");
        removeLink.addEventListener("click", (e) => {
          e.preventDefault();
          removeFilesItem(file.name, this);
        });

        let fileSvg = document.createElement("div");
        fileSvg.classList.add("input-file-svg");

        fileItem.appendChild(fileSvg);
        fileItem.appendChild(fileName);
        fileItem.appendChild(removeLink);
        filesList.appendChild(fileItem);

        dt.items.add(file);
      }
    });

    this.files = dt.files;
  });
});

function removeFilesItem(name, input) {
  let filesList = input.closest(".input-file").nextElementSibling;
  let fileItems = filesList.querySelectorAll(".input-file-list-item");

  fileItems.forEach((item) => {
    let fileItemName = item.querySelector(".input-file-list-name").textContent;
    if (fileItemName === name) {
      filesList.removeChild(item);
    }
  });

  let newFiles = [];
  Array.from(dt.items).forEach((item) => {
    if (item.getAsFile().name !== name) {
      newFiles.push(item.getAsFile());
    }
  });

  dt.items.clear();
  newFiles.forEach((file) => dt.items.add(file));
  input.files = dt.files;
}

// загрузчик аватарки

document.getElementById("file-input").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = document.getElementById("image-preview");
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});
