import { useEffect, useState } from 'react';
import './App.css';
import { useCrud } from './hooks/useCrud';
import UserContent from './components/UserContent';
import Modal from './components/Modal';
import Form from './components/Form';
import { useModal } from './hooks/useModal';
const baseURL =
	'https://users-crud-api-production-9c59.up.railway.app/api/v1/users';
function App() {
	const [users, loading, error, { getAll, create, update, remove }] =
		useCrud(baseURL);

	const { isOpen, openModal, closeModal, modalContent, setModalContent } =
		useModal();
	const [selectedUser, SetSelectedUser] = useState(null);

	useEffect(() => {
		getAll();
	}, []);

	const handleCreate = (dataForm) => {
		create(dataForm);
		closeModal();
	};
	const handleAdd = () => {
		openModal();
		setModalContent(<Form onSubmit={handleCreate} />);
	};
	const handleDelete = (user) => {
		const confirmDelete = window.confirm(
			`¿Estás seguro que deseas eliminar a ${user.first_name} ${user.last_name}?`,
		);
		if (confirmDelete) {
			remove(user.id);
		}
	};
	const handleCancel = () => {
		SetSelectedUser(null);
		closeModal();
	};
	const handleUpdate = (dataForm) => {
		update(selectedUser.id, dataForm);
		SetSelectedUser(null);
		closeModal();
	};
	const handleEdit = (user) => {
		SetSelectedUser(user);
		openModal();
		setModalContent(
			<Form onSubmit={handleUpdate} onCancel={handleCancel} user={user} />,
		);
	};

	return (
		<>
			<div className="bg-gray-100 ">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 py-5 text-center ">
					USUARIOS
				</h1>
				<button
					onClick={handleAdd}
					className="mt-4 mx-5 sm:mt-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition "
				>
					Añadir usuario
				</button>
				{/* ERROR MESSAGE */}
				{error && <p>{error}</p>}
				{/* User List */}
				{loading ? (
					<p>Cargando...</p>
				) : (
					users && (
						<UserContent
							users={users}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					)
				)}
				{/* FORM */}
				<Modal openModal={isOpen} closeModal={closeModal}>
					{modalContent}
				</Modal>
			</div>
		</>
	);
}

export default App;
