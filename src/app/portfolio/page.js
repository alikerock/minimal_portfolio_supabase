import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default async function Portfolio() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("portfolio").select();
  console.log(projects);  
  return (
    <div className="container latest_portfolio">
      <div className="row list">
         {
            projects.map(p =>
              <div className="col-md-4" key={p.id}>
                <div className="contents shadow">
                  {/* <img src="images/latest_portfolio_01.jpg" alt="latest_portfolio_01"> */}
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