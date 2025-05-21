import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDate } from '../lib/util';

const schema = z.object({
	first_name: z.string().min(1, 'First name is required'),
	last_name: z.string().min(1, 'Last name is required'),
	email: z
		.string()
		.min(1, 'Este campo es requerido')
		.email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	birthday: z.coerce.date(),
	image_url: z.string().url().or(z.literal('')),
});
const defaultValues = {
	first_name: '',
	last_name: '',
	email: '',
	birthday: '',
	image_url: '',
};
function Form({ onSubmit, onCancel, user = null }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
	});
	useEffect(() => {
		if (user) {
			user.birthday = formatDate(user.birthday);
			reset(user);
		} else {
			reset(defaultValues);
		}
	}, [user]);

	const onSubmitForm = (dataForm) => {
		if (user) {
			onSubmit({ ...dataForm, id: user.id });
		} else {
			onSubmit(dataForm);
		}
		reset(defaultValues);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmitForm)}
			className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-md mx-auto"
		>
			<div>
				<input
					className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Nombre"
					{...register('first_name')}
				/>
				{errors.first_name && (
					<p className="text-red-500 text-sm mt-1">
						{errors.first_name?.message}
					</p>
				)}
			</div>

			<div>
				<input
					className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Apellido"
					{...register('last_name')}
				/>

				{errors.last_name && (
					<p className="text-red-500 text-sm mt-1">
						{errors.last_name?.message}
					</p>
				)}
			</div>

			<div>
				<input
					type="email"
					className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Email"
					{...register('email')}
				/>

				{errors.email && (
					<p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
				)}
			</div>

			<div>
				<input
					type="password"
					className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Contraseña"
					{...register('password')}
				/>

				{errors.password && (
					<p className="text-red-500 text-sm mt-1">
						{errors.password?.message}
					</p>
				)}
			</div>

			<div>
				<input
					type="date"
					className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Fecha de nacimiento"
					{...register('birthday')}
				/>

				{errors.birthday && (
					<p className="text-red-500 text-sm mt-1">
						{errors.birthday?.message}
					</p>
				)}
			</div>
			<div>
				<input
					className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Imagen URL"
					{...register('image_url')}
				/>
				{errors.image_url && (
					<p className="text-red-500 text-sm mt-1">
						{errors.image_url?.message}
					</p>
				)}
			</div>

			<div className="flex gap-2">
				<button
					type="submit"
					className={`px-4 py-2 rounded text-white ${
						user
							? 'bg-yellow-500 hover:bg-yellow-600'
							: 'bg-gray-900 hover:bg-gray-800'
					}`}
				>
					{user ? 'Actualizar' : 'Crear'}
				</button>
				{user && (
					<button
						type="button"
						className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
						onClick={onCancel}
					>
						Cancelar
					</button>
				)}
			</div>
		</form>
	);
}

export default Form;
