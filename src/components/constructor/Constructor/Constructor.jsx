import scss from './Constructor.module.scss'

import classNames from 'classnames'

import Container from '@components/common/Container/Container'
import TopPanel from '@components/constructor/TopPanel/TopPanel'
import ToolBar from '@components/constructor/ToolBar/ToolBar'
import GroupContainer from '@components/canvas/GroupContainer/GroupContainer'
import LegendBox from '@components/constructor/LegendBox/LegendBox'

export default function Constructor ({
  className,
  // isAuth,
  inactive,
  children
}) {

  return (
    <Container className={classNames(className, scss._)}>
      {/* {!isAuth && !inactive &&
        <div className={scss.no_auth}>
          <p>Все изменения сохранятся только в этом браузере.</p>
          <p>Чтобы иметь возможность сохранить схему в личном кабинете или создать несколько схем <a href="">войдите</a> или <a href="">зарегистрируйтесь</a></p>
        </div>
      }  */}
      <TopPanel className={scss.top_panel}
                inactive={inactive} />
      <GroupContainer inactive={inactive} />
      <div className={scss.main}>
        <div className={scss.tools}>
          <ToolBar inactive={inactive} />
        </div>
        <div className={scss.content}>
          {children}
          {!inactive && <LegendBox className={scss.legends} />}
        </div>
      </div>
    </Container>
  )
}
