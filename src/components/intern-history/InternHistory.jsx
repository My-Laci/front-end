import { useState } from 'react';
import "./InternHistory.css";
import editIcon from '../../assets/editIcon.svg';
import AddInternExperience from "../add-intern-experience/add-intern-experience";
import InternshipDetail from "../internship-detail/InternshipDetail";

export default function InternHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internships, setInternships] = useState([
    {
      id: 1,
      role: "Fullstack Web Developer",
      period: "February 2024 - June 2024",
      jobdesk: ["Develop laci", "Deploy laci"]
    },
    {
      id: 2,
      role: "Backend Developer",
      period: "January 2023 - March 2023",
      jobdesk: ["Develop API", "Integrate database"]
    }
  ]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveInternship = (newInternship) => {
    setInternships([...internships, newInternship]);
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
        <InternshipDetail />
      </div>

      <AddInternExperience
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveInternship}
      />
    </div>
  );
}