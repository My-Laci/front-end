import InternshipDetail from "../internship-detail/InternshipDetail";

import "./InternHistory.css";

export default function InternHistory({ internship }) {
  return (
    <div className="intern-history-container">
      <h2>Internship Experience</h2>
      <hr />
      <div className="internship-detail-container">
        {internship.length > 0 ? (
          internship.map((item, index) => (
            <InternshipDetail key={index} detail={item} />
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
