import "./InternshipDetail.css";
import { Link } from "react-router-dom";

export default function InternshipDetail({ detail }) {
  const { positions, jobdesk, startDate, endDate } = detail;

  // Function to format date to "Month YYYY"
  const formatDate = (date) => {
    if (!date) return "Date unknown";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="internship-detail">
      <div className="intern-job-desk">
        <h4>{positions}</h4>
        <div className="detail-jobdesk">
          {jobdesk && jobdesk.length > 0 ? (
            jobdesk.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <p>No job desk available</p>
          )}
        </div>
      </div>
      <div className="intern-time">
        <p>
          {startDate ? formatDate(startDate) : "Start date unknown"} -{" "}
          {endDate ? formatDate(endDate) : "Ongoing"}
        </p>
        <Link
          to="/Certificate"
          state={{ detail }}  // Mengirim data sebagai state
          className="internship-certificate-link"
        >
          Certificate
        </Link>
      </div>
    </div>
  );
}
