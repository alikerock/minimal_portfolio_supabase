import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default async function Portfolio({ searchParams }) {
  const supabase = createClient();
  const params =  await searchParams;
  const page = params.page ?? 1;
  
  const PAGE_SIZE = 2;// 페이지당 글 수
  const PAGEGP_SIZE = 3; //페이지네이션 버튼 그룹
  
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

  const pageGp = Math.ceil(pageSafe/PAGEGP_SIZE) //페이지네이션 그룹 번호
  // const pageGpCount = Math.ceil(pagenationCount / PAGEGP_SIZE);
  const groupStart = (pageGp-1)*PAGEGP_SIZE + 1;
  const groupEnd = groupStart + (PAGEGP_SIZE - 1);

  let pageGroupArr = [];

  for(let i = groupStart;i<=groupEnd;i++){
    pageGroupArr.push(i);
  }

  const prevGroupPage = groupStart - PAGEGP_SIZE;
  const nextGroupPage = groupEnd + 1;

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
        {
          pageGp > 1 && <Link 
          href={`?page=${prevGroupPage}`}
          className="secondary-btn"
          >이전</Link>
        }       

        {
          pageGroupArr.map(i=>{
            return <Link 
              key={i} 
              href={`?page=${i}`} 
              className={`secondary-btn ${pageSafe === i ? 'active': ''}`}
            >{i}</Link>
          })
        }   
        {
          groupEnd < totalPages && <Link 
          href={`?page=${nextGroupPage}`}
          className="secondary-btn"
          >다음</Link>
        }                 
       
      </p>
    </div>
  )
}