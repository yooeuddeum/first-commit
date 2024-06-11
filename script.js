// * HTML 문서 자체를 완전히 출력시킴
// * 모든 지연된 파일이 실행될 때 발생
// * 이벤트를 수신하는 경우 감시 또는 추적 방법에 관한 장치를 찾을 수 있음
// * 문서 자체가 완전 로드되면 실행
document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("note-form");
  console.log(noteForm);
  const notesList = document.getElementById("notes-list");
  console.log(notesList);
  const viewNotes = document.getElementById("view-notes");
  console.log(viewNotes);

  //* 해당 데이터 입력 값 송수신 noteForm자체에 script가 요청을 하는 방식?
  //* 제목과 내용을 입력하고 submit을 하면 해당 세션 로컬에 제목 내용 날짜가 로컬 스토리지에 저장
  noteForm.addEventListener("submit", () => {
    const title = noteForm.title.value;
    const content = noteForm.content.value;
    const date = new Date().toLocaleString();

    //* 객체 하나 변수에 담음 로컬에 저장할 용도로 사용할것
    const note = {
      title,
      content,
      date,
    };

    saveData(note);
    noteForm.reset(); // 기본 값 리셋
    console.log(note);
  });

  // console.log(localStorage)
  // console.dir(localStorage)

  //* 해당 링크를 클릭했을때 현재 페이지에서 로컬 스토리지에서 메모 된걸 가져옴
  viewNotes.addEventListener("click", () => {
    displayNotes();
  });

//* 메모를 저장 할 함수★
//* JSON 문자열의 구문을 분석 해 본후 그 결과를 js 객체로 생성
//* 생성한 변수에 note 객체를 넣어줌
//* localstorage에 액서스 해줌 // js 객체를 JSON 문자열로 반환
  function saveData(note) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

//* 메모를 보기 위한 함수★
//* 빈문서에 ul태그에 동적으로 생성한 li태그를 자식 요소로 넣어주고
//* ul 태그 안에 들어갈 입력 될 데이터 값을 반복해서 저장함 
  function displayNotes() {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notesList.innerHTML = "";
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const li = document.createElement("li");
      li.innerHTML = `${note.date} <strong>${note.title}</strong> ${note.content}`;
      notesList.appendChild(li);
    }
  }
});

