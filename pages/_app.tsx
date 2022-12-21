import '../styles/globals.css'
import type { AppProps } from 'next/app'
import _Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useState,useEffect} from "react"
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
const [cart, setCart] = useState({})
const [subtotal, setSubtotal] = useState(0)
  // Inject types that this component accepts
const Navbar = _Navbar as unknown as React.JSXElementConstructor<{
  addToCart: any,
  cart:any,
  removeFromCart:any,
  clearCart:any,
  subtotal:any
 }>
 useEffect(() => {
  try {
    if(localStorage.getItem("cart")){

    setCart(JSON.parse(localStorage.getItem("cart") as any))
    setSubtotal(JSON.parse(localStorage.getItem("subtotal") as any))
  }
  } catch (error) {
    console.error(error)
    localStorage.clear()
  }
 
 }, [])
 
 const saveCart=(mycart:any)=>{
       localStorage.setItem("cart",JSON.stringify(mycart))
       localStorage.setItem("subtotal",JSON.stringify(subtotal))
       let subt:any=0;
       let keys= Object.keys(cart)
       console.log(mycart)
       console.log(mycart.length !=0)
      //  if(mycart[keys]){
       for (let i = 0; i <keys.length; i++) {
        if(mycart[keys[i]]){
          subt +=mycart[keys[i]].price*mycart[keys[i]].qty;
        }
        
      //  }
      }
       setSubtotal(subt)
 }
  const addToCart=(itemCode:number,qty:number,price:number,name:string,size:string,variant:string)=>{
  
     const newCart:any=cart;
     if(itemCode in cart){
          newCart[itemCode].qty=newCart[itemCode].qty+qty
     }else{
        newCart[itemCode]={qty:1,price,name,size,variant}
     }
     setCart(newCart)
     saveCart(newCart)
  }
  const clearCart=()=>{ 
saveCart({})
    setCart({})
  }
  const buyNow=async(itemCode:number,qty:number,price:number,name:string,size:string,variant:string)=>{
    let newCart={ itemCode:{qty:1,price,name,size,variant}}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }
  const removeFromCart=(itemCode:number,qty:number,price:number,name:string,size:string,variant:string)=>{
  
    const newCart:any=JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
         newCart[itemCode].qty=newCart[itemCode].qty-qty
    }
    console.log(newCart[itemCode])
    if(newCart[itemCode].qty<=0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
 }
  return <>
   <Navbar addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
   <Component buyNow={buyNow} subtotal={subtotal} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} {...pageProps} />
   <Footer/></>
}
