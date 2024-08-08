import './change-name.css';


export default function ChangeName() {
    return (
        <div className="changeName-card">
            <div className="changeName-description">
                <h2>Change Full Name</h2>
                <hr></hr>
                <input type="text" placeholder="Enter new full name" className="name-input" />
            </div>
        </div>
    );
}

