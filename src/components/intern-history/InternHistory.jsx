import { useState } from 'react';
import "./InternHistory.css";
import editIcon from '../../assets/editIcon.svg';
import AddInternExperience from "../add-intern-experience/add-intern-experience";
import InternshipDetail from "../internship-detail/InternshipDetail";

import "./InternHistory.css";

export default function InternHistory({ internship }) {
  return (
    <div className="intern-history-container">
      <div className="intern-history-header">
        <h2>Internship Experience</h2>
        <button className="internship-edit" onClick={handleEditClick}>
          <img src={editIcon} alt="Edit" className="internship-edit-icon" />
        </button>
      </div>
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

      <AddInternExperience
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveInternship}
      />
    </div>
  );
}