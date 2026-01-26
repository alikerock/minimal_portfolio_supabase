"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useEffect,useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default  function Detail({ params }) {
  const supabase = createClient();
  const { id } =  React.use(params);
  const [data, setData] = useState(null);
  console.log(id);

  useEffect(()=>{
    (async ()=>{
      const { data, error } = await supabase
        .from('portfolio')
        .select()
        .eq('id', id);
        setData(data[0]); //조회된 글 정보를 변수 data에 할당
    })()
   
  },[id,supabase]);
  console.log(data);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 decription">
          <div className="contents shadow">
            {/* <img src="images/portfolio_single_img1.jpg" alt="img1"> */}
              <p>image description 1</p>
          </div>
          <div className="contents shadow">
            {/* <img src="images/portfolio_single_img2.jpg" alt="img2"> */}
              <p>image description 2</p>
          </div>
        </div>
        <div className="col-md-4 portfolio_info">
          <div className="contents shadow">
            <h2>New Landing Page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <p className="link">
              <a href="">Visit site &rarr;</a>
            </p>
            <hr className="double"/>
              <blockquote>
                <p>“Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.” </p>
                <small>- JOHN DOE, ACME INC. -</small>
              </blockquote>
              <p className="nav">
                <a href="" className="secondary-btn">&larr; Previous Project</a>
                <a href="" className="secondary-btn">Next Project &rarr;</a>
              </p>
          </div>
        </div>
      </div>
    </div>
  )
}