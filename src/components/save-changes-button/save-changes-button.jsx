/* eslint-disable react/prop-types */
import './save-changes-button.css';

export default function SaveChangesButton({ onClick }) {
    return (
        <button className="save-button" onClick={onClick}>
            Save Changes
        </button>
    );
}