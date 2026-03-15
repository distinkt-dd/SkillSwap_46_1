import {
  login,
  selectedUser,
  selectedUserError,
  selectedUserIsResponse,
  userLoginSchema,
  type TLoginUser,
} from '@entities/user';
import { useFormValidation } from '@shared/api';
import { Button, Input } from '@shared/ui';
import Form from '@shared/ui/form';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from '@shared/store';
import './App.css';

export const App = () => {
  const [formData, setFormData] = useState<TLoginUser>({ email: '', password: '' });
  const { errors, validateField, validateForm, getCounterErrors } =
    useFormValidation(userLoginSchema);

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);
  const error = useSelector(selectedUserError);
  const isResponse = useSelector(selectedUserIsResponse);

  useEffect(() => {
    console.log('user: ', user);
    console.log('error: ', error);
  }, [user, error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const onSubmit = async () => {
    const isValid = await validateForm(formData);
    if (isValid) {
      console.log('Форма валидна: ', formData);
      dispatch(login(formData));
    }
  };

  return (
    <Form onSubmit={onSubmit} error={error}>
      <Input
        value={formData.email}
        label="Email"
        error={errors.email}
        onChange={(e) => handleChange(e, 'email')}
      />
      <Input
        value={formData.password}
        label="Password"
        error={errors.password}
        onChange={(e) => handleChange(e, 'password')}
      />
      <Button type="submit" disabled={getCounterErrors(errors) > 0 || isResponse}>
        Залогиниться
      </Button>
    </Form>
  );
};
