import { useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import Certificate from "../../components/certificate/certificate";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./CertificateGenarator.css";

export default function CertificateGenerator() {
  const certificateRef = useRef();

  const handleDownload = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF("landscape", "px", [imgWidth, imgHeight]);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const scaledWidth = pdfWidth * 1;
        const scaledHeight = (imgHeight * scaledWidth) / imgWidth;

        const xOffset = (pdfWidth - scaledWidth) / 2;
        const yOffset = (pdf.internal.pageSize.getHeight() - scaledHeight) / 2;

        const borderThickness = 1;
        pdf.setDrawColor(247, 17, 35);
        pdf.setLineWidth(borderThickness);
        pdf.rect(xOffset, yOffset, scaledWidth, scaledHeight);

        pdf.addImage(
          imgData,
          "PNG",
          xOffset,
          yOffset,
          scaledWidth,
          scaledHeight
        );
        pdf.save("certificate.pdf");
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="certificate-generator-container">
        <div id="certificate" ref={certificateRef}>
          <Certificate />
        </div>
        <button onClick={handleDownload}>Download</button>
      </div>
    </>
  );
}
