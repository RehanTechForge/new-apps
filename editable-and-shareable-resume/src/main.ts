import { setupFormHandlers } from "./formHandlers";
import { setupEditableFields } from "./editableFields";
import { setupResumeActions } from "./resumeActions";

document.addEventListener("DOMContentLoaded", () => {
  setupFormHandlers();
  setupEditableFields();
  setupResumeActions();
});
