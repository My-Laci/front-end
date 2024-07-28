import "../blue-button/BlueButton.css";

export default function BlueButton(props) {
  return <button id="blue-button">{props.label || "Label"}</button>;
}
