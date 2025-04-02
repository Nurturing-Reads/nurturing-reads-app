import React from "react";
import "./ToolBox_style.css";

export default function ToolBox() {
	return (
    <div className="box">
      <div className="group">
        <img className="img" alt="Group" src="group.png" />
        <div className="overlap">
          <img className="ellipse" alt="Ellipse" src="ellipse-9.svg" />
          <div className="frame">
            <div className="text-wrapper">Profile</div>
          </div>
        </div>
        <div className="div-wrapper">
          <div className="text-wrapper">Explore</div>
        </div>
        <div className="overlap-group">
          <div className="history-wrapper">
            <div className="text-wrapper"> History</div>
          </div>
          <div className="iconly-light-outline" />
        </div>
        <div className="div">
          <div className="text-wrapper">Inbox</div>
        </div>
      </div>
    </div>
  );
}

