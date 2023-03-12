import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState,useRef } from "react";
import styles from './styles/Navbar.module.css'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
export default function Navbar({ logOut, user, addToCart, cart, removeFromCart, clearCart }: any) {
  const ref: any = useRef()
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
         
       }
       const [sidebarToggler, setSidebarToggler] = useState(true)
       let dataList =[
        {  id:"1" ,
          name:"Tshirts",
          link:"/items/tshirts",
  
        },
        { id:"2",
          name:"Hoodies",
          link:"/items/hoodies",
  
        },
        { id:"3",
          name:"Mugs",
          link:"/items/mugs",
  
        },
        { id:"4",
          name:"Stickers",
          link:"/items/stickers",
  
        },
       ]
   

       const toggleCart = () => {
        setSidebarToggler(!sidebarToggler)
      }
      const [userdropdown, setUserdropdown] = useState(false)
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
    <div className="flex flex-row">
    <div className="absolute right-14 max-md:-top-[.8rem] max-lg:top-3" >
          <button className=" mx-3 inline-flex items-center bg-transparent border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0 " onClick={toggleCart}>Cart<AiOutlineShoppingCart />
</button>
{user.value !== null && user.value != 'undefined' ? <button onMouseOver={() => { setUserdropdown(true) }} onMouseLeave={() => { setUserdropdown(false) }} className=" inline-flex items-center bg-transparent border-0 py-2 pr-8 focus:outline-none  rounded text-base mt-4 md:mt-0"> <FaUserAlt />
          </button> :
            <Link href={"/login"}>
              <button className='inline-flex items-center bg-transparent border-0 py-2 pr-8 focus:outline-none  rounded text-base mt-4 md:mt-0'>Singin</button> </Link>}

    </div>
    <div className={`${styles.navburgur} dropbtn`}   onClick={navToggle}  >
      <div className={`dropbtn ${styles.line1}`} onClick={navToggle}></div>
      <div className={`dropbtn ${styles.line2}`} onClick={navToggle}></div>
      <div className={`dropbtn ${styles.line3}`} onClick={navToggle}></div>
    </div>
    <div onMouseOver={() => { setUserdropdown(true) }} onMouseLeave={() => { setUserdropdown(false) }}>

{user.value && userdropdown &&
  <div className="absolute right-0 pt-4 max-md:top-10 md:top-12 ">
    <div className={`rounded bg-[#9e00bb]  pr-20 pl-4 py-2 shadow-lg     cursor-pointer `}>
      <ul>
        <li className='hover:border-solid hover:border-x-blue-100 py-2 hover:border-b active:text-black'><Link href={"/orders/orders"}>Orders</Link> </li>
        <li className='hover:border-solid hover:border-x-blue-100 py-2 hover:border-b active:text-black'><Link href={"/profile/myprofile"}>Profile</Link></li>
        <li className='hover:border-solid hover:border-x-blue-100 py-2 hover:border-b active:text-black' onClick={logOut}>Log out</li>
      </ul>
    </div> </div>}

</div>
    </div>
    {/* //user  */}

    {/* sidebarcart */}
    <div ref={ref} className={`sidecart h-[100vh]  overflow-auto absolute right-0 top-0 ${styles.sidebarcart} p-10 transition-transform ${sidebarToggler ? "translate-x-full" : "translate-x-0"}`}>
        <h2 className='font-bold text-xl  text-center'>Shoping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl  "><AiFillCloseCircle /></span>

        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='text-center my-1 text-red-600'>no items in the cart</div>}
          {Object.keys(cart).length !== 0 && Object.keys(cart).map((item: any) => {
            return <li key={item}>
              <div className="item flex my-5">
                <div className="w-2/3 font-semibold "> {cart[item].name} ({cart[item].variant}/{cart[item].size})</div>
                <div className="flex font-semibold items-center justify-center w-1/3 text-lg ">
                  <AiFillMinusCircle onClick={() => { removeFromCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} className='cursor-pointer text-pink-500' />
                  <span className='mx-2'>{cart[item].qty}</span>
                  <AiFillPlusCircle onClick={() => { addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }} />
                </div>
              </div>
            </li>
          })
          }
        </ol>
        <div className='flex align-middle justify-between mt-3  flex-wrap  '>
          <Link href={"/checkout"}> <button disabled={Object.keys(cart).length == 0} className={`${styles.bg} flex my-3 text-white disabled:bg-blue-200  border-0 py-2 px-1 focus:outline-none  rounded text-sm`}> <BsFillBagCheckFill className='m-1' /> Check Out</button></Link>
          <button disabled={Object.keys(cart).length == 0} className={`my-3 mx-2  text-white disabled:bg-blue-200 ${styles.bg} border-0 py-2 px-4 focus:outline-none rounded text-sm`} onClick={clearCart}>Clear Cart</button>
        </div>

      </div>
  </div>
  </>;
}
