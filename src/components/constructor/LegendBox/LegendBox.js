import scss from './LegendBox.module.scss'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

import Legend from '@components/constructor/Legend/Legend'

import * as fn from './LegendBox.fn'

function LegendBox ({
  className,
  schemeCanvas,
  schemeLegends,
  isPreview
}) {

  const [legends, setLegends] = useState(fn.getSchemeLegends(schemeLegends, schemeCanvas, isPreview))

  useEffect(() => {
    setLegends(fn.getSchemeLegends(schemeLegends, schemeCanvas, isPreview))
  }, [schemeCanvas])

  return <>
    {!!legends.length &&
      <div className={classNames(className, scss._)}>
        <h3 className={scss.caption}>
          Условные обозначения
        </h3>
        {legends.map(legend =>
          <div key={legend.id} className={scss.legend}>
            <Legend
              legend={legend}
              isPreview={isPreview} />
          </div>
        )}
      </div>
    }
  </>
}

export default connect(state => ({ ...state }))(LegendBox)
