import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useCrud } from './hooks/useCrud';
import { get } from 'react-hook-form';
import UserContent from './components/UserContent';
import Modal from './components/Modal';
import Form from './components/Form';
import { useModal } from './hooks/useModal';

function App() {
	const baseURL =
		'https://users-crud-api-production-9c59.up.railway.app/api/v1/users';
	const [
		{ results: users },
		loading,
		error,
		{ getAll, create, update, remove },
	] = useCrud(baseURL);
	const { isOpen, openModal, closeModal } = useModal();
	const [selectedUser, SetSelectedUser] = useState(null);

	useEffect(() => {
		getAll();
	}, []);

	const handleSubmit = async (dataForm) => {
		if (selectedUser && selectedUser.id) {
			await update(dataForm, selectedUser.id);
		} else {
			await create(dataForm);
		}
		closeModal();
		SetSelectedUser(null);
	};
	const handleEdit = (user) => {
		SetSelectedUser(user);
		openModal();
	};
	const handleDelete = (id) => {
		remove(id);
	};
	const handleCancel = () => {
		SetSelectedUser(null);
	};
	return (
		<>
			<div>
				<h1>USER CRUD</h1>
				<button onClick={openModal}>Add user</button>
				{/* FORM */}

				<Modal openModal={isOpen} closeModal={closeModal}>
					<Form onSubmit={handleSubmit} onCancel={handleCancel} />
				</Modal>
			</div>
			{/* ERROR MESSAGE */}
			{error && <p>{error}</p>}
			{/* User List */}
			{loading ? (
				<p>Loading...</p>
			) : (
				users && (
					<UserContent
						users={users}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				)
			)}
		</>
	);
}

export default App;
