import InternshipDetail from "../internship-detail/InternshipDetail";

import "./InternHistory.css";

export default function InternHistory() {
  return (
    <div className="intern-history-container">
      <h2>Internship Experience</h2>
      <hr />
      <div className="internship-detail-container">
        <InternshipDetail />
      </div>
    </div>
  );
}
