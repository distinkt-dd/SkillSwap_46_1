import * as yup from 'yup';

//getOfferById
export const offersSchema = yup.object({
  id: yup
    .string()
    .required('ID обязателен')
    .matches(/^[a-zA-Z0-9]+$/, 'ID может содержать только латинские буквы и цифры'),

  userId: yup
    .string()
    .required('Отсутствует пользователь в карточке')
    .matches(/^[a-zA-Z0-9]+$/, 'ID может содержать только латинские буквы и цифры'),

  name: yup
    .string()
    .required('Название отсутствует')
    .min(3, 'Название должно быть минимум 3 символа')
    .max(100, 'Название не может быть длиннее 100 символов'),

  subcategoryId: yup
    .string()
    .required('Отсутствует подкатегория предложения')
    .matches(/^[a-zA-Z0-9]+$/, 'ID может содержать только латинские буквы и цифры'),

  description: yup
    .string()
    .required('Описание обязательно')
    .min(10, 'Описание должно быть минимум 10 символов')
    .max(1000, 'Описание не может быть длиннее 1000 символов'),

  images: yup
    .array()
    .of(yup.string().url('Каждое изображение должно быть валидным URL'))
    .required('Изображения обязательны')
    .min(0)
    .default([]),

  userLikedIds: yup
    .array()
    .of(yup.string().matches(/^[a-zA-Z0-9]+$/, 'ID может содержать только латинские буквы и цифры'))
    .default([]),
});

export const offersCreateSchema = offersSchema.omit(['userId', 'userLikedIds', 'id']);
export const offersUpdateSchema = offersSchema.omit(['userId', 'userLikedIds']);

export type TOfferFromSchema = yup.InferType<typeof offersSchema>;
export type OfferCreateValidData = yup.InferType<typeof offersCreateSchema>;
export type OfferUpdateValidData = yup.InferType<typeof offersUpdateSchema>;

export const offersArraySchema = yup.array().of(offersSchema).required().min(0);
