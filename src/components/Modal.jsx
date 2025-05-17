import React from 'react';
import {} from './Modal.css';
function Modal({ openModal, closeModal, children }) {
	return (
		<div
			className={`modal ${openModal ? 'show-modal' : ''}`}
			onClick={closeModal}
		>
			<button type="button" className="btn-close" onClick={closeModal}></button>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

export default Modal;
