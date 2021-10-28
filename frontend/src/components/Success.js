import React, { Fragment } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Success.css";
import { Link } from "react-router-dom";
import MetaData from "../utils/title/MetaData";

const Success = ({message, url, btn, p, title}) => {
    return (
        <Fragment>
            <MetaData title={title}/>
        <div className='responsivePage'>
            <div className="SuccessN">
                <CheckCircleIcon />
                <h2>{message}</h2>
                <p>{p}</p>
                <Link to={url}>
                    <div className='btnPrimary success'>{btn}</div>
                </Link>
            </div>
        </div>
        </Fragment>
    )
}

export default Success
