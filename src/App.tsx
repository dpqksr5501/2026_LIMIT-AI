import { FormEvent, ReactNode, useEffect, useState } from "react";

type Page = "login" | "signup" | "timetable" | "create" | "timer" | "stats" | "settings";
type IconName = "grid" | "clock" | "chart" | "settings" | "logout" | "chevron" | "plus" | "play" | "pause" | "check" | "calendar" | "arrow";

const navItems: { id: Page; label: string; icon: IconName }[] = [
  { id: "timetable", label: "타임 테이블", icon: "grid" },
  { id: "timer", label: "딴짓 타이머", icon: "clock" },
  { id: "stats", label: "통계", icon: "chart" },
  { id: "settings", label: "설정", icon: "settings" },
];

const subjects = [
  { name: "자료구조", room: "전205", color: "purple" },
  { name: "설탕과소금: 사소한것들의역사", room: "멀204", color: "green" },
  { name: "게임프로그래밍입문(컴퓨터공학과)", room: "B07", color: "blue" },
  { name: "게임엔진기초(컴퓨터공학과)", room: "B06", color: "orange" },
  { name: "컴퓨터구조(전자공학)", room: "전B09", color: "blue" },
  { name: "풀스택서비스네트워킹(컴퓨터공학과)", room: "B09", color: "orange" },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    chart: <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V21h-4v-.08a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3v-4h.08a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3h4v.08a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.2.61.8 1 1.45 1H21v4h-.08c-.65 0-1.23.4-1.52 1Z" /></>,
    logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    play: <path d="m8 5 11 7-11 7Z" />,
    pause: <><path d="M9 5v14" /><path d="M15 5v14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`logo ${light ? "logo-light" : ""}`}><span>엄마 미안해</span> </div>;
}

function BrandWatermark({ mark }: { mark: number }) {
  return <span className="brand-watermark" aria-hidden="true"><img className={`brand-watermark-image mark-${mark}`} src="/brands/campus-marks.png" alt="" /></span>;
}

function Button({ children, variant = "primary", onClick, type = "button", className = "" }: { children: ReactNode; variant?: "primary" | "secondary" | "danger"; onClick?: () => void; type?: "button" | "submit"; className?: string }) {
  return <button type={type} className={`button button-${variant} ${className}`} onClick={onClick}>{children}</button>;
}

function AuthLayout({ signup, onNavigate, onComplete }: { signup?: boolean; onNavigate: () => void; onComplete: () => void }) {
  const submit = (e: FormEvent) => { e.preventDefault(); onComplete(); };
  return (
    <main className="auth-page">
      <BrandWatermark mark={signup ? 2 : 1} />
      <section className="auth-aside">
        <div className="auth-top-title"><Logo /><strong>{signup ? "회원가입" : "로그인"}</strong></div>
        <div className="auth-copy">
          <span className="eyebrow">딴짓도 했으면 기록은 해야지</span>
          <h1>교수님 몰래,<br />딴짓은 정직하게.</h1>
          <p>이미 날아간 집중력은 못 잡습니다.<br />대신 몇 분 날렸는지는 잡아드립니다.</p>
        </div>
        <div className="auth-quote">
          <span>“</span>
          <p>공부 빼고 다 재밌는 당신을 위한 앱.</p>
        </div>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      </section>
      <section className="auth-form-wrap">
        <div className="auth-form">
          <div className="mobile-logo"><Logo /></div>
          <span className="form-kicker">{signup ? "도망갈 계정부터 생성" : "또 오셨군요, 휴먼"}</span>
          <h2>{signup ? "회원가입" : "로그인"}</h2>
          <p>{signup ? "가입한다고 집중력이 생기진 않지만 일단 해봅시다." : "오늘도 딴짓할 준비가 아주 잘 되어 있습니다."}</p>
          <form onSubmit={submit} noValidate>
            {signup && <label>이름<input required placeholder="이름을 입력해주세요" /></label>}
            {signup && <label>등록금<input type="number" min="0" required placeholder="학기 등록금을 입력해주세요" /></label>}
            <label>이메일<input type="email" required placeholder="name@example.com" /></label>
            <label>비밀번호<input type="password" required placeholder={signup ? "8자 이상 입력해주세요" : "비밀번호를 입력해주세요"} /></label>
            {signup && <label>비밀번호 확인<input type="password" required placeholder="비밀번호를 다시 입력해주세요" /></label>}
            {!signup && <div className="form-options"><label className="check-label"><input type="checkbox" /> 로그인 유지</label><button type="button" className="text-button">비밀번호 찾기</button></div>}
            {signup && <label className="check-label agree"><input type="checkbox" required /> <span><b>이용약관</b> 및 <b>개인정보 처리방침</b>에 동의합니다.</span></label>}
            <Button type="submit" className="full">{signup ? "가입하고 시작하기" : "로그인"}</Button>
          </form>
          <div className="auth-switch">{signup ? "이미 계정이 있나요?" : "아직 계정이 없나요?"}<button onClick={onNavigate}>{signup ? "로그인" : "회원가입"}</button></div>
          {!signup && <button className="demo-button" onClick={onComplete}>계정 없이 둘러보기 <Icon name="arrow" size={16} /></button>}
        </div>
      </section>
    </main>
  );
}

function Sidebar({ page, setPage, logout }: { page: Page; setPage: (page: Page) => void; logout: () => void }) {
  return (
    <aside className="sidebar">
      <Logo />
      <nav>
        <span className="nav-caption">MENU</span>
        {navItems.map(item => <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => setPage(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{page === item.id && <i />}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="profile"><div className="avatar">전</div><div><strong>전집중</strong><span>대학생</span></div><Icon name="chevron" size={16} /></div>
        <button className="logout" onClick={logout}><Icon name="logout" size={18} /> 로그아웃</button>
      </div>
    </aside>
  );
}

function AppShell({ page, setPage, children, logout }: { page: Page; setPage: (page: Page) => void; children: ReactNode; logout: () => void }) {
  const marks: Partial<Record<Page, number>> = { timetable: 1, create: 2, timer: 3, stats: 4, settings: 1 };
  return <div className="app-shell"><BrandWatermark mark={marks[page] || 1} /><Sidebar page={page} setPage={setPage} logout={logout} /><div className="mobile-nav">{navItems.map(item => <button key={item.id} className={page === item.id ? "active" : ""} onClick={() => setPage(item.id)}><Icon name={item.icon} /><span>{item.label.replace("타임 테이블", "시간표").replace("딴짓 타이머", "타이머")}</span></button>)}</div><main className="content">{children}</main></div>;
}

function Header({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <header className="page-header"><div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</header>;
}

function Timetable({ onCreate }: { onCreate: () => void }) {
  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const days = ["월요일", "화요일", "수요일", "목요일", "금요일"];
  const [schedule, setSchedule] = useState([
    ["", "", "", "", ""],
    ["자료구조", "설탕과소금: 사소한것들의역사", "자료구조", "설탕과소금: 사소한것들의역사", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "게임프로그래밍입문(컴퓨터공학과)", "", "게임프로그래밍입문(컴퓨터공학과)", ""],
    ["게임엔진기초(컴퓨터공학과)", "", "게임엔진기초(컴퓨터공학과)", "", ""],
    ["", "컴퓨터구조(전자공학)", "", "컴퓨터구조(전자공학)", ""],
    ["", "", "", "", ""],
    ["", "", "", "풀스택서비스네트워킹(컴퓨터공학과)", ""],
    ["", "", "", "", ""],
  ]);
  const [subjectMeta, setSubjectMeta] = useState<Record<string, { room: string; cancelled: boolean }>>({});
  const [selected, setSelected] = useState<{ row: number; col: number; name: string; room: string; cancelled: boolean } | null>(null);
  const openSubject = (row: number, col: number, name: string) => {
    if (!name || name === "점심시간") return;
    const meta = subjectMeta[`${row}-${col}`];
    setSelected({ row, col, name, room: meta?.room || subjects.find(subject => subject.name === name)?.room || "특별실", cancelled: meta?.cancelled || false });
  };
  const saveSubject = () => {
    if (!selected?.name.trim()) return;
    setSchedule(current => current.map((row, rowIndex) => row.map((name, colIndex) => rowIndex === selected.row && colIndex === selected.col ? selected.name.trim() : name)));
    setSubjectMeta(current => ({ ...current, [`${selected.row}-${selected.col}`]: { room: selected.room.trim() || "미정", cancelled: selected.cancelled } }));
    setSelected(null);
  };
  return <>
    <Header eyebrow="2026년 2학기" title="PlanA" description="" action={<Button variant="secondary" onClick={onCreate}><Icon name="plus" size={17} /> 시간표 또 만들기</Button>} />
    <section className="schedule-card">
      <div className="week-control"><strong>2026년 2학기</strong><span>PlanA</span></div>
      <div className="timetable">
        <div className="table-head"><span>시간</span>{["월", "화", "수", "목", "금"].map(day => <strong key={day}>{day}</strong>)}</div>
        {times.map((time, row) => <div className="table-row" key={time}><span>{time}</span>{schedule[row].map((subject, col) => {
          const meta = subjectMeta[`${row}-${col}`];
          return <button key={col} onClick={() => openSubject(row, col, subject)} className={subject ? (subject === "점심시간" ? "lunch" : `subject ${subjects.find(item => item.name === subject)?.color || "blue"} ${meta?.cancelled ? "cancelled" : ""}`) : ""}>{subject && <><strong>{subject}{meta?.cancelled && <em>휴강</em>}</strong>{subject !== "점심시간" && <small>{meta?.room || subjects.find(item => item.name === subject)?.room || "특별실"}</small>}</>}</button>;
        })}</div>)}
      </div>
    </section>
    {selected && <div className="subject-modal" role="presentation" onMouseDown={() => setSelected(null)}>
      <section className="subject-panel" role="dialog" aria-modal="true" aria-labelledby="subject-detail-title" onMouseDown={event => event.stopPropagation()}>
        <div className="subject-panel-head"><div><span>SUBJECT DETAILS</span><h2 id="subject-detail-title">과목 세부정보</h2></div><button aria-label="닫기" onClick={() => setSelected(null)}>×</button></div>
        <div className="subject-summary"><span className="subject-dot blue" /><div><strong>{selected.name}</strong><p>{days[selected.col]} · {times[selected.row]} 시작</p></div></div>
        <div className="subject-fields">
          <label>과목명<input value={selected.name} onChange={event => setSelected({ ...selected, name: event.target.value })} /></label>
          <label>교실<input value={selected.room} onChange={event => setSelected({ ...selected, room: event.target.value })} /></label>
        </div>
        <div className="cancel-setting"><div><strong>휴강 여부</strong><span>휴강으로 표시하면 시간표에 상태가 표시돼요.</span></div><button className={`toggle ${selected.cancelled ? "on" : ""}`} onClick={() => setSelected({ ...selected, cancelled: !selected.cancelled })} aria-label="휴강 여부 전환"><span /></button></div>
        {selected.cancelled && <div className="cancel-notice">이 수업은 휴강으로 표시됩니다.</div>}
        <div className="subject-panel-actions"><Button variant="secondary" onClick={() => setSelected(null)}>취소</Button><Button onClick={saveSubject}>변경사항 저장</Button></div>
      </section>
    </div>}
  </>;
}

function CreateTimetable({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState("Plan B");
  const [semester, setSemester] = useState("2026년 2학기");
  const [courses, setCourses] = useState([{ name: "미디어의 이해", day: "월요일", time: "10:00", room: "본관 301" }]);
  const [draft, setDraft] = useState({ name: "", day: "월요일", time: "09:00", room: "" });
  const addCourse = () => {
    if (!draft.name.trim()) return;
    setCourses(current => [...current, { ...draft, name: draft.name.trim(), room: draft.room.trim() || "미정" }]);
    setDraft({ name: "", day: "월요일", time: "09:00", room: "" });
  };
  return <>
    <header className="create-header"><button onClick={onBack}>‹</button><div><span>NEW TIMETABLE</span><h1>새 시간표 만들기</h1><p>학기와 수업을 입력해 나만의 시간표를 완성하세요.</p></div></header>
    <div className="creator-layout">
      <section className="creator-card">
        <h2>기본 정보</h2>
        <div className="creator-fields"><label>시간표 이름<input value={title} onChange={event => setTitle(event.target.value)} /></label><label>학기<select value={semester} onChange={event => setSemester(event.target.value)}><option>2026년 2학기</option><option>2026년 1학기</option><option>2025년 2학기</option></select></label></div>
        <div className="creator-divider" />
        <h2>수업 추가</h2>
        <div className="creator-fields"><label className="wide">과목명<input placeholder="과목명을 입력하세요" value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label><label>요일<select value={draft.day} onChange={event => setDraft({ ...draft, day: event.target.value })}>{["월요일", "화요일", "수요일", "목요일", "금요일"].map(day => <option key={day}>{day}</option>)}</select></label><label>시작 시간<input type="time" value={draft.time} onChange={event => setDraft({ ...draft, time: event.target.value })} /></label><label className="wide">강의실<input placeholder="예: 본관 301" value={draft.room} onChange={event => setDraft({ ...draft, room: event.target.value })} /></label></div>
        <Button onClick={addCourse} variant="secondary"><Icon name="plus" size={17} /> 목록에 수업 추가</Button>
      </section>
      <aside className="creator-preview">
        <div><span>미리보기</span><strong>{title || "제목 없는 시간표"}</strong><small>{semester} · {courses.length}개 수업</small></div>
        <ul>{courses.map((course, index) => <li key={`${course.name}-${index}`}><i className={`tone-${index % 5}`} /><div><strong>{course.name}</strong><span>{course.day} {course.time} · {course.room}</span></div><button onClick={() => setCourses(current => current.filter((_, courseIndex) => courseIndex !== index))}>×</button></li>)}</ul>
        <Button className="full" onClick={onBack}><Icon name="check" size={17} /> 시간표 생성 완료</Button>
      </aside>
    </div>
  </>;
}

function TimerPage() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setSeconds(s => s + 1), 1000); return () => window.clearInterval(id); }, []);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="timer-only-page timer-large-type">
      <section className="timer-card timer-only-card">
        <div className="timer-display">
          <span>딴짓하는 중</span>
          <strong>{time}</strong>
          <small>오늘 누적 12분 34초</small>
        </div>
      </section>
    </div>
  );
}

function Stats() {
  const bars = [32, 48, 25, 66, 42, 20, 36];
  const foodConversions = [
    { name: "라면", amount: "약 9.7봉", basis: "봉당 1,200원 기준", image: "/foods/ramen.gif" },
    { name: "치킨", amount: "약 0.5마리", basis: "마리당 23,000원 기준", image: "/foods/chicken.gif" },
    { name: "김", amount: "약 23.2봉", basis: "봉당 500원 기준", image: "/foods/gim.gif" },
    { name: "짜장면", amount: "약 1.7그릇", basis: "그릇당 7,000원 기준", image: "/foods/jjajang.gif" },
  ];
  return <>
    <Header eyebrow="숫자는 거짓말 안 함" title="딴짓 성적표" description="당신이 외면한 시간을 굳이 그래프로 만들었습니다."/>
    <div className="metric-grid">
      <div className="metric"><span>이번 주 딴짓 시간</span><strong>1<span>시간</span> 42<span>분</span></strong><small className="good">지난주보다 18분 줄었어요</small></div>
      <div className="metric"><span>평균 집중률</span><strong>84<span>%</span></strong><small className="good">지난주보다 6% 올랐어요</small></div>
      <div className="metric"><span>가장 집중한 과목</span><strong className="subject-name">게임엔진기초</strong><small>집중률 93%</small></div>
    </div>
    <div className="stats-grid">
      <section className="chart-card"><div className="card-title"><div><span>일별 딴짓 시간</span><small>단위: 분</small></div><b>주간 평균 14분</b></div><div className="bar-chart">{bars.map((h, i) => <div key={i}><span>{h}</span><i style={{ height: `${h * 2}px` }} className={i === 3 ? "peak" : ""} /><small>{["월", "화", "수", "목", "금", "토", "일"][i]}</small></div>)}</div></section>
    </div>
    <section className="insight-card"><span>팩트 폭격</span><p><b>목요일 4교시</b>에 영혼이 가장 멀리 떠났습니다. 점심 먹고 바로 앉지 말고 복도라도 한 바퀴 도세요.</p></section>
    <section className="cost-section">
      <div className="cost-heading">
        <span>딴짓 비용 환산소</span>
        <div><strong>이번 주에 날린 등록금</strong><small>먹을 것으로 바꾸면 이만큼입니다. 맛있겠네요.</small></div>
      </div>
      <div className="cost-grid">
        {foodConversions.map(item => (
          <article className="cost-card" key={item.name}>
            <img src={item.image} alt={`${item.name} 환산 이미지`} />
            <div><span>{item.name}</span><strong>{item.amount}</strong><small>{item.basis}</small></div>
          </article>
        ))}
      </div>
    </section>
  </>;
}

function Toggle({ active = true }: { active?: boolean }) {
  const [on, setOn] = useState(active);
  return <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(v => !v)} aria-label="설정 전환"><span /></button>;
}

function Settings() {
  return <>
    <Header eyebrow="건드리면 바뀜" title="설정실" description="마음에 안 드는 걸 눌러보세요. 책임은 버튼이 집니다." />
    <div className="settings-layout">
      <section className="settings-card"><h2>프로필</h2><div className="profile-edit"><div className="avatar large">전</div><div><strong>전집중</strong><span>jipjoong@example.com</span><button>프로필 사진 변경</button></div></div><div className="field-row"><label>이름<input defaultValue="전집중" /></label><label>학교 / 학년<input defaultValue="경희대학교 · 2학년" /></label></div><Button>변경사항 저장</Button></section>
      <section className="settings-card"><h2>알림 설정</h2><div className="setting-row"><div><strong>수업 시작 알림</strong><span>수업 시작 5분 전에 알려드려요.</span></div><Toggle /></div><div className="setting-row"><div><strong>주간 리포트</strong><span>매주 월요일, 지난 주 집중 기록을 보내드려요.</span></div><Toggle /></div><div className="setting-row"><div><strong>집중 응원 알림</strong><span>기록을 잊지 않도록 가끔 응원을 보내드려요.</span></div><Toggle active={false} /></div></section>
      <section className="settings-card"><h2>계정</h2><div className="setting-row action"><div><strong>비밀번호 변경</strong><span>안전한 계정 관리를 위해 주기적으로 변경해주세요.</span></div><button><Icon name="chevron" /></button></div><div className="setting-row action danger"><div><strong>회원 탈퇴</strong><span>모든 기록과 계정 정보가 영구적으로 삭제됩니다.</span></div><button><Icon name="chevron" /></button></div></section>
    </div>
  </>;
}

export default function App() {
  const [page, setPage] = useState<Page>("login");
  if (page === "login") return <AuthLayout onNavigate={() => setPage("signup")} onComplete={() => setPage("timetable")} />;
  if (page === "signup") return <AuthLayout signup onNavigate={() => setPage("login")} onComplete={() => setPage("timetable")} />;
  return <AppShell page={page} setPage={setPage} logout={() => setPage("login")}>
    {page === "timetable" && <Timetable onCreate={() => setPage("create")} />}
    {page === "create" && <CreateTimetable onBack={() => setPage("timetable")} />}
    {page === "timer" && <TimerPage />}
    {page === "stats" && <Stats />}
    {page === "settings" && <Settings />}
  </AppShell>;
}
