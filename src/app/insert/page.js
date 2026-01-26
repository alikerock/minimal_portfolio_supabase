"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function Insert(){
  const supabase = createClient();
  const [data, setData] = useState({
    title:'',
    content:'',
    url:'',
    review:'',
    reviewer:'',
    rep1_desc:'',
    rep2_desc:''
  })
  console.log(data);
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setData({
      ...data,
      [name]:value,
    })
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    const { error } = await supabase
    .from('portfolio')
    .insert(data);
  
    if(error){
      console.log('데이터 입력 실패',error);
    }else{
      console.log('데이터 입력 성공');
    }
  }

  return(
    <>
      <h2 className="text-center">프로젝트 입력</h2>
          <div className="contact_form">
            <form action="" onSubmit={onSubmit}>
              <p className="field">
                <label htmlFor="title">제목:</label>
                <input type="text" id="title" name="title" value={data.title} onChange={handleChange} placeholder="Project title"/>
              </p>
              <p className="field">
                <label htmlFor="content">프로젝트 본문:</label>
                <textarea name="content" id="content" onChange={handleChange} cols="30" rows="10" placeholder="project description"></textarea>
              </p>              
              <p className="field">
                <label htmlFor="url">프로젝트 링크</label>
                <input type="url" id="url" name="url" onChange={handleChange} placeholder="프로젝트 링크"/>
              </p>
              <p className="field">
                <label htmlFor="review">리뷰 본문:</label>
                <textarea name="review" id="review" onChange={handleChange} cols="30" rows="10" placeholder="리뷰 본문"></textarea>
              </p>                  
              <p className="field">
                <label htmlFor="reviewer">Phone Number:</label>
                <input type="text" id="reviewer" name="reviewer" onChange={handleChange} placeholder="리뷰 글쓴이"/>
              </p>
              <p className="field">
                <label htmlFor="rep1_img">대표이미지1 :</label>
                <input type="file" accept="image/*" id="rep1_img" name="rep1_img"/>
              </p>
              <p className="field">
                <label htmlFor="rep1_desc">대표이미지1 설명:</label>
                <textarea name="rep1_desc" id="rep1_desc" onChange={handleChange} cols="30" rows="10" placeholder="대표이미지1 설명"></textarea>
              </p>              
              <p className="field">
                <label htmlFor="rep2_img">대표이미지2 :</label>
                <input type="file" accept="image/*" id="rep2_img" name="rep2_img"/>
              </p>
              <p className="field">
                <label htmlFor="rep2_desc">대표이미지2 설명:</label>
                <textarea name="rep2_desc" id="rep2_desc" onChange={handleChange} cols="30" rows="10" placeholder="대표이미지2 설명"></textarea>
              </p>   
              <p className="field">
                <label htmlFor="thumbnail">썸네일 :</label>
                <input type="file" accept="image/*" id="thumbnail" name="thumbnail"/>
              </p>                         
              <p className="submit">
                <input type="submit" className="primary-btn" value="입력"/>
              </p>
            </form>
          </div>      
    </>
  )
}