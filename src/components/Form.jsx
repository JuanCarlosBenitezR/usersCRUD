import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDate } from '../lib/util';

const schema = z.object({
	first_name: z.string().min(1, { message: 'First name is required' }),
	last_name: z.string().min(1, { message: 'Last name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
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
		defaultValues: user ? user : defaultValues,
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
			onSubmit({ ...dataform, id: user.id });
		} else {
			onSubmit(dataForm);
		}
		reset(defaultValues);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className="form-floating mb-3">
					<input
						className="form-control"
						id="floatingInput"
						placeholder="Brand"
						{...register('brand')}
					/>
					<label htmlFor="floatingInput">Brand</label>
					{errors.name && <p>{errors.name?.message}</p>}
				</div>

				<div className="form-floating mb-3">
					<input
						className="form-control"
						id="floatingInput"
						placeholder=""
						{...register('first_name')}
					/>
					<label htmlFor="floatingInput">first_name</label>
					{errors.first_name && <p>{errors.first_name?.message}</p>}
				</div>

				<div className="form-floating mb-3">
					<input
						className="form-control"
						id="floatingInput"
						placeholder="Color"
						{...register('last_name')}
					/>
					<label htmlFor="floatingInput">Last name</label>
					{errors.last_name && <p>{errors.last_name?.message}</p>}
				</div>

				<div className="form-floating mb-3">
					<input
						className="form-control"
						id="floatingInput"
						placeholder="Year"
						{...register('email')}
					/>
					<label htmlFor="floatingInput">Email</label>
					{errors.email && <p>{errors.email?.message}</p>}
				</div>

				<div className="form-floating mb-3">
					<input
						type="date"
						className="form-control"
						id="floatingInput"
						placeholder="Price"
						{...register('birthday')}
					/>
					<label htmlFor="floatingInput">Birtday</label>
					{errors.birthday && <p>{errors.birthday?.message}</p>}
				</div>

				<button
					type="submit"
					className={`btn ${user ? 'btn-warning' : 'btn-dark'}`}
				>
					{user ? 'Update' : 'Create'}
				</button>

				{user && (
					<button
						type="button"
						className="btn btn-light ms-2"
						onClick={onCancel}
					>
						Cancel
					</button>
				)}
			</form>
		</div>
	);
}

export default Form;
