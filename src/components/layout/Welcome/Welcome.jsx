import scss from './Welcome.module.scss'

import { useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import YouTube from 'react-youtube'

import Container from '@components/layout/Container/Container'
import Button from '@components/common/Button/Button'

import * as local from '@store/localstorage'
import { DEFAULT_SCHEME_ID } from '@src/config'

import { ReactComponent as CreateIcon } from './svg/create.svg'
import { ReactComponent as SaveIcon } from './svg/save.svg'
import { ReactComponent as PencilIcon } from './svg/pencil.svg'

function Welcome ({ config }) {
  const [hasSavedScheme] = useState(
    !config.customer &&
    local.fetch()?.id == DEFAULT_SCHEME_ID,
  )

  return (
    <div className={scss._}>
      <Container className={scss.container}>
        <div className={classNames(scss.feature, scss.button, hasSavedScheme ? scss.has_saved : '')}>
          {hasSavedScheme
            ? <div className={scss.isnt_auth_box}>
              <Button
                size="large"
                className={scss.welcome_button}
                href="/create">
                Создать новую
              </Button>
              <Button
                size="large"
                className={classNames(scss.welcome_button)}
                href="/scheme/SCHEME">
                Редактировать
              </Button>
            </div>
            : <Button
              size="extra"
              href="/create">
              Создать схему
            </Button>
          }
        </div>
        <div className={scss.info}>
          <div className={scss.youtube_title}>Как работать с конструктором ?</div>
          <div className={scss.info_box}>
            <div className={classNames(scss.youtube, scss.column)}>
              <YouTube
                videoId="ZWA25e9suac"
                opts={{
                  width: 450,
                  height: 255,
                  playerVars: {
                    controls: 1
                  }
                }} />
            </div>
            <div className={classNames(scss.features_box, scss.column)}>
              <div className={scss.feature}>
                <CreateIcon className={scss.feature_icon}/>
                <span className={scss.feature_text}>
                    Создавайте <br/> собственные схемы
                  </span>
              </div>
              <div className={scss.feature}>
                <PencilIcon className={scss.feature_icon}/>
                <span className={scss.feature_text}>
                    Редактируйте <br/>
                    и дорабатывайте схемы
                  </span>
              </div>
              <div className={scss.feature}>
                <SaveIcon className={scss.feature_icon}/>
                <span className={scss.feature_text}>
                    Сохраняйте или скачивайте <br/>
                    Ваши схемы
                  </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default connect(state => ({ ...state }))(Welcome)
