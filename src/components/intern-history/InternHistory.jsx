import { useState } from 'react';
import "./InternHistory.css";
import editIcon from '../../assets/editIcon.svg';
import AddInternExperience from "../add-intern-experience/add-intern-experience";
import InternshipDetail from "../internship-detail/InternshipDetail";

export default function InternHistory({ internship }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveInternship = (newInternship) => {
    setIsModalOpen(false);
    console.log("New Internship Experience Saved", newInternship);
  };

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
          <p>No internship experience added yet.</p>
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
