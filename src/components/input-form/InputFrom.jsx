import "../input-form/InputFrom.css";

export default function InputFrom(props) {
  return (
    <div className="input-form-login-register">
      <input
        type={props.type || "text"}
        name={props.name || ""}
        value={props.value || ""}
        placeholder={props.placeholder || "Label"}
        onChange={props.onChange}
      />
    </div>
  );
}
