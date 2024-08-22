/* eslint-disable react/prop-types */
import { useState } from 'react';
import './add-intern-experience.css';

// eslint-disable-next-line no-unused-vars
const AddInternExperience = ({ isOpen, onClose, onSave }) => {
    const [internRole, setInternRole] = useState('');
    const [internStartDate, setInternStartDate] = useState('');
    const [internEndDate, setInternEndDate] = useState('');
    const [internJobdesk, setInternJobdesk] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        // const newInternship = {
        //     role: internRole,
        //     startDate: internStartDate,
        //     endDate: internEndDate,
        //     jobdesk: internJobdesk,
        // };
        // onSave(newInternship);
        // onClose();

        //back end disini?
    };

    return (
        <div className="internship-modal-overlay">
            <div className="internship-modal">
                <h2>Add Internship Experience</h2>
                <div className="modal-input-group">
                    <label>Intern Role</label>
                    <input
                        type="text"
                        value={internRole}
                        onChange={(e) => setInternRole(e.target.value)}
                        placeholder="Enter your role"
                        className="intern-modal-input"
                    />
                </div>
                <div className="modal-input-group">
                    <label>Intern Start Date</label>
                    <input
                        type="month"
                        value={internStartDate}
                        onChange={(e) => setInternStartDate(e.target.value)}
                        placeholder="MM-YYYY"
                        className="intern-modal-input"
                    />
                </div>
                <div className="modal-input-group">
                    <label>Intern End Date</label>
                    <input
                        type="month"
                        value={internEndDate}
                        onChange={(e) => setInternEndDate(e.target.value)}
                        placeholder="MM-YYYY"
                        className="intern-modal-input"
                    />
                </div>
                <div className="modal-input-group">
                    <label>Intern Jobdesk</label>
                    <input
                        type="text"
                        value={internJobdesk}
                        onChange={(e) => setInternJobdesk(e.target.value)}
                        placeholder="Enter your jobdesk"
                        className="intern-modal-input"
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose} className="intern-cancel-button">Cancel</button>
                    <button onClick={handleSave} className="intern-save-button">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddInternExperience;
