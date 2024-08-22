import CertificateRightSide from "../../assets/certificate.svg";
import TTD from "../../assets/Tanda_tangan_bapak.png";
import "./certificate.css";

export default function Certificate() {
  return (
    <>
      <div id="certificate-content" className="certificate-content">
        <div className="outer-outline-left-side-certificate">
          <div className="outline-left-side-certificate">
            <div className="left-side-certificate">
              <h1>SERTIFIKAT</h1>
              <div className="left-side-kelulusan-magang-box">
                <h4>KELULUSAN MAGANG</h4>
              </div>

              <p id="certificate-diberikan-kepada">Diberikan kepada :</p>
              <h2>Edo Mahendra</h2>
              <div className="creatificate-position">
                <p>Atas kelulusan magang telkomsel sebagai</p>
                <p className="certificate-jobdesk">Fullstack Developer</p>
              </div>

              <div className="certificate-hand-sign">
                <p>25 Agustus 2024</p>
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
    </>
  );
}
