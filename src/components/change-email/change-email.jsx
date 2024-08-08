import './change-email.css';


export default function ChangeEmail() {
    return (
        <div className="changeEmail-card">
            <div className="changeEmail-description">
                <h2>Change Email</h2>
                <hr></hr>
                <input type="text" placeholder="Enter New Email" className="changeEmail-email-input" />
            </div>
        </div>
    );
}

