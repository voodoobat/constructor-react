import scss from './Header.module.scss'

import { connect } from 'react-redux'

import { Link, useRouteMatch } from 'react-router-dom'

import Name from '@components/common/Name/Name'
import Container from '@components/layout/Container/Container'
import Save from '@components/common/Save/Save'
import Download from '@components/constructor/Download/Download'
import User from '@components/common/User/User'

import { ReactComponent as LogoSM } from './svg/logo-sm.svg'
import { ReactComponent as LogoXS } from './svg/logo-xs.svg'

function Header ({
  config,
  activeDownload
}) {

  const isConstPage = useRouteMatch('/scheme/:uid')
  const isCreatePage = useRouteMatch('/create')

  return <>
    {isConstPage || isCreatePage
      ? <header className={scss._}>
          <Container className={scss.box}>
            <div className={scss.logo}>
              <Link to="/" className={scss.logo_svg_box}>
                <LogoXS />
              </Link>
            </div>
            <div className={scss.name}>
              {isConstPage && <Name />}
            </div>
            <div className={scss.nav}>
              {isConstPage && <>
                {activeDownload
                  ? <Download />
                  : <Save className={scss.save} />
                }
              </>}
            </div>
          </Container>
        </header>
      : <header className={scss.large}>
          <Container className={scss.box}>
            <Link to="/" className={scss.logo_svg_box}>
              <LogoSM />
            </Link>
            <nav className={scss.nav}>
              <User customer={config.customer} />
            </nav>
          </Container>
        </header>
    }
  </>
}

export default connect(state => ({ ...state }))(Header)
