import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default async function Home() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("portfolio").select().limit(3);
  console.log(projects);

  return (
    <>
      <div className="container latest_portfolio">
        <div className="row intro">
          <div className="col-md-4">
            <div className="contents shadow">
              <h2 className="heading2">I&apos;m alikerock</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contents shadow">
              <h2 className="heading2">I create super awesome stuff</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contents shadow">
              <h2 className="heading2">I&apos;m available for freelance projects</h2>
            </div>
          </div>
        </div>
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


          {/* <div className="col-md-4">
            <div className="contents shadow">
              <img src="images/latest_portfolio_01.jpg" alt="latest_portfolio_01">
                <div className="hover_contents">
                  <div className="list_info">
                    <h3><a href="">Project Title</a> <img src="images/portfolio_list_arrow.png" alt="list arrow"></h3>
                    <p><a href="">Click to see project</a></p>
                  </div>
                </div>
            </div>
          </div>    */}
        </div>
        <p className="porfolio_readmore">
          <a href="" className="primary-btn">See my full portfolio</a>
        </p>
      </div>
    </>
  );
}
