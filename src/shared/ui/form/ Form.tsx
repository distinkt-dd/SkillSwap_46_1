import React from 'react';
import styles from './Form.module.css';

export interface FormProps {
  onSubmit: () => void;
  children: React.ReactNode;
  error?: string;
}

export const Form = ({ onSubmit, children, error }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit}>
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default Form;
