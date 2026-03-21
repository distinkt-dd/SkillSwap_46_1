import { useRef } from 'react';
import { Dropdown, Input, Calendar, IconUI } from '@shared/ui';
import { useSelector } from '@shared/store';
import { selectCities } from '@entities/cities';
import { selectedSubcategories } from '@entities/subcategories';
import { selectedCategories as selectCategoriesState } from '@entities/categories/model';
import type { RegisterFormData } from '../model/types';
import type { DropdownOption } from '@shared/ui';
import styles from './register.module.css';

type Props = {
  data: RegisterFormData;
  onChange: (patch: Partial<RegisterFormData>) => void;
  errors: Record<string, string>;
};

const GENDER_OPTIONS: DropdownOption[] = [
  { id: 'male', name: 'Мужской' },
  { id: 'female', name: 'Женский' },
];

export const RegisterStep2 = ({ data, onChange, errors }: Props) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const cities = useSelector(selectCities) ?? [];
  const categories = useSelector(selectCategoriesState);
  const subcategories = useSelector(selectedSubcategories);

  const cityOptions: DropdownOption[] = cities.map((c) => ({ id: c.id, name: c.name }));
  const categoryOptions: DropdownOption[] = categories.map((c) => ({ id: c.id, name: c.name }));

  const filteredSubcategoryOptions: DropdownOption[] = subcategories
    .filter(
      (s) =>
        data.learnCategoryIds.length === 0 ||
        data.learnCategoryIds.includes(String(s.categoryId))
    )
    .map((s) => ({ id: s.id, name: s.name }));

  const selectedCity = cityOptions.find((c) => String(c.id) === String(data.cityId)) ?? null;
  const selectedGender = GENDER_OPTIONS.find((g) => g.id === data.gender) ?? null;

  const selectedCategoryValues = categoryOptions.filter((c) =>
    data.learnCategoryIds.includes(String(c.id))
  );

  const selectedSubcats = filteredSubcategoryOptions.filter((s) =>
    data.subcategoriesIds.includes(String(s.id))
  );

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        avatar: reader.result as string,
        avatarIsCustom: true,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (opts: DropdownOption[]) => {
    const newCategoryIds = opts.map((o) => String(o.id));

    const validSubcatIds = new Set(
      subcategories
        .filter(
          (s) =>
            newCategoryIds.length === 0 ||
            newCategoryIds.includes(String(s.categoryId))
        )
        .map((s) => String(s.id))
    );

    onChange({
      learnCategoryIds: newCategoryIds,
      subcategoriesIds: data.subcategoriesIds.filter((id) => validSubcatIds.has(id)),
    });
  };

  return (
    <>
      <div className={styles.avatarSection}>
        <div
          className={styles.avatarCircle}
          onClick={() => avatarInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && avatarInputRef.current?.click()}
          aria-label="Загрузить аватар"
        >
          {/*
           * FIX: data.avatar теперь всегда непустой (сгенерирован в RegisterForm),
           * показываем изображение всегда — SVG-заглушка не нужна.
           */}
          <img src={data.avatar} alt="Аватар" className={styles.avatarPreview} />
          <div className={styles.avatarBadge}>
            {/* FIX: 'add' → 'edit' для автогенерированного аватара,
                чтобы подсказать пользователю что можно заменить */}
            <IconUI name={data.avatarIsCustom ? 'done' : 'edit'} size={12} />
          </div>
        </div>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          className={styles.fileInputHidden}
          onChange={handleAvatarChange}
        />
      </div>

      <div className={styles.zField60}>
        <Input
          label="Имя"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          error={errors.name}
          placeholder="Введите ваше имя"
          fullWidth
        />
      </div>

      <div className={styles.row}>
        <div className={`${styles.rowItem} ${styles.zField50}`}>
          <Calendar
            label="Дата рождения"
            value={data.birthday}
            onChange={(date) => onChange({ birthday: date })}
            placeholder="дд.мм.гггг"
            maxDate={new Date()}
            width="100%"
          />
          {errors.birthday && (
            <span className={styles.fieldError}>{errors.birthday}</span>
          )}
        </div>

        <div className={`${styles.rowItem} ${styles.zField50}`}>
          <div className={styles.fieldGroup}>
            <Dropdown
              label="Пол"
              placeholder="Не указан"
              options={GENDER_OPTIONS}
              value={selectedGender}
              onChange={(opt) =>
                onChange({ gender: (opt?.id as 'male' | 'female') ?? '' })
              }
              variant="clearable"
            />
            {errors.gender && (
              <span className={styles.fieldError}>{errors.gender}</span>
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.fieldGroup} ${styles.zField40}`}>
        <Dropdown
          label="Город"
          placeholder="Не указан"
          options={cityOptions}
          value={selectedCity}
          onChange={(opt) => onChange({ cityId: String(opt?.id ?? '') })}
          searchable
          variant="clearable"
        />
        {errors.cityId && (
          <span className={styles.fieldError}>{errors.cityId}</span>
        )}
      </div>

      <div className={`${styles.fieldGroup} ${styles.zField30}`}>
        <Dropdown
          label="Категория навыка, которому хотите научиться"
          placeholder="Выберите категорию"
          options={categoryOptions}
          values={selectedCategoryValues}
          onValuesChange={handleCategoryChange}
          mode="multi"
          variant="clearable"
        />
      </div>

      <div className={`${styles.fieldGroup} ${styles.zField20}`}>
        <Dropdown
          label="Подкатегория навыка, которому хотите научиться"
          placeholder="Выберите подкатегорию"
          options={filteredSubcategoryOptions}
          values={selectedSubcats}
          onValuesChange={(opts) =>
            onChange({ subcategoriesIds: opts.map((o) => String(o.id)) })
          }
          mode="multi"
          variant="clearable"
        />
        {errors.subcategoriesIds && (
          <span className={styles.fieldError}>{errors.subcategoriesIds}</span>
        )}
      </div>
    </>
  );
};
