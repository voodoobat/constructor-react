import scss from './Hero.module.scss'

export default function Hero () {
  return (
    <div className={scss.hero}>
      <p className={scss.caption}>
        Бесплатная онлайн-программа по созданию схем для вязания 
      </p>
    </div>
  )
}
