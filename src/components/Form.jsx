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
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<div className="form-floating">
				<input
					className="form-control"
					placeholder="First name"
					{...register('first_name')}
				/>
				{errors.name && <p>{errors.name?.message}</p>}
			</div>

			<div className="form-floating mb-3">
				<input
					className="form-control"
					placeholder="Last name"
					{...register('last_name')}
				/>

				{errors.last_name && <p>{errors.last_name?.message}</p>}
			</div>

			<div className="form-floating mb-3">
				<input
					type="email"
					className="form-control"
					placeholder="Email"
					{...register('email')}
				/>

				{errors.email && <p>{errors.email?.message}</p>}
			</div>

			<div className="form-floating mb-3">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					{...register('password')}
				/>

				{errors.password && <p>{errors.password?.message}</p>}
			</div>

			<div className="form-floating mb-3">
				<input
					type="date"
					className="form-control"
					placeholder="Birthday"
					{...register('birthday')}
				/>

				{errors.birthday && <p>{errors.birthday?.message}</p>}
			</div>
			<div className="form-floating mb-3">
				<input
					className="form-control"
					placeholder="Image URL"
					{...register('image_url')}
				/>
				{errors.image_url && <p>{errors.image_url?.message}</p>}
			</div>

			<button
				type="submit"
				className={`btn ${user ? 'btn-warning' : 'btn-dark'}`}
			>
				{user ? 'Update' : 'Create'}
			</button>

			{user && (
				<button type="button" className="btn btn-light ms-2" onClick={onCancel}>
					Cancel
				</button>
			)}
		</form>
	);
}

export default Form;
