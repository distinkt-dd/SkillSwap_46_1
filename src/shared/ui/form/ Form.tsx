import React from 'react';
import styles from './Form.module.css';

export interface FormProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
