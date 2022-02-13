import scss from './Numbers.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import CustomNumbers from '@components/canvas/CustomNumbers/CustomNumbers'

import * as fn from './Numbers.fn'

function Numbers({ className, isPreview, schemeCustomCells, schemeCanvas }) {
  const nums = fn.getCellNums(schemeCanvas[0]?.length || 0)
  const viewNums = (numsArray) =>
    numsArray.map((n) => (
      <div className={scss.num} key={n}>
        {n}
      </div>
    ))

  return (
    <div className={classNames(className, scss._)}>
      {schemeCustomCells?.length ? (
        <>{isPreview ? viewNums(schemeCustomCells) : <CustomNumbers />}</>
      ) : (
        viewNums(nums)
      )}
    </div>
  )
}

export default connect((state) => ({ ...state }))(Numbers)
