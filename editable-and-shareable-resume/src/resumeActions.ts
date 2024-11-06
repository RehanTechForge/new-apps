import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { gatherFormData } from "./ResumeDataCollector";

const shareResume = (): void => {
  const uniqueUrlSpan = document.getElementById("uniqueUrl") as HTMLSpanElement;
  const uniqueUrl = uniqueUrlSpan.textContent;
  if (!uniqueUrl) {
    console.error("URL is missing.");
    return;
  }
  if (navigator.share) {
    navigator
      .share({
        title: `${gatherFormData().name}'s Resume`,
        text: "Check out my resume!",
        url: uniqueUrl,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    prompt("Copy this link to share your resume:", uniqueUrl);
  }
};

const downloadResume = (): void => {
  const resumeContent = document.getElementById(
    "resumeContent"
  ) as HTMLDivElement;
  const doc = new jsPDF();

  html2canvas(resumeContent).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    doc.save(`${gatherFormData().name}_resume.pdf`);
  });
};
export function setupResumeActions(): void {
  const shareButton = document.getElementById(
    "shareButton"
  ) as HTMLButtonElement;
  const downloadButton = document.getElementById(
    "downloadButton"
  ) as HTMLButtonElement;

  shareButton.addEventListener("click", shareResume);
  downloadButton.addEventListener("click", downloadResume);
}
