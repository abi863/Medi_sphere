import React from "react";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "▦",
      page: "dashboard",
    },
    {
      name: "Patients",
      icon: "♙",
      page: "patients",
    },
    {
      name: "Patient 360",
      icon: "◎",
      page: "patient360",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">M</div>

        <div>
          <h2>MediSphere</h2>
          <span>Cognitive Twin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <button
            key={item.page}
            className={`nav-item ${
              activePage === item.page ? "active" : ""
            }`}
            onClick={() => setActivePage(item.page)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="system-status">
          <span className="status-dot"></span>

          <div>
            <strong>System Online</strong>
            <small>Prototype Mode</small>
          </div>
        </div>

        <div className="sidebar-footer">
          <span>© 2026 MediSphere</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;