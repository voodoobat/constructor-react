import scss from './ElementForm.module.scss'

import classNames from 'classnames'

import Field from '@components/form/Field/Field'
import { Input } from '@components/form/Input/Input'
import DropInput from '@components/form/DropInput/DropInput'
import Button from '@components/common/Button/Button'

export default function ElementForm ({ className }) {
  return (
    <form className={classNames(className, scss._)}>
      <Field className={scss.header}>
        <div className={scss.caption}>
          Мы стремимся стать лучше для Вас!
        </div>
        <p>
          Загрузите фотографию своего элемента и помогите нам совершествовать Вязаный Конструктор
        </p>
      </Field>
      <Field label="Название элемента"
             id="101"
             labelClassName={scss.label}
             required={true}>
        <Input className={scss.input} id="101" />
      </Field>
      <Field label="Описание"
             id="102"
             labelClassName={scss.label}>
      </Field>
      <Field>
        <DropInput />
      </Field>
      <Field className={scss.submit}>
        <Button type="submit"
                color="default"
                size="large">
          Загрузить
        </Button>
      </Field>
    </form>
  )
}
