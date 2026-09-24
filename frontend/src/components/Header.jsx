import React from "react";

function Header({ title = "Dashboard", subtitle = "" }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="header-right">
        <button className="notification-button" title="Notifications">
          <span>♢</span>
          <i></i>
        </button>

        <div className="header-divider"></div>

        <div className="user-profile">
          <div className="user-avatar">DR</div>

          <div className="user-info">
            <strong>Dr. Admin</strong>
            <span>Clinical Team</span>
          </div>

          <span className="profile-arrow">⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Header;