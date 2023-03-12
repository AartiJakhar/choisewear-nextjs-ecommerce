import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from './styles/Navbar.module.css'
export default function Navbar() {
    const router = useRouter();
    const {pathname}=router;
    
       const [dropdownToggled, setdropdownToggle] = useState(false);
       const [background, setbackground] = useState(false)
   
       
       
       const changeBackground=()=>{
        if(window.scrollY>=50){
          setbackground(true)
        }else{
          setbackground(false)
        }
       }
      
       const navToggle=()=>{
         if(dropdownToggled){
           setdropdownToggle(false)
         }else{
           setdropdownToggle(true)
         }
       }
       
   
         if (typeof window !== "undefined") {
           window.addEventListener('scroll',changeBackground)
           
           window.onclick = function (event) {
               if (!event.target.matches('.dropbtn') ) {
                   var dropdowns = document.getElementsByClassName(styles.nav);
                   var i;
                   for (i = 0; i < dropdowns.length; i++) { 
                       var openDropdown = dropdowns[i];
                       if (openDropdown.classList.contains(`${styles.toggle}`)) {
                           console.log('first window')
                           openDropdown.classList.remove(`${styles.toggle}`);
                           setdropdownToggle(false)
                       }
                   }
               }
           }
       }
       let data =[
        {  id:"1" ,
          name:"Home",
          link:"/#",
  
        },
        { id:"2",
          name:"MY Todo",
          link:"/#todoLists",
  
        },
        { id:"3",
          name:"Blogs",
          link:"/#blogs",
  
        },
       ]
       const [dataList, setdataList] = useState(data);
   
  return <>
   <div className={`${styles.nav} ${dropdownToggled? styles.toggle:""} ${background || pathname!=='/'? styles.active :""} ` } >
    <div>
      <Link href="/"  >
      <Image src='/choisewearlogo.svg' width={350} height={50} className={styles.navlogo}  alt="icon"></Image>
      </Link>
    </div>
    <div className={styles.navrow}>
      <nav>
        <ul>
          <li>
            {dataList.map((e)=>{
              return  <Link key={e.id} href={e.link}>{e.name}</Link>
              
            })}
            {/* {user===null?
            <Link href="/userProfile/signin">Singin</Link>
            :
            <button>logout</button>
            
          } */}
  
          </li>
        </ul>
      </nav>
    </div>
    <div className={`${styles.navburgur} dropbtn`}   onClick={navToggle}  >
      <div className={`dropbtn ${styles.line1}`} onClick={navToggle}></div>
      <div className={`dropbtn ${styles.line2}`} onClick={navToggle}></div>
      <div className={`dropbtn ${styles.line3}`} onClick={navToggle}></div>
    </div>
  </div>
  </>;
}
