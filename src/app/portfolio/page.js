import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default async function Portfolio() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("portfolio").select().order('id', { ascending: false });
  console.log(projects);

  const getPublicURL = (path)=>{
    const { data } = supabase
      .storage
      .from('portfolio')
      .getPublicUrl(path);
      return data.publicUrl; 
  }
  
  return (
    <div className="container latest_portfolio">
      <div className="row list">
         {
            projects.map(p =>
              <div className="col-md-4" key={p.id}>
                <div className="contents shadow">
                  {
                    p.thumbnail ? 
                    <Image src={getPublicURL(p.thumbnail)} width={364} height=
                  {209} alt={p.title}/> 
                  :
                  <Image src="https://dummyimage.com/364x209/ccc/fff" width={364} height=
                  {209} alt="no thumbnail"/>
                  } 
                    <div className="hover_contents">
                      <div className="list_info">
                        <h3>
                          <a href="">{p.title}</a> 
                          <Image src="/images/portfolio_list_arrow.png" width={6} height={8} alt="list arrow"/>
                        </h3>
                        <p><a href="">Click to see project</a></p>
                      </div>
                    </div>
                </div>
              </div>
            )
          }
      </div>
      <p className="pagenation shadow">
        <a href="" className="secondary-btn active">1</a>
        <a href="" className="secondary-btn">2</a>
        <a href="" className="secondary-btn">3</a>
        <a href="" className="secondary-btn">4</a>
      </p>
    </div>
  )
}