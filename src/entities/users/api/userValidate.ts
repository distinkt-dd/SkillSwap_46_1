import * as yup from 'yup';

export const userResponseSchema = yup.object({
  id: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9]+$/, 'ID может содержать только латинские буквы и цифры'),
  name: yup.string().required('Имя отсутствует'),
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  description: yup.string().required('Описание обязательно'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Пол должен быть "male" или "female"')
    .required('Пол обязателен для заполнения'),
  birthday: yup.date().min(new Date('1900-01-01')).max(new Date('2100-01-01')).required(),
  cityId: yup
    .string()
    .required('Отсутсвует город')
    .matches(/^[a-zA-Z0-9]+$/, 'ID может содержать только латинские буквы и цифры'),
  subcategoriesIds: yup
    .array()
    .of(yup.string().matches(/^[a-zA-Z0-9]+$/, 'ID может содержать только латинские буквы и цифры'))
    .default([]),
  avatar: yup.string().required(),
});

export const usersArraySchema = yup.array().of(userResponseSchema).required().min(0);

export const userUpdateSchema = userResponseSchema.omit(['id']);

export const passwordUpdateSchema = yup.object({
  password: yup.string().required().min(8, 'Пароль должен содержать минимум 8 символов'),
  // .max(50, 'Пароль не может быть длиннее 50 символов')
  // .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
  // .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
  // .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
  // .matches(/[!@#$%^&*]/, 'Пароль должен содержать хотя бы один спецсимвол (!@#$%^&*)'),
});

export const userRegisterSchema = userUpdateSchema.concat(passwordUpdateSchema);

export type UserValidatedUpdateData = yup.InferType<typeof userUpdateSchema>;
export type UserValidatedData = yup.InferType<typeof userRegisterSchema>;
