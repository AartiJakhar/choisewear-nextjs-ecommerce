import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TopMain from "./TopMain";

export default function Header({ logOut, user, addToCart, cart, removeFromCart, clearCart }: any) {
  const [show, setShow] = useState(false);
  
  const router=useRouter()
  useEffect(() => {
if(router.pathname==="/"){
  setShow(true)
}else{
  setShow(false)
}
  }, [router.query]);
  
  return <>
  <header className={`${show?"h-screen":""}`}>
    <Navbar  user={user} logOut={logOut} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart}  />
    {show&&<TopMain />}
    
  </header>
  </>;
}
