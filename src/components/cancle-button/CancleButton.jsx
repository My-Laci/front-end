import CancleIcon from "../../assets/cancle-icon.svg"
import "./CancleButton.css"

export default function CancleButton () {
    return (
        <a href="#" className="cancle-button-styling">
            <img src={CancleIcon} alt="" />
        </a>
    )
}