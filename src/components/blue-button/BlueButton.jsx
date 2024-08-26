import "../blue-button/BlueButton.css";

// eslint-disable-next-line react/prop-types
export default function BlueButton({ label, onClick }) {
  return (
    <button id="blue-button" onClick={onClick}>
      {label || "Label"}
    </button>
  );
}
