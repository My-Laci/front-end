import "./ValidateUser.css";

export default function ValidateUser() {
  return (
    <div className="validate-user-container">
      <div className="validate-user-content">
        <h2>Validate User</h2>
        <hr />
        <div className="validate-user-search">
          <input type="text" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="validate-user-list">
          <div className="validate-user-detail">
            <p>Name : </p>
            <p>Email : </p>
            <p>Internship Period : </p>
            <p>Jobdesk : </p>
            <p>Position : </p>
            <button>Validate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
