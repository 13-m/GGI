var dt = new DataTransfer();

// document.querySelectorAll(".input-file input[type=file]").forEach((input) => {
//   input.addEventListener("change", function () {
//     let filesList = this.closest(".input-file").nextElementSibling;
//     filesList.innerHTML = ""; // Очистить текущий список файлов

//     Array.from(this.files).forEach((file) => {
//       let fileItem = document.createElement("div");
//       fileItem.classList.add("input-file-list-item");

//       let fileName = document.createElement("span");
//       fileName.classList.add("input-file-list-name");
//       fileName.textContent = file.name;

//       let removeLink = document.createElement("a");
//       removeLink.href = "#";
//       removeLink.textContent = "x";
//       removeLink.classList.add("input-x-list-remove");
//       removeLink.addEventListener("click", (e) => {
//         e.preventDefault();
//         removeFilesItem(file.name, this);
//       });

//       fileItem.appendChild(fileName);
//       fileItem.appendChild(removeLink);
//       filesList.appendChild(fileItem);

//       dt.items.add(file);
//     });

//     this.files = dt.files;
//   });
// });

// function removeFilesItem(name, input) {
//   let filesList = input.closest(".input-file").nextElementSibling;
//   let fileItems = filesList.querySelectorAll(".input-file-list-item");

//   // Удалить элемент из списка
//   fileItems.forEach((item) => {
//     let fileItemName = item.querySelector(".input-file-list-name").textContent;
//     if (fileItemName === name) {
//       filesList.removeChild(item);
//     }
//   });

//   // Обновить DataTransfer объект
//   let newFiles = [];
//   Array.from(dt.items).forEach((item) => {
//     if (item.getAsFile().name !== name) {
//       newFiles.push(item.getAsFile());
//     }
//   });

//   dt.items.clear();
//   newFiles.forEach((file) => dt.items.add(file));
//   input.files = dt.files; // Обновить поле ввода
// }

const max_files = 10;
document.querySelectorAll(".input-file input[type=file]").forEach((input) => {
  input.addEventListener("change", function () {
    let filesList = this.closest(".input-file").nextElementSibling;

    // Файлы, которые были выбраны до этого
    let existingFiles = Array.from(dt.items).map(
      (item) => item.getAsFile().name
    );

    if (dt.items.length >= max_files) {
      alert("Вы не можете загрузить больше 10 файлов");
      this.valie = "";
      return;
    }

    // Обработка новых файлов
    Array.from(this.files).forEach((file) => {
      if (!existingFiles.includes(file.name)) {
        // Проверка, не был ли файл уже добавлен
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

        // Добавить файл в DataTransfer
        dt.items.add(file);
      }
    });

    // Обновить список файлов в поле ввода
    this.files = dt.files;
  });
});

function removeFilesItem(name, input) {
  let filesList = input.closest(".input-file").nextElementSibling;
  let fileItems = filesList.querySelectorAll(".input-file-list-item");

  // Удалить элемент из списка
  fileItems.forEach((item) => {
    let fileItemName = item.querySelector(".input-file-list-name").textContent;
    if (fileItemName === name) {
      filesList.removeChild(item);
    }
  });

  // Обновить DataTransfer объект
  let newFiles = [];
  Array.from(dt.items).forEach((item) => {
    if (item.getAsFile().name !== name) {
      newFiles.push(item.getAsFile());
    }
  });

  dt.items.clear();
  newFiles.forEach((file) => dt.items.add(file));
  input.files = dt.files; // Обновить поле ввода
}
