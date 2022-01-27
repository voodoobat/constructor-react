import scss from './Name.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import SelectScheme from '@components/common/SelectScheme/SelectScheme'
import ActionsDropdown from '@components/constructor/ActionsDropdown/ActionsDropdown'
import NameInput from '@components/common/NameInput/NameInput'

import { ReactComponent as ChevronIcon } from './svg/chevron.svg' 
import { ReactComponent as ArrowIcon } from './svg/arrow.svg' 

import * as store from '@store/functions'

function Name ({
  className,
  isAuth,
  schemeId,
  schemesList,
  schemeTitle,
  activeDownload,
  dispatch
}) {

  const [activeMenu, setActiveMenu] = useState(false)
  const [schemesListActive, setSchemesListActive] = useState(false)
  const [isActiveInput, setActiveInput] = useState(false)

  const openMenu = () => {
    setActiveMenu(true)
  }

  useEffect(() => {
    schemesListActive && dispatch(store.setSchemesList())
  }, [schemesListActive])

  return <>
    {activeDownload
      ? <div className={classNames(className, scss._)}>
          <button
            className={scss.to_constructor}
            onClick={() => dispatch(store.setActiveDownload(false))}
            type="button">
            <ArrowIcon className={scss.arrow} /> Вернуться к редактированию
          </button>
        </div>
      : <div className={classNames(className, scss._)}>
          {!isActiveInput && isAuth &&
            <div
              className={scss.type}
              onClick={() => setSchemesListActive(true)}>
              Спицы
            </div>

          }
          {schemeId &&
            <div className={classNames(scss.name, activeMenu ? scss.is_open : '')}>
              <span onClick={openMenu} className={classNames(scss.name_box)}>
              {isActiveInput
                ? <NameInput
                    className={scss.name_input}
                    setActiveInput={setActiveInput}
                    schemeTitle={schemeTitle} />
                : <>{schemeTitle} <ChevronIcon className={scss.chevron} /></>
              }

              </span>
              {activeMenu &&
                <ActionsDropdown
                  setActiveMenu={setActiveMenu}
                  setSchemeListActive={setSchemesListActive}
                  setActiveInput={setActiveInput} />
              }
            </div>
          }
        </div>
    }

    <SelectScheme
      schemesListActive={schemesListActive}
      setSchemesListActive={setSchemesListActive}
      schemeId={schemeId}
      schemesList={schemesList} />
  </>
}

export default connect(state => ({ ...state }))(Name)
