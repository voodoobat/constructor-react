import scss from './Schemes.module.scss'

import Container from '@components/common/Container/Container'
import Dropdown from '@components/common/Dropdown/Dropdown'
import { SchemeButton, SchemeButtonCreate } from '@src/components/schemes/SchemeButton/SchemeButton'

export default function Schemes ({ schemes }) {

  return (
    <div className={scss.schemes}>
      <Container>
        <Dropdown caption="Схемы для вязания спицами">
          <div className={scss.container}>
            <SchemeButtonCreate href="/constructor/create"
                                className={scss.scheme} /> 
            {schemes.map(scheme => (
              <SchemeButton className={scss.scheme}
                            scheme={scheme}
                            key={scheme.schemeId} />
            ))}
          </div>
        </Dropdown>
        <Dropdown caption="Схемы для вязания крючком">
          <SchemeButtonCreate lassName={scss.scheme} />
        </Dropdown>
      </Container>
    </div>
  )
}
