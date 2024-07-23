import RegisterSide from "../assets/Register-side.svg"
import "../styles/register.css"

function Register() {
  return (
    <>
      <div className="container">
        <div className="left-container">
            <img src={RegisterSide} alt="" />
        </div>
        <div className="right-container">
          <h1>Register</h1>
          <p>
            To be able to create an account, you must be a part of the
            <span>Telkomsel Internship Programs.</span>
          </p>
          <input type="text" placeholder="Name" />
          <p>Enter the code you received from your mentor down below.</p>
          <button>Continue</button>
          <p>
            Already have an account?<a href="#">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
