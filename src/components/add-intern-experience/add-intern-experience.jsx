import { useState } from 'react';
import './InternshipModal.css';

const InternshipModal = ({ isOpen, onClose, onSave }) => {
    const [internRole, setInternRole] = useState('');
    const [internPeriod, setInternPeriod] = useState('');
    const [internJobdesk, setInternJobdesk] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        const newInternship = {
            role: internRole,
            period: internPeriod,
            jobdesk: internJobdesk,
        };
        onSave(newInternship);
        onClose();
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
                    />
                </div>
                <div className="modal-input-group">
                    <label>Intern Period</label>
                    <input
                        type="text"
                        value={internPeriod}
                        onChange={(e) => setInternPeriod(e.target.value)}
                        placeholder="e.g., June 2023 - August 2023"
                    />
                </div>
                <div className="modal-input-group">
                    <label>Intern Jobdesk</label>
                    <input
                        type="text"
                        value={internJobdesk}
                        onChange={(e) => setInternJobdesk(e.target.value)}
                        placeholder="Enter your jobdesk"
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                    <button onClick={handleSave} className="save-button">Save</button>
                </div>
            </div>
        </div>
    );
};

export default InternshipModal;