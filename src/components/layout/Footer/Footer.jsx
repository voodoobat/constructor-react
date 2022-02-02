import scss from './Footer.module.scss'

import { ReactSVG } from 'react-svg'

import { connect } from 'react-redux'
import Container from '@components/layout/Container/Container'

import { ReactComponent as Logo } from './svg/logo.svg'

function Footer ({ config }) {
  const { resources, socials } = config

  return (
    <footer className={scss._}>
      <Container className={scss.container}>
        <a className={scss.logo} href={resources.catalog}>
          <Logo />
        </a>
        <nav className={scss.nav}>
          <span className={scss.nav_item}>
            <a href={resources.catalog}>Вязаный.рф интернет-магазин пряжи</a>
          </span>
          <span className={scss.nav_item}>
            <a href={resources.articles}>Мастер-классы</a>
          </span>
          <span className={scss.nav_item}>
            <a href={resources.delivery}>Доставка по России от 1 мотка</a>
          </span>
          <span className={scss.nav_item}>
            <a href={resources.contest}>Конкурс</a>
          </span>
          <span className={scss.nav_item}>
            <a href={resources.catalog}>Каталог</a>
          </span>
          <span className={scss.nav_item}>
            <a href={resources.discount}>Скидки</a>
          </span>
        </nav>
        <nav className={scss.sm}>
          <div className={scss.sm_caption}>
            Вязаный в соцсетях
          </div>
          <div className={scss.sm_list}>
            <a href={socials.instagram} target="_blank" rel="noreferrer">
              <ReactSVG src="/svg/sm/in.svg" />
            </a>
            <a href={socials.vk} target="_blank" rel="noreferrer">
              <ReactSVG src="/svg/sm/vk.svg" />
            </a>
            <a href={socials.youtube} target="_blank" rel="noreferrer">
              <ReactSVG src="/svg/sm/yt.svg" />
            </a>
          </div>
        </nav>
      </Container>
    </footer>
  )
}

export default connect((state => ({ ...state })))(Footer)
