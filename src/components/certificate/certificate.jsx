import CertificateRightSide from "../../assets/certificate.svg";
import TTD from "../../assets/Tanda_tangan_bapak.png";
import "./certificate.css";

// Function to format date to "1 Januari 2024"
const formatDate = (date) => {
  if (!date) return "Tanggal tidak tersedia";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Certificate({ detail }) {
  if (!detail) {
    return <p>Data sertifikat tidak tersedia</p>;
  }

  return (
    <div id="certificate-content" className="certificate-content">
      <div className="outer-outline-left-side-certificate">
        <div className="outline-left-side-certificate">
          <div className="left-side-certificate">
            <h1>SERTIFIKAT</h1>
            {/* <div className="left-side-kelulusan-magang-box">
              <h4>KELULUSAN MAGANG</h4>
            </div> */}
            <div className="certificate-number">
              <p>
                NO:{" "}
                {detail.certificateNumber || "Nomor sertifikat tidak tersedia"}
              </p>
            </div>
            <p id="certificate-diberikan-kepada">Diberikan kepada :</p>
            <h2>{detail.fullname || "Nama tidak tersedia"}</h2>
            <div className="creatificate-position">
              <p>Atas kelulusan magang telkomsel sebagai</p>
              <p className="certificate-jobdesk">
                {detail.positions || "Posisi tidak tersedia"}
              </p>
            </div>
            <div className="certificate-hand-sign">
              <p>{formatDate(detail.updatedAt)}</p> {/* Format tanggal */}
              <img src={TTD} alt="Signature" />
              <p>Nugroho</p>
              <p id="hand-sign-positions">Direktur Utama Telkomsel</p>
            </div>
          </div>
        </div>
      </div>

      <img
        id="certificate-aside"
        src={CertificateRightSide}
        alt="Certificate Design"
      />
    </div>
  );
}
