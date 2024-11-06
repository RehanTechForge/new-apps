import {
  generateEditableContent,
  generateSavedContent,
} from "./content/contentGenerators";
import { EditableField, FieldType } from "./types/types";

export function setupEditableFields(): void {
  const editableFields = document.querySelectorAll(".editable");
  editableFields.forEach((field) => {
    const editButton = field.querySelector(".edit-button") as HTMLButtonElement;
    if (editButton) {
      editButton.addEventListener("click", () =>
        makeEditable(field as EditableField)
      );
    }
  });
}

function makeEditable(field: EditableField): void {
  const fieldType = field.dataset.field as FieldType;
  const content = generateEditableContent(field, fieldType);

  if (content !== undefined) {
    field.innerHTML = content;
    field.classList.add("editing");

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => saveEdit(field, fieldType));
    field.appendChild(saveButton);
  }
}

const saveEdit = (field: EditableField, fieldType: FieldType): void => {
  const newContent = generateSavedContent(field, fieldType);

  field.innerHTML = newContent;
  field.classList.remove("editing");

  // Add Edit button back with event listener
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-button";
  editButton.addEventListener("click", () => makeEditable(field));
  field.appendChild(editButton);
};
