import scss from './GroupContainer.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Dropdown from '@components/common/Dropdown/Dropdown'
import Group from '@components/canvas/Group/Group'
import Overlay from '@components/layout/Overlay/Overlay'
import Hint from '@components/common/Hint/Hint'

import { ReactComponent as QuestionIcon } from './svg/question.svg'
import { ReactComponent as GroupIcon } from './svg/group.svg'

function GroupContainer({ className, schemeGroups, plaits, inactive }) {
  const compare = (x, z) => {
    if (x.canvas.length > z.canvas.length) {
      return -1
    }

    if (x.canvas.length < z.canvas.lenght) {
      return 1
    }

    return 0
  }

  return (
    <div className={classNames(className, scss._)}>
      <Dropdown caption="Элементы для кос" active={false} size="sm">
        <div className={classNames(scss.content)}>
          {!inactive &&
            plaits.map((group, key) => (
              <Group
                className={scss.group}
                controls={false}
                group={group}
                key={key}
              />
            ))}
        </div>
      </Dropdown>
      {schemeGroups.length ? (
        <Dropdown caption="Мои группы элементов" size="sm">
          <div className={scss.content}>
            {!inactive &&
              schemeGroups
                .sort(compare)
                .map((group, key) => (
                  <Group className={scss.group} group={group} key={key} />
                ))}
          </div>
        </Dropdown>
      ) : (
        <div className={scss.no_group}>
          <span className={scss.no_group_text}>Мои группы элементов</span>
          <div className={scss.question}>
            <QuestionIcon />
            <Hint
              className={scss.question_hint}
              caption="Вы не создали ни одной группы"
            >
              <div className={scss.question_hint_text}>
                <div className={scss.question_hint_icon}>
                  <GroupIcon />
                </div>
                <p>
                  Создать группу можно с помощью инструмента <br />
                  <b>«Группировка»</b> на панели слева от схемы
                </p>
              </div>
            </Hint>
          </div>
        </div>
      )}

      {inactive && <Overlay />}
    </div>
  )
}

export default connect((state) => ({ ...state }))(GroupContainer)
