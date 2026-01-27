"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

const INITIAL_DATA = {
  title: "",
  content: "",
  url: "",
  review: "",
  reviewer: "",
  rep1_img: "",
  rep1_desc: "",
  rep2_img: "",
  rep2_desc: "",
  thumbnail: "",
};

export default function Insert() {
  // const supabase = createClient();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState(null);//supabase의 유저 정보
  const [authForm, setAuthForm] = useState({
    email: '',
    password: ''
  });// 로그인폼에서 입력한 사용자 정보

  const [data, setData] = useState(INITIAL_DATA);
  /*
  const [thumbFile, setThumbFile] = useState(null);
  const [img1File, setImg1File] = useState(null);
  const [img2File, setImg2File] = useState(null);

  const fileRef1 = useRef(null);
  const fileRef2 = useRef(null);
  const fileRef3 = useRef(null);
  */

  // 파일 3개를 하나로 관리
  const [files, setFiles] = useState({
    thumbnail: null,
    rep1_img: null,
    rep2_img: null,
  });

  const fileRef = useRef({
    rep1_img: null,
    rep2_img: null,
    thumbnail: null,
  });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    })()
  }, [supabase]);

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) =>
    ({
      ...prev,
      [name]: value,
    })
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authForm.email,
      password: authForm.password,
    });
    if (error) {
      alert('로그인 실패');
      console.log(error);
    } else {
      alert('로그인 성공');
      setUser(data.user);
    }
  }
  /*
  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];
    setThumbFile(selectedFile);
  }
  const handleImg1Change = (e) => {
    const selectedFile = e.target.files[0];
    setImg1File(selectedFile);
  }
  const handleImg2Change = (e) => {
    const selectedFile = e.target.files[0];
    setImg2File(selectedFile);
  }
  */
  /*
   function handleFileChange(key){
     function change(e){
       const selected = e.target.files?.[0] ?? null;
       setFiles((prev) => ({ ...prev, [key]: selected }));
     }
   }
 */
  const handleFileChange = (key) => (e) => {
    const selected = e.target.files?.[0] ?? null;
    console.log(selected);
    setFiles((prev) => ({ ...prev, [key]: selected }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    //파일 업로드
    if (!files.thumbnail) {
      alert("썸네일이 없으면 글 등록이 되지 않습니다.");
      return;
    }

    const result = await uploadFile(files.thumbnail, 'thumbnail');
    console.log(result);
    if (!result.ok) {
      alert(`파일 업로드 실패: ${result.error.message}`);
      return;
    }

    const result2 = files.rep1_img ? await uploadFile(files.rep1_img, 'rep1Img') : null;
    console.log(result2);    
    if (result2?.ok === false) {
      alert(`파일 업로드 실패: ${result2.error.message}`);
    }
    
    const result3 = files.rep2_img ? await uploadFile(files.rep2_img, 'rep2Img') : null;
    console.log(result3);
    if (result3?.ok === false) {
      alert(`파일 업로드 실패: ${result3.error.message}`);
    }


    //데이터 추가
    const { error } = await supabase
      .from('portfolio')
      .insert({
        ...data,
        thumbnail: result.path,
        rep1_img: result2?.path,
        rep2_img: result3?.path,
      });

    if (error) {
      console.log('데이터 입력 실패', error);
    } else {
      alert('글 입력 성공');
      setData(INITIAL_DATA);
      setFiles({ thumbnail: null, rep1_img: null, rep2_img: null });
      // input[type=file] 값 초기화
      Object.values(fileRef.current).forEach((el) => {
        if (el) el.value = "";
      });
    }
  }

  /*
  async function uploadFile(file, path) {
    const filepath = `${path}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage.from('portfolio').upload(filepath, file)
    if (error) {
      // Handle error
      return { ok: false, error };
    } else {
      // Handle success
      console.log('파일 업로드 성공', data); //data.path
      // return filepath;
      return { ok: true, path: data.path }
    }
  }
  */
   const uploadFile = useCallback(
    async (file, folder) => {
      const filepath = `${folder}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("portfolio")
        .upload(filepath, file);

      if (error) return { ok: false, error };
      return { ok: true, path: data.path };
    },
    [supabase]
  );


  if (!user) {
    return (
      //로그인 폼
      <div className="container about_content contact_form shadow">
        <h2 className="mb-3">로그인 폼</h2>
        <form action="" onSubmit={handleLogin}>
          <p className="field">
            <label htmlFor="userEmail">이메일:</label>
            <input type="email" id="userEmail" value={authForm.email} onChange={handleAuthChange} name="email" placeholder="이메일 입력" />
          </p>
          <p className="field">
            <label htmlFor="userPw">비밀번호:</label>
            <input type="password" name="password" value={authForm.password} id="userPw" onChange={handleAuthChange} placeholder="비밀번호" />
          </p>
          <p className="submit">
            <input type="submit" className="primary-btn" value="로그인" />
          </p>
        </form>
      </div>
    )
  }

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
            <textarea name="content" id="content" value={data.content} onChange={handleChange} cols="30" rows="10" placeholder="project description"></textarea>
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
            <input type="file" ref={(el) => (fileRef.current.rep1_img = el)} accept="image/*" id="rep1_img" name="rep1_img" onChange={handleFileChange("rep1_img")} />
          </p>
          <p className="field">
            <label htmlFor="rep1_desc">대표이미지1 설명:</label>
            <textarea name="rep1_desc" id="rep1_desc" value={data.rep1_desc} onChange={handleChange} cols="30" rows="10" placeholder="대표이미지1 설명"></textarea>
          </p>
          <p className="field">
            <label htmlFor="rep2_img">대표이미지2 :</label>
            <input type="file" ref={(el) => (fileRef.current.rep2_img = el)} accept="image/*" id="rep2_img" name="rep2_img" onChange={handleFileChange("rep2_img")} />
          </p>
          <p className="field">
            <label htmlFor="rep2_desc">대표이미지2 설명:</label>
            <textarea name="rep2_desc" id="rep2_desc" value={data.rep2_desc} onChange={handleChange} cols="30" rows="10" placeholder="대표이미지2 설명"></textarea>
          </p>
          <p className="field">
            <label htmlFor="thumbnail">썸네일 :</label>
            <input type="file" ref={(el) => (fileRef.current.thumbnail = el)} accept="image/*" id="thumbnail" name="thumbnail" onChange={handleFileChange("thumbnail")} />
          </p>
          <p className="submit">
            <input type="submit" className="primary-btn" value="입력" />
          </p>
        </form>
      </div>
    </>
  )
}