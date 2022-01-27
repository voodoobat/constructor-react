import scss from './DropInput.module.scss'

import { useState } from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'


export default function DropInput ({ className }) {
  const [image, setImage] = useState(null)
  const [src, setSrc] = useState(null)

  const toBase64 = source => {
    const reader = new FileReader()
    reader.readAsDataURL(source)
    reader.onload = ev => setSrc(ev.target.result)
  }

  const onDrop = img => {
    setImage(img)
    toBase64(img[0])
  }

  return (
    <div className={classNames(className, scss._)}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => ( 
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? (
              <img src={src} className={scss.img} />
            ) : (
              <p className={scss.hint}>
                Кликните для загрузки <br /> или перетащите файл
              </p>
            )}
          </div> 
        )}
      </Dropzone>
    </div>
  )
}
