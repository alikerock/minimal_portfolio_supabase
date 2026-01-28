import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default async function Portfolio({ searchParams }) {
  const params = await searchParams;   
  const page = Number(params.page ?? 1);
  const supabase = createClient();

  // ===== Pagination settings =====
  const PAGE_SIZE = 6;        // 한 페이지에 보여줄 프로젝트 수
  const PAGEGP_SIZE = 5;      // 페이지 버튼 그룹 크기

  // 전체 개수(count) 조회 (데이터는 가져오지 않음)
  const { count, error: countError } = await supabase
    .from("portfolio")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return <p>{countError.message}</p>;
  }

  const totalCount = count ?? 0;
  const pagenationCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // page 보정
  const safePage = Math.min(page, pagenationCount);

  // 현재 페이지 데이터 조회 (range는 0-based, 끝 index 포함)
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: projects, error } = await supabase
    .from("portfolio")
    .select()
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    return <p>{error.message}</p>;
  }

  const getPublicURL = (path) => {
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    return data.publicUrl;
  };

  // ===== Page group calculation (same idea as your ProductList) =====
  const pageGp = Math.ceil(safePage / PAGEGP_SIZE);
  const pageGpCount = Math.ceil(pagenationCount / PAGEGP_SIZE);

  const groupStart = (pageGp - 1) * PAGEGP_SIZE + 1;
  const groupEnd = Math.min(groupStart + (PAGEGP_SIZE - 1), pagenationCount);

  const pageGroupArr = [];
  for (let i = groupStart; i <= groupEnd; i++) pageGroupArr.push(i);

  const prevGroupPage = Math.max(1, groupStart - 1);
  const nextGroupPage = Math.min(pagenationCount, groupEnd + 1);

  return (
    <div className="container latest_portfolio">
      <div className="row list">
        {projects?.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="contents shadow">
              {p.thumbnail ? (
                <Image
                  src={getPublicURL(p.thumbnail)}
                  width={364}
                  height={209}
                  alt={p.title}
                />
              ) : (
                <Image
                  src="https://dummyimage.com/364x209/ccc/fff"
                  width={364}
                  height={209}
                  alt="no thumbnail"
                />
              )}

              <div className="hover_contents">
                <div className="list_info">
                  <h3>
                    <Link href={`/portfolio/${p.id}`}>{p.title}</Link>
                    <Image
                      src="/images/portfolio_list_arrow.png"
                      width={6}
                      height={8}
                      alt="list arrow"
                    />
                  </h3>
                  <p>
                    <Link href={`/portfolio/${p.id}`}>Click to see project</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <p className="pagenation shadow">
        {/* prev group */}
        <Link
          href={`?page=${prevGroupPage}`}
          className={`secondary-btn ${pageGp === 1 ? "disabled" : ""}`}
          aria-disabled={pageGp === 1}
          tabIndex={pageGp === 1 ? -1 : 0}
        >
          Prev
        </Link>

        {/* page numbers */}
        {pageGroupArr.map((i) => (
          <Link
            key={i}
            href={`?page=${i}`}
            className={`secondary-btn ${safePage === i ? "active" : ""}`}
          >
            {i}
          </Link>
        ))}

        {/* next group */}
        <Link
          href={`?page=${nextGroupPage}`}
          className={`secondary-btn ${pageGp === pageGpCount ? "disabled" : ""}`}
          aria-disabled={pageGp === pageGpCount}
          tabIndex={pageGp === pageGpCount ? -1 : 0}
        >
          Next
        </Link>
      </p>
    </div>
  );
}
