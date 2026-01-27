import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default async  function Detail({ params }) {
  const supabase = createClient();
  const { id } =  await params;
  const { data, error } = await supabase
        .from('portfolio')
        .select()
        .eq('id', id)
        .single();

  console.log(data);

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
            <Image src={getPublicURL(data.rep1_img)} width={762} height={504} alt={data.rep1_desc}/> 
              <p>{data.rep1_desc}</p>
          </div>
          <div className="contents shadow">
            <Image src={getPublicURL(data.rep2_img)} width={762} height={504}  alt={data.rep2_desc}/>
              <p>{data.rep2_desc}</p>
          </div>
        </div>
        <div className="col-md-4 portfolio_info">
          <div className="contents shadow">
            <h2>{data.title}</h2>
            <div>{data.content}</div>           
            <p className="link">
              <a href={data.url}>Visit site &rarr;</a>
            </p>
            <hr className="double"/>
              <blockquote>
                <p>{data.review}</p>
                <small>- {data.reviewer} -</small>
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