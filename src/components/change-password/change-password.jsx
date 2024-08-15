import './change-password.css';


export default function ChangePassword() {
    return (
        <div className="changePassword-card">
            <div className="changePassword-description">
                <h2>Change Password</h2>
                <hr></hr>
                <input type="text" placeholder="Enter your current password" className="changePassword-password-input" />
                <div className='changePassword-new-input'>
                    <input type="text" placeholder="Enter your new password" className="changePassword-password-input" />
                    <input type="text" placeholder="Re-enter your new password" className="changePassword-password-input" />
                </div>


            </div>
        </div>
    );
}

