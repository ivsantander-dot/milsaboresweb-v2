import React from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      <div
        className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-3"
        style={{ width: "250px" }}
      >
        <Nav className="flex-column flex-grow-1">

          <Nav.Link href="#" className="text-white mb-3 fs-5 fw-bold">
            PMS
          </Nav.Link>

          <hr className="sidebar-divider" style={{ color: "#fff" }} />

          <div className="flex-grow-1">
            <Nav.Link href="#" className="text-white mb-2">
              Dashboard
            </Nav.Link>

            <Nav.Link href="#" className="text-white mb-2">
              Orders
            </Nav.Link>

            <Nav.Link href="adminProductos.html" className="text-white mb-2">
              Inventory
            </Nav.Link>

            <Nav.Link href="#" className="text-white mb-2">
              Reports
            </Nav.Link>

            <Nav.Link href="usuarios.html" className="text-white mb-2">
              Employees
            </Nav.Link>

            <Nav.Link href="#" className="text-white mb-2">
              Customers
            </Nav.Link>
          </div>

          <div className="mt-3">
            <Nav.Link href="#" className="text-white mb-2">
              Settings
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-2">
              Profile
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-2">
              Search
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-2">
              Help
            </Nav.Link>
          </div>

          <hr className="sidebar-divider" style={{ color: "#fff" }} />

          <Nav.Link href="#" className="text-white mt-2 fs-6 fw-bold">
            Perfil
          </Nav.Link>
        </Nav>
      </div>


    </div>
  );
}
