/* eslint-disable react/prop-types */
import { useState } from 'react';
import './add-intern-experience.css';

const AddInternExperience = ({ isOpen, onClose, onSave }) => {
    const [internRole, setInternRole] = useState('');
    const [internPeriod, setInternPeriod] = useState('');
    const [internJobdesk, setInternJobdesk] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        // const newInternship = {
        //     role: internRole,
        //     period: internPeriod,
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
                        className="modal-password-input"
                    />
                </div>
                <div className="modal-input-group">
                    <label>Intern Period</label>
                    <input
                        type="text"
                        value={internPeriod}
                        onChange={(e) => setInternPeriod(e.target.value)}
                        placeholder="e.g., June 2023 - August 2023"
                        className="modal-password-input"
                    />
                </div>
                <div className="modal-input-group">
                    <label>Intern Jobdesk</label>
                    <input
                        type="text"
                        value={internJobdesk}
                        onChange={(e) => setInternJobdesk(e.target.value)}
                        placeholder="Enter your jobdesk"
                        className="modal-password-input"
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
