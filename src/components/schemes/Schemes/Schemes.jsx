import scss from './Schemes.module.scss'

import Container from '@components/layout/Container/Container'
import Dropdown from '@components/common/Dropdown/Dropdown'
import Pager from '@components/common/Pager/Pager'
import {
  SchemeButton,
  SchemeButtonCreate,
} from '@src/components/schemes/SchemeButton/SchemeButton'

export default function Schemes({ schemes, paginator }) {
  return (
    <div className={scss._}>
      <Container>
        <Dropdown caption="Схемы для вязания спицами" disabled={true}>
          <div className={scss.container}>
            <SchemeButtonCreate
              href="/constructor/create"
              className={scss.scheme}
            />
            {schemes.map((scheme) => (
              <SchemeButton
                key={scheme.schemeId}
                className={scss.scheme}
                scheme={scheme}
              />
            ))}
          </div>
        </Dropdown>
        {paginator && paginator.limit < paginator.total && (
          <Pager className={scss.pager} />
        )}
        {/*<Dropdown caption="Схемы для вязания крючком">*/}
        {/*  <SchemeButtonCreate lassName={scss.scheme} />*/}
        {/*</Dropdown>*/}
      </Container>
    </div>
  )
}
