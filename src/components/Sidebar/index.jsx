import { Link } from "react-router-dom"

import style from "./style.module.css"

const Sidebar = () => {
    return(
        <div className={style.container}>
            <ul>
                <Link to={"/"}><li>Home</li></Link>
                <Link to={"/buy"}><li>Buy</li></Link>
                <Link to={"/ticket"}><li>Ticket</li></Link>
            </ul>
        </div>
    )
}

export default Sidebar