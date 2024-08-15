import "../input-form/InputFrom.css"

export default function InputFrom(props) {
    return (
    <div className="input-form">
        <input type={props.type || "text"} name="" id="" placeholder={props.placeholder || "Label"}/>
    </div>    
    )
}
