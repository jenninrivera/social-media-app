import { Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import "./Suggestions.css";

function Suggestions() {
return (
    <div className="suggestions">
    <div className="suggestions__title">Suggestions for you</div>
    <div className="suggestions__usernames">
        <div className="suggestions__username">
        <div className="username__left">
            <span className="avatar">
            <div id="sugges1"></div>
            </span>
            <div className="username__info">
            <span className="username">samantharedding</span>
            <span className="relation">New to Skygram</span>
            </div>
        </div>
        <button className="follow__button">Follow</button>
        </div>

        <div className="suggestions__username">
        <div className="username__left">
            <span className="avatar">
            <div id="sugges2"></div>
            </span>
            <div className="username__info">
            <span className="username">nomadnathan</span>
            <span className="relation">New to Skygram</span>
            </div>
        </div>
        <button className="follow__button">Follow</button>
        </div>

        <div className="suggestions__username">
        <div className="username__left">
            <span className="avatar">
            <div id="sugges3"></div>
            </span>
            <div className="username__info">
            <span className="username">catachmejess</span>
            <span className="relation">New to Skyagram</span>
            </div>
        </div>
        <button className="follow__button">Follow</button>
        </div>

        <div className="suggestions__username">
        <div className="username__left">
            <span className="avatar">
            <div id="sugges4"></div>
            </span>
            <div className="username__info">
            <span className="username">emilydelta</span>
            <span className="relation">New to Skygram</span>
            </div>
        </div>
        <button className="follow__button">Follow</button>
        </div>
    </div>
    </div>
);
}

export default Suggestions;
