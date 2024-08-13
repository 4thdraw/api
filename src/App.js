import React, { useState, useEffect } from 'react'
import { supabase } from './api/dbconfig'

function App() {
  const [ gnblist , setData] = useState([]);
  const [ gnbview, setView ] = useState("글보기내용이 없습니다.");
  const boardtype = ['list', 'view', 'modify', 'delet']; // 페이지핸들링변수
  const [pagestatue, pageSet] = useState(boardtype[0]); 
  // 라우터없이 하나 컴포넌트에서 page상태에 따라 노출

  const apilistview = async () => { // 글보기와 글목록 // 한계점을 50
    
    let { data: items, error } = await supabase.from('navidb').select('*').limit(50);

    console.log(items, Array.isArray(items))

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setData(items) // [] -> [navidb 데이터로 채워짐]
    }

  }
  const apidelet = async (pk) => { // 글삭제 pk가 반드시 필요 -> 매개인자
    
    let { data: items, error } = await supabase
    .from('navidb').delete().eq('wr_id',pk);

    console.log(items, Array.isArray(items))

    if (error) {
      console.error('Error deleting data:', error);
      return;  // 오류가 발생하면 함수 종료
    }
    
    apilistview(); // 삭제이후 갱신된 데이터 다시 가져오기
  

  }

  // 비동기 삭제함수 -> pk알려주기

  useEffect(() => {

    apilistview(); //  실행

    return ()=>{

    }
    // 여기에 개발코드 넣으면 완전 오리지널 초보
  }, [])
  return (
    <div className="App">
      {
        pagestatue === 'list' ?
          <div className='listpage'>
         <h1>목록페이지 total : { gnblist.length } </h1>
         {
           gnblist.length > 0 ? 
           <ul>
             {
              gnblist.map(( v, i)=>{
                 return(
                  <li key={v.wr_id} >
                    <p onClick={()=>{ 
                      setView(v.gnblink); pageSet('view');  }}>{ v.gnbnm }</p>
                    <button>수정</button><button onClick={()=>{ apidelet(v.wr_id); }}>삭제</button>
                  </li>
                 )
              })
             }
           </ul> 
           : <div>로딩화면 제작해줘</div>
         }

          </div>
        : pagestatue === 'view' ? 
            <div  className='viewpage'>
              <h1>글보기(pk반드시 존재)</h1>
              <div>
                { gnbview }
              </div> 
              <button onClick={()=>{
                pageSet('list');
              }}>목록</button>   
            </div> 
          : pagestatue === 'modify' ? 
              <div className='writepage'>
              <h1>글쓰기(pk없음) & 글수정(pk반드시 존재)</h1>
              </div>
            : <div  className='deletpage'>
                <h1>글삭제(pk반드시 존재)</h1>
              </div>
      }
    </div>
  );
}

export default App;
