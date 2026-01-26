"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function Insert() {
  const supabase = createClient();
  const [user, setUser] = useState(null);//supabase의 유저 정보
  const [authForm, setAuthForm] = useState({
    email:'',
    password:''
  });// 로그인폼에서 입력한 사용자 정보

  const [data, setData] = useState({
    title: '',
    content: '',
    url: '',
    review: '',
    reviewer: '',
    rep1_desc: '',
    rep2_desc: ''
  });
  const [file, setFile] = useState(null);

  useEffect(()=>{
    (async ()=>{
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    })()    
  },[supabase.auth]);


  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev)=>
      ({ ...prev,
      [name]: value,
      })      
    );
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authForm.email,
      password: authForm.password,
    });
    if(error){
      alert('로그인 실패');
      console.log(error);
    }else{
      alert('로그인 성공');
      setUser(data.user);
    }
  }


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let uploadedFilePath = ''
    //파일 업로드
    if (file) {
      uploadedFilePath = await uploadFile(file);
    }

    //데이터 추가
        const { error } = await supabase
      .from('portfolio')
      .insert({
        ...data,
         thumbnail:uploadedFilePath
      });


    if (error) {
      console.log('데이터 입력 실패', error);
    } else {
      console.log('데이터 입력 성공');
    }
  }

  async function uploadFile(file) {
    const filepath = `thumbnail/${file.name}`;

    const { data, error } = await supabase.storage.from('portfolio').upload(filepath, file)
    if (error) {
      // Handle error
      console.log(error);
    } else {
      // Handle success
      console.log('파일 업로드 성공', data); //data.path
      // return filepath;
      return data.path;
    }
  }
  if (!user) {
    return (
      //로그인 폼
      <div className="container about_content contact_form shadow">
        <h2 className="mb-3">로그인 폼</h2>
        <form action="" onSubmit={handleLogin}>
          <p className="field">
            <label htmlFor="userEmail">이메일:</label>
            <input type="email" id="userEmail" value={authForm.email} onChange={handleAuthChange} name="email"  placeholder="이메일 입력" />
          </p>
          <p className="field">
            <label htmlFor="userPw">비밀번호:</label>
            <input type="password" name="password" value={authForm.password} id="userPw" onChange={handleAuthChange} placeholder="비밀번호"/>
          </p>
          <p className="submit">
            <input type="submit" className="primary-btn" value="로그인" />
          </p>
        </form>
      </div>
    )
  }

  console.log(user);

  return (
    <>
      <div className="container about_content contact_form shadow">
        <h2 className="mb-3">프로젝트 입력</h2>
        <form action="" onSubmit={onSubmit}>
          <p className="field">
            <label htmlFor="title">제목:</label>
            <input type="text" id="title" name="title" value={data.title} onChange={handleChange} placeholder="Project title" />
          </p>
          <p className="field">
            <label htmlFor="content">프로젝트 본문:</label>
            <textarea name="content" id="content"  value={data.content} onChange={handleChange} cols="30" rows="10" placeholder="project description"></textarea>
          </p>
          <p className="field">
            <label htmlFor="url">프로젝트 링크</label>
            <input type="url" id="url" name="url" value={data.url} onChange={handleChange} placeholder="프로젝트 링크" />
          </p>
          <p className="field">
            <label htmlFor="review">리뷰 본문:</label>
            <textarea name="review" id="review" value={data.review} onChange={handleChange} cols="30" rows="10" placeholder="리뷰 본문"></textarea>
          </p>
          <p className="field">
            <label htmlFor="reviewer">Phone Number:</label>
            <input type="text" id="reviewer" value={data.reviewer} name="reviewer" onChange={handleChange} placeholder="리뷰 글쓴이" />
          </p>
          <p className="field">
            <label htmlFor="rep1_img">대표이미지1 :</label>
            <input type="file" accept="image/*" id="rep1_img" name="rep1_img" />
          </p>
          <p className="field">
            <label htmlFor="rep1_desc">대표이미지1 설명:</label>
            <textarea name="rep1_desc" id="rep1_desc" value={data.rep1_desc} onChange={handleChange} cols="30" rows="10" placeholder="대표이미지1 설명"></textarea>
          </p>
          <p className="field">
            <label htmlFor="rep2_img">대표이미지2 :</label>
            <input type="file" accept="image/*" id="rep2_img" name="rep2_img" />
          </p>
          <p className="field">
            <label htmlFor="rep2_desc">대표이미지2 설명:</label>
            <textarea name="rep2_desc" id="rep2_desc" value={data.rep2_desc} onChange={handleChange} cols="30" rows="10" placeholder="대표이미지2 설명"></textarea>
          </p>
          <p className="field">
            <label htmlFor="thumbnail">썸네일 :</label>
            <input type="file" accept="image/*" id="thumbnail" name="thumbnail" onChange={handleFileChange} />
          </p>
          <p className="submit">
            <input type="submit" className="primary-btn" value="입력" />
          </p>
        </form>
      </div>
    </>
  )
}