import { RouterProvider } from 'react-router-dom';
import './App.css';
import { testRouter  } from './test/test-router'; //TODO: временно для тестирования layouts

export const App = () => {
  return <RouterProvider router={ testRouter } />;
};


// import {
//   login,
//   register,
//   selectedUser,
//   selectedUserError,
//   selectedUserIsResponse,
//   updatePassword,
//   userLoginSchema,
//   type TLoginUser,
// } from '@entities/user';
// import { useFormValidation } from '@shared/api';
// import { Avatar, Button, Input } from '@shared/ui';
// import Form from '@shared/ui/form';
// import { useEffect, useState, type ChangeEvent } from 'react';
// import { useDispatch, useSelector } from '@shared/store';
// import './App.css';
// import { Calendar, formateDate, generateRandomAvatar } from '@shared/index';

// export const App = () => {
//   const [formData, setFormData] = useState<TLoginUser>({ email: '', password: '' });
//   const { errors, validateField, validateForm, getCounterErrors } =
//     useFormValidation(userLoginSchema);

//   const [avatarUrl] = useState<string>(generateRandomAvatar());
//   const [calendar, setCalendar] = useState<Date | null>(null);
//   const dispatch = useDispatch();
//   const user = useSelector(selectedUser);
//   const error = useSelector(selectedUserError);
//   const isResponse = useSelector(selectedUserIsResponse);

//   useEffect(() => {
//     console.log('user: ', user);
//     console.log('error: ', error, calendar);
//     if (user?.birthday) {
//       console.log(formateDate({ date: new Date(user?.birthday), format: 'дд.мм.гггг' }));
//     }
//   }, [user, error, calendar]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
//     const value = e.target.value;
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     validateField(field, value);
//   };

//   const onLoginSubmit = async () => {
//     const isValid = await validateForm(formData);
//     if (isValid) {
//       console.log('Форма валидна: ', formData);
//       dispatch(login(formData));
//     }
//   };

//   const onRegisterSubmit = async () => {
//     dispatch(
//       register({
//         name: 'Dmitriy',
//         email: 'ddpdsr@mail.ru',
//         description: 'Описание!',
//         password: '12345678',
//         cityId: '1',
//         birthday: calendar as Date,
//         subcategoriesIds: [],
//         avatar: avatarUrl,
//         gender: 'male',
//       })
//     );
//   };

//   const [newPass, setNewPass] = useState<string>('');

//   const onChangePassword = async () => {
//     if (user) {
//       dispatch(updatePassword({ id: user?.id, password: newPass }));
//     }
//   };

//   return (
//     <>
//       <Form onSubmit={onLoginSubmit} error={error}>
//         <Input
//           value={formData.email}
//           label="Email"
//           error={errors.email}
//           onChange={(e) => handleChange(e, 'email')}
//         />
//         <Input
//           value={formData.password}
//           label="Password"
//           error={errors.password}
//           onChange={(e) => handleChange(e, 'password')}
//         />
//         <Button type="submit" disabled={getCounterErrors(errors) > 0 || isResponse}>
//           Залогиниться
//         </Button>
//       </Form>

//       <Form onSubmit={onRegisterSubmit}>
//         <Avatar size="medium" src={avatarUrl} />
//         <Calendar
//           label="Дата рождения"
//           value={calendar}
//           onChange={setCalendar}
//           width={320}
//           placeholder="дд.мм.гггг"
//         />
//         <Button onClick={onRegisterSubmit}>Зарегаться</Button>
//       </Form>

//       <Form onSubmit={onChangePassword}>
//         <Input
//           value={newPass}
//           label="Новый пароль"
//           error={errors.password}
//           onChange={(e) => setNewPass(e.target.value)}
//           placeholder="Новый пароль"
//         />
//         <Button type="submit" disabled={getCounterErrors(errors) > 0 || isResponse}>
//           Изменить
//         </Button>
//       </Form>
//     </>
//   );
// };


