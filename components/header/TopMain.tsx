import Link from 'next/link';
import styles from './styles/Home.module.css'
import Typewriter from 'typewriter-effect';
export default function TopMain() {
  return     <section id="home" className={styles.home}>
<div className={`${styles.bgHeader}`}>

</div>
<div className='left-0 right-0 py-64 absolute flex flex-col items-center sm:px-20  px-10 justify-center text-center'>
<h1 className={styles.banner}>
          Welcome to <span className=''>CHOISEWEAR</span>
        </h1>
        <div className={styles.slogan}>
        Here you can buy best designed or quaility - 
        <Typewriter
  options={{
    strings: ['T-shirts', 'Hoodies','Mugs','Stickers'],
    autoStart: true,
    loop: true,
  }}
/>
 </div>

</div>
  {/* {user===null && <Link href="/userProfile/signin"><button> get started</button></Link>} */}

  
  
  <div className={`${styles.wave} ${styles.wave1}`}></div>
  <div className={`${styles.wave} ${styles.wave2}`}></div>
  <div className={`${styles.wave} ${styles.wave3}`}></div>
  
  <div className={`fas ${styles.faCog} fa-cog ${styles.nut1}`}></div>
  <div className={`fas ${styles.faCog} fa-cog ${styles.nut2}`}></div>
  
  
  </section>;
}
