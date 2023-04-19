import React from "react";
import "./modal.css";

const Modal = (props) => {

    if(!props.show) {
        return null;
    }
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Montre ma musique</h4>
                    </div>
                    <div className="modal-footer">
                        <button className="btn" onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        
        </>
    );
}

export default Modal; 