import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './MyForm.css';  // Import the CSS file

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const MyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    setIsSubmitted(true);  // Show success message
    reset();               // Reset form fields
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label htmlFor="firstName" className="label">First Name</label>
        <input
          id="firstName"
          className="input"
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName" className="label">Last Name</label>
        <input
          id="lastName"
          className="input"
          {...register('lastName', { required: 'Last name is required' })}
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="label">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          type="password"
          className="input"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <button type="submit" className="button">Submit</button>

      {isSubmitted && <p className="success-message">Form submitted successfully!</p>}
    </form>
  );
};

export default MyForm;
