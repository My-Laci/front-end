import "../green-button/GreenButton.css";

export default function GreenButton(props) {
  return <button id="green-button">{props.label || "Label"}</button>;
}
