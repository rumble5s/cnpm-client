import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/AdminForm.css";

export const AdminPage = () => {
  return (
      <div className="macbook-air">
        <div className="div">
          <div className="overlap">
            <div className="frame">
              <div className="type-wrapper">
                <div className="type">Admin Page</div>
              </div>
            </div>
          </div>
          <div
            className="button-container"
            role="group"
            aria-label="Large button group"
          >
            <button type="button" className="btn btn-primary btn-lg">
              Large button
            </button>
            <button type="button" className="btn btn-primary btn-lg">
              Large button
            </button>
            <button type="button" className="btn btn-primary btn-lg">
              Large button
            </button>
          </div>
          <div className="widget">
            <div className="overlap-group">
              <div className="text-wrapper-3">Assigned Risks</div>
              <p className="p">There are no risks assigned.</p>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="text-wrapper-4">Assigned Action Item</div>
              <p className="text-wrapper-5">
                There are no action items assigned.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};
