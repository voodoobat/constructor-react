import scss from './CreateForm.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import Field from '@components/form/Field/Field'
import { Input, Number } from '@components/form/Input/Input'
import { Checkbox } from '@components/form/Checkbox/Checkbox'
import Button from '@components/common/Button/Button'

import { or } from '@src/util'
import {
  MIN_CANVAS_SIZE,
  MAX_CANVAS_SIZE,
  MIN_SCHEME_NAME_LEN,
  MAX_SCHEME_NAME_LEN,
  DEFAULT_CANVAS_SIZE,
} from '@src/config'

import * as fn from './CreateForm.fn'
import * as store from '@store/functions'

const [min, max] = [MIN_CANVAS_SIZE, MAX_CANVAS_SIZE]
const [x, y] = DEFAULT_CANVAS_SIZE

function CreateForm({ dispatch }) {
  const [name, setName] = useState('Моя схема')
  const [cols, setCols] = useState(x)
  const [rows, setRows] = useState(y)
  const [onlyOdd, setOnlyOdd] = useState(false)
  const [customCells, setCustomCells] = useState(false)
  const [isRound, setRound] = useState(false)

  const [invalidName, setInvalidName] = useState(false)
  const [invalidRows, setInvalidRows] = useState(false)
  const [invalidCols, setInvalidCols] = useState(false)
  const [invalidEven, setInvalidEven] = useState(false)
  const [isInvalid, setInvalid] = useState(
    or(true, [invalidCols, invalidRows, invalidName, invalidEven])
  )

  // validation types
  const [invalidNameMin, setInvalidNameMin] = useState(false)
  const [invalidNameMax, setInvalidNameMax] = useState(false)

  const check = () => {
    setInvalidName(
      name.replace(/\s/g, '').length < MIN_SCHEME_NAME_LEN ||
        name.length > MAX_SCHEME_NAME_LEN
    )
    setInvalidRows(rows < min || rows > max)
    setInvalidCols(cols < min || cols > max)
    setInvalidEven(onlyOdd && !(rows % 2))

    setInvalidNameMin(invalidName && (() => name < MIN_SCHEME_NAME_LEN))
    setInvalidNameMax(invalidName && (() => name > MIN_SCHEME_NAME_LEN))

    setInvalid(or(true, [invalidCols, invalidRows, invalidName, invalidEven]))
  }

  useEffect(check, [
    name,
    rows,
    cols,
    onlyOdd,
    invalidName,
    invalidCols,
    invalidRows,
    invalidEven,
  ])

  const createScheme = (ev) => {
    ev.preventDefault()

    if (isInvalid) return

    const scheme = fn.generateScheme({
      name,
      rows,
      cols,
      onlyOdd,
      customCells,
      isRound,
    })

    dispatch(store.createScheme(scheme))
  }

  return (
    <>
      <form className={scss._} onSubmit={createScheme}>
        <Field className={scss.caption}>Введите параметры для схемы</Field>
        <Field
          className={scss.to_check}
          label="Название схемы"
          labelClassName={scss.label}
          id={1}
        >
          <Input id={1} setter={setName} value={name} />
          <div
            className={classNames(
              scss.error_msg,
              invalidNameMin ? scss.visible : ''
            )}
          >
            напишите хоть что-нибудь
          </div>
          <div
            className={classNames(
              scss.error_msg,
              invalidNameMax ? scss.visible : ''
            )}
          >
            ну это уже слишком
          </div>
        </Field>
        <Field
          className={scss.to_check}
          label="Количество рядов"
          labelClassName={scss.label}
          id={2}
        >
          <Number
            className={scss.number}
            id={2}
            onChange={check}
            setter={setRows}
            value={rows}
          />
          <div
            className={classNames(
              scss.error_msg,
              invalidRows ? scss.visible : ''
            )}
          >
            от {min} до {max}
          </div>
          <div
            className={classNames(
              scss.error_msg,
              invalidEven ? scss.visible : ''
            )}
          >
            в схеме для лицевых рядов <br />
            допустимо только нечётное кол-во рядов
          </div>
        </Field>
        <Field
          className={scss.to_check}
          label="Количество петель"
          labelClassName={scss.label}
          id={3}
        >
          <Number
            id={3}
            className={scss.number}
            onChange={check}
            setter={setCols}
            value={cols}
          />
          <div
            className={classNames(
              scss.error_msg,
              invalidCols ? scss.visible : ''
            )}
          >
            от {min} до {max}
          </div>
        </Field>
        <Field>
          <Checkbox
            disabled={isRound}
            className={scss.checkbox}
            checked={onlyOdd}
            setter={setOnlyOdd}
            label="Схема узора только для лицевых рядов"
          />
        </Field>
        <Field>
          <Checkbox
            disabled={onlyOdd}
            className={scss.checkbox}
            checked={isRound}
            setter={setRound}
            label="Схема для вязания по кругу"
          />
        </Field>
        <Field>
          <Checkbox
            className={scss.checkbox}
            checked={customCells}
            setter={setCustomCells}
            label="Вписать нумерацию петель вручную"
          />
        </Field>
        <Field className={scss.submit}>
          <Button
            type="submit"
            color="default"
            disabled={isInvalid}
            size="large"
          >
            Создать поле для схемы
          </Button>
        </Field>
      </form>
    </>
  )
}

export default connect((state) => ({ ...state }))(CreateForm)
