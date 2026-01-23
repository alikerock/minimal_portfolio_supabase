export default function Insert(){
  return(
    <>
      <h2 className="text-center">프로젝트 입력</h2>
          <div className="contact_form">
            <form action="">
              <p className="field">
                <label htmlhtmlFor="title">제목:</label>
                <input type="text" id="title" name="title" placeholder="Project title"/>
              </p>
              <p className="field">
                <label htmlFor="content">프로젝트 본문:</label>
                <textarea name="content" id="content" cols="30" rows="10" placeholder="project description"></textarea>
              </p>              
              <p className="field">
                <label htmlFor="url">프로젝트 링크</label>
                <input type="url" id="url" placeholder="프로젝트 링크"/>
              </p>
              <p className="field">
                <label htmlFor="review">리뷰 본문:</label>
                <textarea name="review" id="review" cols="30" rows="10" placeholder="리뷰 본문"></textarea>
              </p>                  
              <p className="field">
                <label htmlFor="reviewer">Phone Number:</label>
                <input type="text" id="reviewer" placeholder="리뷰 글쓴이"/>
              </p>
              <p className="field">
                <label htmlFor="rep1_img">대표이미지1 :</label>
                <input type="file" accept="image/*" id="rep1_img" name="rep1_img"/>
              </p>
              <p className="field">
                <label htmlFor="rep1_desc">대표이미지1 설명:</label>
                <textarea name="rep1_desc" id="rep1_desc" cols="30" rows="10" placeholder="대표이미지1 설명"></textarea>
              </p>              
              <p className="field">
                <label htmlFor="rep2_img">대표이미지2 :</label>
                <input type="file" accept="image/*" id="rep2_img" name="rep2_img"/>
              </p>
              <p className="field">
                <label htmlFor="rep2_desc">대표이미지2 설명:</label>
                <textarea name="rep2_desc" id="rep2_desc" cols="30" rows="10" placeholder="대표이미지2 설명"></textarea>
              </p>   
              <p className="field">
                <label htmlFor="thumbnail">썸네일 :</label>
                <input type="file" accept="image/*" id="thumbnail" name="thumbnail"/>
              </p>                         
              <p className="submit">
                <input type="submit" className="primary-btn" value="입력"/>
              </p>
            </form>
          </div>      
    </>
  )
}