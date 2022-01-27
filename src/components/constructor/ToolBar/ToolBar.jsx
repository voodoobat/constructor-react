import scss from './ToolBar.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Tool from '@components/constructor/Tool/Tool'
import Hint from '@components/common/Hint/Hint'
import Swatches from '@components/constructor/Swatches/Swatches'
import ReportType from '@components/constructor/ReportType/ReportType'
import Resize from '@components/constructor/Resize/Resize'
import Overlay from '@components/common/Overlay/Overlay'

import { IS_TOUCH } from '@src/config'

function ToolBar ({ className, activeTool, inactive }) {

  return (
    <div className={classNames(className, scss._)}>
      {/* <UndoRedo className={scss.history} /> */}
      <nav className={scss.bar}>
        <Tool className={scss.tool}
              type="Move">
          <div className={scss.hint_trigger}></div>
          {!IS_TOUCH &&
            <Hint className={scss.hint}
                  caption="Рука">
              Позволяет передвигать рабочее поле схемы
            </Hint>
          }
        </Tool>
        <Tool className={scss.tool}
              type="Eraze">
          <div className={scss.hint_trigger}></div>
          {!IS_TOUCH &&
            <Hint className={scss.hint}
                  caption="Ластик">
              Удаляет выбранные в поле схемы элементы
            </Hint>
          }
        </Tool>
        <Tool className={scss.tool}
              tool={<ReportType />}
              type="Report">
          <div className={scss.hint_trigger}></div>
          {!IS_TOUCH && activeTool != 'Report' &&
            <Hint className={scss.hint}
                  caption="Раппорт">
              Определяет раппорт
            </Hint>
          }
        </Tool>
        <Tool className={scss.tool}
              type="Color"
              tool={<Swatches />}>
          <div className={scss.hint_trigger}></div>
          {!IS_TOUCH && activeTool != 'Color' &&
            <Hint className={scss.hint}
                  caption="Заливка цветом">
              Окрашивает цветом необходимые области схемы
            </Hint>
          }
        </Tool>
        <Tool className={scss.tool}
              type="Group">
          <div className={scss.hint_trigger}></div>
          {!IS_TOUCH &&
            <Hint className={scss.hint}
                  caption="Группировка">
              Группирует выбранные объекты в новый элемент схемы
            </Hint>
          }
        </Tool>
        <Tool className={scss.tool}
              tool={<Resize />}
              type="Size">
          <div className={scss.hint_trigger}></div>
          {!IS_TOUCH && activeTool != 'Size' &&
            <Hint className={scss.hint}
                  caption="Редактр размера схемы">
              Позволяет добавлять и удалять необходимое количество рядов или строк в схеме
            </Hint>
          }
        </Tool>
      </nav>
      {inactive && <Overlay />}
    </div>
  )
}

export default connect(state => ({ ...state }))(ToolBar)
