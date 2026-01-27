import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default async  function Detail({ params }) {
  const supabase = createClient();
  const { id } =  await params;

  //현재글 조회
  const { data:current } = await supabase
        .from('portfolio')
        .select()
        .eq('id', id)
        .single();

  //이전글
  const { data:prev } = await supabase
    .from('portfolio')
    .select('id')
    .lt('created_at', current.created_at)
    .order('created_at',{ascending:false})
    .limit(1)
    .maybeSingle();

  
  //다음글
  const { data:next } = await supabase
    .from('portfolio')
    .select('id')
    .gt('created_at', current.created_at)
    .limit(1)
    .maybeSingle();    


  console.log(current);
  console.log(prev, next);

  const getPublicURL = (path)=>{
    const { data } = supabase
      .storage
      .from('portfolio')
      .getPublicUrl(path);
    return data.publicUrl; 
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 decription">
          <div className="contents shadow">
            {
              current.rep1_img ? 
              <>
                <Image src={getPublicURL(current.rep1_img)} width={762} height={504} alt={current.rep1_desc}/> 
                <p>{current.rep1_desc}</p>
              </>
              :
              <p>대표이미지1이 등록되지 않았습니다.</p>
            }
            {
              current.rep2_img ? 
              <>
                <Image src={getPublicURL(current.rep2_img)} width={762} height={504} alt={current.rep2_desc}/> 
                <p>{current.rep2_desc}</p>
              </>
               :
              <p>대표이미지2가 등록되지 않았습니다.</p>
            }           
          </div>
          
        </div>
        <div className="col-md-4 portfolio_info">
          <div className="contents shadow">
            <h2>{current.title}</h2>
            <div>{current.content}</div>           
            <p className="link">
              <a href={current.url}>Visit site &rarr;</a>
            </p>
            <hr className="double"/>
              <blockquote>
                <p>{current.review}</p>
                <small>- {current.reviewer} -</small>
              </blockquote>
              <p className="nav">
                {
                  prev &&  <Link href={`/detail/${prev.id}`} className="secondary-btn">&larr; Previous Project</Link>
                }
                {
                  next &&  <Link href={`/detail/${next.id}`} className="secondary-btn">Next Project &rarr;</Link>
                }
              </p>
          </div>
        </div>
      </div>
    </div>
  )
}