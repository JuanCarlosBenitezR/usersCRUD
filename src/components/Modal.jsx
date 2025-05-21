import React from 'react';
import {} from './Modal.css';
function Modal({ openModal, closeModal, children }) {
	console.log('Modal', openModal);
	return (
		<div
			className={`modal ${openModal ? 'show-modal' : ''}`}
			onClick={closeModal}
		>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

export default Modal;
