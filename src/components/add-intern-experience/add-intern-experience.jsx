/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import './add-intern-experience.css';

// Configure Axios to use the authorization token
const token = 'your-authentication-token'; // Replace with actual token
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const AddInternExperience = ({ isOpen, onClose, onSave, profile }) => {
    const [internRole, setInternRole] = useState('');
    const [internStartDate, setInternStartDate] = useState('');
    const [internEndDate, setInternEndDate] = useState('');
    const [internJobdesk, setInternJobdesk] = useState('');
    console.log("mau nambah internship",profile)

    if (!isOpen) return null;

    const handleSave = async () => {
        const newInternship = {
            fullname : profile.name,
            positions : internRole,
            startDate: internStartDate,
            endDate: internEndDate,
            jobdesk: internJobdesk,
        };

        // Log the data to be sent
        console.log('Sending data:', newInternship);

        try {
            const response = await axios.post('http://localhost:8080/internship', newInternship);

            console.log('Success:', response.data);
            onSave(newInternship);
            onClose();
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
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
