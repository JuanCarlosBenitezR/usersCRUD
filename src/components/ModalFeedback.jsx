import React from 'react';

function ModalFeedback({ open, message, onClose }) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50  ">
			<div className="bg-white rounded-lg shadow-lg p-6 min-w-[250px] flex flex-col items-center">
				<p className="text-gray-800 text-lg mb-4">{message}</p>
				<button
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					onClick={onClose}
				>
					Cerrar
				</button>
			</div>
		</div>
	);
}

export default ModalFeedback;
