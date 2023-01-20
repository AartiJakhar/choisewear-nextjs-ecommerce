import '../styles/globals.css'
import type { AppProps } from 'next/app'
import _Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useState,useEffect} from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
const [cart, setCart] = useState({})
const [key, setKey]  = useState(0)
const [user, setUser] = useState<object>({value:null})
const [subtotal, setSubtotal] = useState<any>(null)
const [progress, setProgress] = useState(0)
  // Inject types that this component accepts
const Navbar = _Navbar as unknown as React.JSXElementConstructor<{
  addToCart: any,
  cart:any,
  removeFromCart:any,
  clearCart:any,
  subtotal:any,
  user:object,
  logOut:Function,
 }>
 useEffect(() => {
  
  router.events.on('routeChangeStart', (()=>{
     setProgress(30)
  }))
  router.events.on('routeChangeComplete', (()=>{
     setProgress(100)
  }))

   
  try {
    if(localStorage.getItem("cart")){

    setCart(JSON.parse(localStorage.getItem("cart") as any))
    setSubtotal(JSON.parse(localStorage.getItem("subtotal") as any))
  }
  } catch (error) {
    console.error(error)
    localStorage.clear()
  }
 setKey(Math.random())
 setUser({value : localStorage.getItem("token")})
 }, [router.query])

 useEffect(()=>{
  if(subtotal!==null){

    localStorage.setItem("subtotal",JSON.stringify(subtotal))
  }
 },[subtotal])
 
 const saveCart=(mycart:any)=>{
       localStorage.setItem("cart",JSON.stringify(mycart))
      
       let subt:any=0;
       let keys= Object.keys(cart)
 
      //  if(mycart[keys]){
       for (let i = 0; i <keys.length; i++) {
        if(mycart[keys[i]]){
          subt +=mycart[keys[i]].price*mycart[keys[i]].qty;
        }
        
      //  }
      }
       setSubtotal(subt)
       localStorage.setItem("subtotal",JSON.stringify(subtotal))
 }
  const addToCart=(itemCode:string,qty:number,price:number,name:string,size:string,variant:string)=>{
  
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
    setSubtotal(0)
  }
  const buyNow=async(itemCode:string,qty:number,price:number,name:string,size:string,variant:string)=>{
  
    let newCart :any= {}
    newCart[itemCode]= {qty:1,price,name,size,variant}
    setCart(newCart)
    saveCart(newCart) 
    setSubtotal(price)
    router.push('/checkout')
  }
  const removeFromCart=(itemCode:number,qty:number,price:number,name:string,size:string,variant:string)=>{
  
    const newCart:any=JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
         newCart[itemCode].qty=newCart[itemCode].qty-qty
    }

    if(newCart[itemCode].qty<=0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
 }
 const logOut=()=>{
  localStorage.removeItem("token")
  setUser({value:null})
    toast.success('🦄 You have SuccessFully Loged Out ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          router.push('/')
 }
  return <>
   <Head>
       <title>ChoiceWear.com - Wear the code</title>
       <meta  name="description" content="ChoiceWear.com - Wear the code"/>
       <link rel="icon" href="/fevicon.png"/>
    </Head>
    <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
   <Navbar key={key} user={user} logOut={logOut} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
       <ToastContainer/>
   <Component buyNow={buyNow} subtotal={subtotal} addToCart={addToCart} cart={cart} setCart={setCart} removeFromCart={removeFromCart} saveCart={saveCart} clearCart={clearCart} {...pageProps} />
   <Footer/></>
}
