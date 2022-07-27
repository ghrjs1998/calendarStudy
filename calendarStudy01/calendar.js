// 달력 실행 함수
// 문서가 준비되면 매개변수로 넣은 콜백 함수를 실행하라는 의미
$(document).ready(function() {
    calendarInit();
});

/*{
var date = new Date();

// utc 표준시 도출
// 현재 로케일에 대한 시간대 오프셋(utc)을 분 단위로 반환
var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);

// 한국 kst 기준시간 더하기
var kstGap = 9 * 60 * 60 * 1000;
}*/

function calendarInit(){
// 날짜 정보 가져오기
// 오늘 날짜 시간 포함
var today = new Date();

// date 객체 만들기(오늘)
// 오늘 날짜 시간 포함 x
var thisMonth = new Date(today.getFullYear(),today.getMonth(),today.getDate());

/*{
// 달력에서 표기하는 년도
var currentYear = thisMonth.getFullYear();

// 달력에서 표기하는 월
var currentMonth = thisMonth.getMonth();

// 달력에서 표기하는 일
var currentDate = thisMonth.getDate();
}*/

// 캘린더 렌더링
renderCalendar(thisMonth);

function renderCalendar(thisMonth){
    // 렌더링을 위한 데이터 정리
    // 달력에서 표기하는 년도
    currentYear = thisMonth.getFullYear();

    // 달력에서 표기하는 월
    currentMonth = thisMonth.getMonth();

    // 달력에서 표기하는 일
    currentDate = thisMonth.getDate();

    // 이전 달의 마지막 날 날짜와 요일 구하기
    // 이전 달 마지막날짜와 요일
    var startDay = new Date(currentYear, currentMonth, 0);
    // 이전달 마지막 날짜
    var prevDate = startDay.getDate();
    // 이전달 남은 요일
    var prevDay = startDay.getDay();

    // 이번 달 마지막날 날짜와 요일 구하기
    // 이번 달 마지막 날짜와 요일
    // month에 +1해주는 이유 -> 0부터 시작하기 때문(0~11)
    var endDay = new Date(currentYear, currentMonth + 1, 0);
    // 이번달 마지막 날짜
    var nextDate = endDay.getDate();
    // 이번달 첫번쨰 요일
    var nextDay = endDay.getDay();

    // 현재 월 표기
    // 화면에 뿌려줌
    $(".year-month").text(currentYear + '-' + (currentMonth + 1));

    // 렌더링 html 요소 생성
    calendar = document.querySelector('.dates')
    calendar.innerHTML = "";

    // 지난달
    // 이번달 달력이 뿌려진 화면에서 전달 날짜 숨김처리
    for( var i = prevDate - prevDay + 1; i <= prevDate; i++){
        calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '<div>'
    }
    // 이번달
    for (var i = 1; i <= nextDate; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
    }
    // 다음달
    // 이번달 달력이 뿌려진 화면에서 다음달 날짜 숨김처리
    for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
    }
    // 오늘 날짜 표기
    if (today.getMonth() == currentMonth) {
        todayDate = today.getDate();
        var currentMonthDate = document.querySelectorAll('.dates .current');
        currentMonthDate[todayDate -1].classList.add('today');
        }   
    }
    // 이전달로 이동
    // 이전달 버튼을 누르면 함수 실행
    $('.go-prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalendar(thisMonth);
    });

    // 다음달로 이동
    // 다음달 버튼을 누르면 함수 실행
    $('.go-next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalendar(thisMonth); 
    });
}