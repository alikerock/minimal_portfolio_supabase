"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginStatus(){
  const supabase = createClient();  
  const router = useRouter()

  const [user, setUser] = useState(null);

  useEffect(()=>{
    (async ()=>{
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    })()    
  },[supabase.auth]);
  
  const handleSignout = async ()=>{
    const { error } = await supabase.auth.signOut()
    if(!error){
      setUser(null);
      router.push('/');
    } else{
      alert(error);
    }
  }
  console.log(user);
  return(
    <>
      {user && <button onClick={handleSignout}>로그아웃</button>}  
    </>
  )
}