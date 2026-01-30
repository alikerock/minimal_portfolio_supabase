import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default async function Portfolio({ searchParams }) {
  const supabase = createClient();
  const params =  await searchParams;
  const page = params.page ?? 1;
  
  const PAGE_SIZE = 6;// 페이지당 글 수
  const PAGEGP_SIZE = 5; //페이지네이션 버튼 그룹
  
  //전체 글 수파악
  const { count,error } = await supabase
  .from("portfolio")
  .select("*",{count:"exact", head:true});
  
  console.log(count);
  console.log(error);

  const total = count;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE -1;

  let pageGroupArr = [];

  for(let i = 1;i<=totalPages;i++){
    pageGroupArr.push(i);
  }


  const { data: projects } = await supabase
    .from("portfolio")
    .select()
    .order('id', { ascending: false })
    .range(start, end);

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

        <a href="" className="secondary-btn">1</a>
       
      </p>
    </div>
  )
}