import scss from './Download.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { downloadUrl } from 'download.js'
import classNames from 'classnames'

import Button from '@components/common/Button/Button'
import { Checkbox } from '@components/form/Checkbox/Checkbox'

import { ReactComponent as OptionsIcon } from './svg/options.svg'
import { ReactComponent as DownloadIcon } from './svg/download.svg'

import { getSchemeLegends } from '@components/constructor/LegendBox/LegendBox.fn'

import { CANVAS_ELEMENT_ID } from '@src/config'
import * as store from '@store/functions'

function Download ({
  className,
  schemeTitle,
  schemeCanvas,
  schemeReports,
  schemeLegends,
  downloadOptions,
  dispatch
}) {

  const optionsID = 'options-dropdown'

  const [activeOpts, setActiveOpts] = useState(false)
  const [options, setOptions] = useState(downloadOptions)

  const legends = getSchemeLegends(schemeLegends, schemeCanvas)
  const hasLegends = !!legends.filter(({ isHidden }) => !isHidden).length

  useEffect(() => dispatch(store.setDownloadOptions(options)), [options])

  const convert = () => {
    const canvas = document.getElementById(CANVAS_ELEMENT_ID)

    dispatch(store.setSetActiveLoader(true))

    setTimeout(() => {
      toPng(canvas).then(image => {
        dispatch(store.setSetActiveLoader(false))
        downloadUrl(schemeTitle, image)
      })
    })
  }

  useEffect(() => {
    let init = true
    setTimeout(() => init = false)

    const deactivate = ({ target }) => {
      const isDropdown = target.closest(`#${optionsID}`)

      if (!init && activeOpts && !isDropdown) {
        setActiveOpts(false)
      }
    }

    document.addEventListener('click', deactivate)
    return () => document.removeEventListener('click', deactivate)
  }, [activeOpts])

  return (
    <div className={classNames(className, scss._)}>
      <div className={scss.options}>
        <button
          title="Настройки"
          onClick={() => setActiveOpts(true)}
          className={classNames(scss.options_button, activeOpts ? scss.is_active : '')}
          type="button">
          <OptionsIcon className={scss.options_icon} />
        </button>
        {activeOpts &&
          <div id={optionsID} className={scss.options_dropdown}>
            <Checkbox
              checked={options.schemeTitle}
              className={scss.check}
              setter={() => setOptions({ ...options, schemeTitle: !options.schemeTitle })}
              label="Название" /> 
            {!!schemeReports.length &&
              <Checkbox
                checked={options.schemeReports}
                className={scss.check}
                setter={() => setOptions({ ...options, schemeReports: !options.schemeReports })}
                label="Раппорты" />
            }
            {hasLegends &&
              <Checkbox
                checked={options.schemeLegends}
                className={scss.check}
                setter={() => setOptions({ ...options, schemeLegends: !options.schemeLegends })}
                label="Условные обозначения" />
            }
          </div>
        }
      </div>
      <Button
        onClick={convert}
        className={scss.button}
        size="large"
        color="blue">
        Скачать cхему
        <DownloadIcon className={scss.button_icon} />
      </Button>
    </div>
  )
}

export default connect(state => ({ ...state }))(Download)
