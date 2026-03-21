import { useState } from 'react';
import { Input, IconUI } from '@shared/ui';
import type { RegisterFormData } from '../model/types';
import styles from './register.module.css';

type Props = {
  data: RegisterFormData;
  onChange: (patch: Partial<RegisterFormData>) => void;
  errors: Record<string, string>;
};

export const RegisterStep1 = ({ data, onChange, errors }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={styles.oauthGroup}>
        <button type="button" className={styles.oauthBtn}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Продолжить с Google
        </button>
        <button type="button" className={styles.oauthBtn}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M12.47 0c.08.93-.27 1.86-.8 2.56-.54.72-1.4 1.29-2.26 1.22-.1-.89.29-1.83.79-2.49C10.76.57 11.67.06 12.47 0ZM15.5 12.07c-.42 1.17-.92 2.2-1.6 3.1-.66.88-1.34 1.75-2.43 1.77-1.06.02-1.4-.63-2.61-.62-1.21.01-1.58.65-2.66.65-1.07.01-1.79-.88-2.47-1.76C2.2 13.5 1.41 11.25 1.41 9.08c0-3.6 2.35-5.51 4.65-5.54 1.1-.02 2.13.73 2.8.73.67 0 1.93-.9 3.25-.77.55.02 2.11.22 3.1 1.67-.08.05-1.85 1.08-1.83 3.22.02 2.55 2.24 3.4 2.12 3.68Z"/>
          </svg>
          Продолжить с Apple
        </button>
      </div>

      <div className={styles.divider}>
        <span>или</span>
      </div>

      <Input
        type="email"
        label="Email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        error={errors.email}
        placeholder="Введите email"
        fullWidth
      />

      <Input
        type={showPassword ? 'text' : 'password'}
        label="Пароль"
        value={data.password}
        onChange={(e) => onChange({ password: e.target.value })}
        error={errors.password}
        hint={!errors.password ? 'Пароль должен содержать не менее 8 знаков' : undefined}
        placeholder="Придумайте надёжный пароль"
        fullWidth
        rightIcon={<IconUI name={showPassword ? 'eye' : 'eyeSlash'} size={20} />}
        showRightIcon
        onRightIconClick={() => setShowPassword((p) => !p)}
      />
    </>
  );
};