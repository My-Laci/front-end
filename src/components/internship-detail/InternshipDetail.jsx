import "./InternshipDetail.css";
import { Link } from "react-router-dom";

export default function InternshipDetail() {
  return (
    <div className="internship-detail">
      <div className="intern-job-desk">
        <h4>Fullstack Web Developer </h4>
        <div className="detail-jobdesk">
          <li>Develop laci</li>
          <li>Deploy laci</li>
        </div>
      </div>
      <div className="intern-time">
        <p>February 2024 - Juni 2024</p>
        <Link to="/Certificate" className="internship-certificate-link">Certificate</Link>
      </div>
    </div>
  );
}
