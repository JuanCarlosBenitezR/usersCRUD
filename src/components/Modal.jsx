import React from 'react';
import {} from './Modal.css';
import { CgClose } from 'react-icons/cg';
function Modal({ openModal, closeModal, children }) {
	return (
		<div
			className={`modal ${openModal ? 'show-modal' : ''}`}
			onClick={closeModal}
		>
			<div
				className="modal-content relative"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
				<button
					onClick={closeModal}
					className="absolute top-2 right-2  text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 focus:outline-none"
				>
					<CgClose />
				</button>
			</div>
		</div>
	);
}

export default Modal;
