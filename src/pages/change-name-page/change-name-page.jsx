import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
// import "./change-name-page.css";
import ChangeName from "../../components/change-name/change-name.jsx";
import SaveChangesButton from "../../components/save-changes-button/save-changes-button.jsx";

const ChangeNamePage = () => {
  return (
    <>
      <Navbar />
      <div className="change-name-container">
        <Sidebar />
        <div className="content">
          <ChangeName />
          <SaveChangesButton />
        </div>
      </div>
    </>
  );
};

export default ChangeNamePage;
