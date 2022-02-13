import scss from './Name.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import SelectScheme from '@components/common/SelectScheme/SelectScheme'
import ActionsDropdown from '@components/constructor/ActionsDropdown/ActionsDropdown'
import NameInput from '@components/common/NameInput/NameInput'

import { ReactComponent as ChevronIcon } from './svg/chevron.svg'
import { ReactComponent as ArrowIcon } from './svg/arrow.svg'

import * as store from '@store/functions'
import { useRouteMatch } from 'react-router-dom'

function Name({
  className,
  isAuth,
  schemeId,
  schemesList,
  schemeTitle,
  dispatch,
}) {
  const [activeMenu, setActiveMenu] = useState(false)
  const [schemesListActive, setSchemesListActive] = useState(false)
  const [isActiveInput, setActiveInput] = useState(false)

  const isDownload = useRouteMatch('/scheme/:uid/download')

  const openMenu = () => {
    setActiveMenu(true)
  }

  useEffect(() => {
    // TODO: убедиться в том что эта хуита нужна
    schemesListActive && dispatch(store.setSchemesList())
  }, [schemesListActive])

  return (
    <>
      {isDownload ? (
        <div className={classNames(className, scss._)}>
          <Link to={`/scheme/${schemeId}`} className={scss.to_constructor}>
            <ArrowIcon className={scss.arrow} /> Вернуться к редактированию
          </Link>
        </div>
      ) : (
        <div className={classNames(className, scss._)}>
          {!isActiveInput && isAuth && (
            <div
              className={scss.type}
              onClick={() => setSchemesListActive(true)}
            >
              Спицы
            </div>
          )}
          {schemeId && (
            <div
              className={classNames(scss.name, activeMenu ? scss.is_open : '')}
            >
              <span onClick={openMenu} className={classNames(scss.name_box)}>
                {isActiveInput ? (
                  <NameInput
                    className={scss.name_input}
                    setActiveInput={setActiveInput}
                    schemeTitle={schemeTitle}
                  />
                ) : (
                  <>
                    {schemeTitle} <ChevronIcon className={scss.chevron} />
                  </>
                )}
              </span>
              {activeMenu && (
                <ActionsDropdown
                  setActiveMenu={setActiveMenu}
                  setSchemeListActive={setSchemesListActive}
                  setActiveInput={setActiveInput}
                />
              )}
            </div>
          )}
        </div>
      )}

      <SelectScheme
        schemesListActive={schemesListActive}
        setSchemesListActive={setSchemesListActive}
        schemeId={schemeId}
        schemesList={schemesList}
      />
    </>
  )
}

export default connect((state) => ({ ...state }))(Name)
