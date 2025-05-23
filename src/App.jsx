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
	const [selectedUser, setSelectedUser] = useState(null);

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
		setSelectedUser(null);
		closeModal();
	};
	const handleUpdate = (dataForm) => {
		update(dataForm.id, dataForm);
		setSelectedUser(null);
		closeModal();
	};
	const handleEdit = (user) => {
		setSelectedUser(user);
		openModal();
		setModalContent(
			<Form onSubmit={handleUpdate} onCancel={handleCancel} user={user} />,
		);
	};

	return (
		<div className="main-screen  text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl  h-full  ">
			<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 my-5 text-center ">
				USUARIOS
			</h1>
			<button
				onClick={handleAdd}
				className="my-4 mx-5  px-4 py-2 bg-blue-600 text-white  font-medium rounded hover:bg-blue-700 transition "
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
	);
}

export default App;
