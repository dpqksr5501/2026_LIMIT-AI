import { FormEvent, ReactNode, useEffect, useState } from "react";

type Page = "login" | "signup" | "loading" | "timetable" | "create" | "timer" | "stats" | "settings";
type IconName = "grid" | "clock" | "chart" | "settings" | "logout" | "chevron" | "plus" | "play" | "pause" | "check" | "calendar" | "arrow";

const navItems: { id: Page; label: string; icon: IconName }[] = [
  { id: "timetable", label: "타임 테이블", icon: "grid" },
  { id: "timer", label: "딴짓 타이머", icon: "clock" },
  { id: "stats", label: "통계", icon: "chart" },
  { id: "settings", label: "설정", icon: "settings" },
];

const subjects = [
  { name: "수학", room: "2-3 교실", color: "blue" },
  { name: "영어", room: "어학실", color: "green" },
  { name: "과학", room: "과학실", color: "purple" },
  { name: "국어", room: "2-3 교실", color: "orange" },
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
  return <div className={`logo ${light ? "logo-light" : ""}`}><span className="logo-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M6.5 24.5c4-6.5 6.7-1.2 10-6.2 3.2-4.8 5.1-2.7 9-9.8" /><path className="logo-mark-accent" d="m21.5 7 4.2 1.2-1.1 4.4" /><path d="M7.5 8.2c1.9-1.1 4.7-.8 5.8 1.2 1.2 2.2-.1 4.8-2.3 5.8-2 .9-4.6.3-5.4-1.8-.8-2 .1-4.1 1.9-5.2Z" /></svg></span><span>샛길</span></div>;
}

function BrandWatermark({ mark }: { mark: number }) {
  return <span className="brand-watermark" aria-hidden="true"><img className={`brand-watermark-image mark-${mark}`} src="/brands/campus-marks.png" alt="" /></span>;
}

type DoodleKind = "wander" | "loading" | "class" | "timer" | "insight" | "receipt";

function Doodle({ kind, className = "" }: { kind: DoodleKind; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const drawings: Record<DoodleKind, ReactNode> = {
    wander: <>
      <path className="doodle-path" d="M10 109c31-8 29-39 55-36 23 3 16 28 39 25 19-2 25-25 46-23 19 2 20 18 35 17" />
      <g transform="rotate(-4 82 49)">
        <path className="doodle-paper" d="M52 20c14-3 34-2 48 2l-2 47c-13-4-31-4-44-1Z" />
        <path d="M62 34c7-2 18-1 27 1M62 43c10-2 18-1 25 1" />
        <path d="M69 55c3 3 8 4 12 1" />
        <circle cx="66" cy="51" r="1.4" className="doodle-dot" />
        <circle cx="86" cy="50" r="1.4" className="doodle-dot" />
        <path d="M56 69c-2 8-7 10-11 13M92 69c2 8 7 9 11 12" />
      </g>
      <path className="doodle-accent" d="m125 40 5-8 2 9 9 2-8 4-1 9-5-7-9 3 5-7-6-6Z" />
    </>,
    loading: <>
      <path className="doodle-paper" d="M25 18c13-4 30-3 41 1l-2 43c-12-3-26-3-38 0Z" />
      <circle cx="37" cy="38" r="1.5" className="doodle-dot" />
      <circle cx="54" cy="37" r="1.5" className="doodle-dot" />
      <path d="M37 48c4 3 9 3 13-1M28 62c-3 8-9 9-13 12M61 62c3 7 9 8 14 11" />
      <path className="doodle-accent" d="M17 22c-6 2-9 6-11 12M72 20c6 3 9 7 10 13" />
    </>,
    class: <>
      <path className="doodle-paper" d="M8 14c11-4 23-3 31 2v37c-9-5-20-6-31-2ZM39 16c10-5 21-5 31-1v37c-10-3-21-2-31 2Z" />
      <path d="M39 16v38M16 27c5-1 10 0 15 2M16 35c5-1 10 0 15 2M48 27c5-2 10-2 15-1" />
      <path className="doodle-accent" d="m52 41 3 3 7-8" />
    </>,
    timer: <>
      <path className="doodle-paper" d="M17 27c1-12 11-19 25-18 13 1 22 10 21 24-1 14-10 24-25 23-14-1-22-13-21-29Z" />
      <path d="M40 17v16l10 6M33 4h16M41 4v5" />
      <circle cx="31" cy="41" r="1.4" className="doodle-dot" />
      <circle cx="45" cy="43" r="1.4" className="doodle-dot" />
      <path d="M34 49c3 2 6 2 9 0" />
      <path className="doodle-accent" d="M9 17 4 13M10 8 8 2M69 18l6-4M67 9l3-6" />
    </>,
    insight: <>
      <path className="doodle-paper" d="M13 49 31 32l13 9 18-25" />
      <path d="m53 16 9 0 1 10M13 58h50" />
      <circle cx="31" cy="32" r="3" className="doodle-accent-fill" />
      <circle cx="13" cy="49" r="3" className="doodle-accent-fill" />
      <path d="M18 14c6-4 13-5 20-3" />
    </>,
    receipt: <>
      <path className="doodle-paper" d="M18 8c13 3 27-2 42 1l-2 61-7-5-6 5-7-5-7 5-6-6-8 4Z" />
      <path d="M27 24h23M27 34h17M27 47h8M43 47h8M27 56h24" />
      <path className="doodle-accent" d="M62 18c5-3 9-7 11-12M66 25l9-2" />
    </>,
  };
  return <svg className={`doodle doodle-${kind} ${className}`} viewBox={kind === "wander" ? "0 0 200 120" : "0 0 80 80"} role="img" aria-label={kind === "loading" ? "샛길 캐릭터가 걸어가는 중" : undefined} aria-hidden={kind !== "loading" || undefined} {...common}>{drawings[kind]}</svg>;
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
        <Logo light />
        <div className="auth-copy">
          <span className="eyebrow">집중을 기록하는 가장 쉬운 방법</span>
          <h1>오늘의 샛길이<br />내일의 집중이 되도록.</h1>
          <p>수업 중 잠깐 새어버린 시간을 솔직하게 기록하고,<br />나만의 집중 패턴을 발견해보세요.</p>
          <div className="auth-doodle"><Doodle kind="wander" /><span>돌아오는 길도 기록 중</span></div>
        </div>
        <div className="auth-quote">
          <span>“</span>
          <p>기록하는 순간, 변화는 이미 시작됩니다.</p>
        </div>
      </section>
      <section className="auth-form-wrap">
        <div className="auth-form">
          <div className="mobile-logo"><Logo /></div>
          <span className="form-kicker">{signup ? "새로운 시작" : "다시 만나서 반가워요"}</span>
          <h2>{signup ? "회원가입" : "로그인"}</h2>
          <p>{signup ? "샛길과 함께 나의 집중 습관을 만들어보세요." : "오늘도 나의 집중을 가볍게 기록해볼까요?"}</p>
          <form onSubmit={submit}>
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

function LoadingPage() {
  return (
    <main className="loading-page">
      <BrandWatermark mark={3} />
      <div className="loading-content">
        <Logo light />
        <div className="loading-mark"><Doodle kind="loading" /></div>
        <div>
          <h1>집중할 준비를 하고 있어요</h1>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
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
        <div className="profile"><div className="avatar">김</div><div><strong>김집중</strong><span>고등학생</span></div><Icon name="chevron" size={16} /></div>
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
  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  const days = ["월요일", "화요일", "수요일", "목요일", "금요일"];
  const [schedule, setSchedule] = useState([["수학", "", "영어", "", "과학"], ["", "국어", "", "수학", ""], ["과학", "", "수학", "", "영어"], ["점심시간", "점심시간", "점심시간", "점심시간", "점심시간"], ["", "영어", "", "국어", ""], ["국어", "", "과학", "", "수학"], ["", "", "동아리", "동아리", ""]]);
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
    <Header eyebrow="MY WEEK" title="이번 주 시간표" description="과목을 선택하면 수업 정보를 확인하고 수정할 수 있어요." action={<Button variant="secondary" onClick={onCreate}><Icon name="plus" size={17} /> 새 시간표</Button>} />
    <section className="today-card"><div><span className="today-dot" /><div><small>지금 수업 중</small><strong>수학 · 2교시</strong><p>10:00 — 10:50 · 2-3 교실</p></div></div><Doodle kind="class" className="today-doodle" /></section>
    <section className="schedule-card">
      <div className="week-control"><button>‹</button><strong>2025년 3월 2주</strong><button>›</button><span>오늘</span></div>
      <div className="timetable">
        <div className="table-head"><span>시간</span>{["월 10", "화 11", "수 12", "목 13", "금 14"].map((day, index) => <strong key={day} className={index === 2 ? "is-today" : ""}>{day}</strong>)}</div>
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
  const [running, setRunning] = useState(true);
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (!running) return; const id = window.setInterval(() => setSeconds(s => s + 1), 1000); return () => window.clearInterval(id); }, [running]);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="timer-only-page">
      <section className="timer-card timer-only-card">
        <div className="timer-doodle-wrap"><Doodle kind="timer" /><span>잠깐 샛길 산책 중</span></div>
        <div className={`timer-ring ${running ? "running" : ""}`}><div><span>{running ? "딴짓하는 중" : saved ? "기록 완료" : "준비되면 시작하세요"}</span><strong>{time}</strong><small>오늘 누적 12분 34초</small></div></div>
        {seconds > 0 && <button className="finish-button" onClick={() => { setRunning(false); setSaved(true); }}>기록하고 수업으로 돌아가기 <Icon name="check" size={18} /></button>}
      </section>
    </div>
  );
}

function Stats() {
  const bars = [32, 48, 25, 66, 42, 20, 36];
  const wastedMinutes = 102;
  const semesterTuition = 4_200_000;
  const semesterClassMinutes = 16 * 5 * 6 * 50;
  const wastedTuition = Math.round(semesterTuition * (wastedMinutes / semesterClassMinutes) / 10) * 10;
  const comparisons = [
    { item: "치킨", amount: (wastedTuition / 20_000).toFixed(1), unit: "마리", note: "닭다리 하나는 간신히 지켰어요" },
    { item: "말랑이", amount: Math.floor(wastedTuition / 2_500), unit: "개", note: "책상 한쪽이 폭신해질 뻔했어요" },
    { item: "붕어빵", amount: Math.floor(wastedTuition / 1_000), unit: "개", note: "팥·슈크림 반반도 충분해요" },
  ];
  return <>
    <Header eyebrow="MY INSIGHT" title="집중 리포트" description="기록을 통해 발견한 이번 주 나의 집중 패턴이에요." action={<Button variant="secondary"><Icon name="calendar" size={17} /> 이번 주</Button>} />
    <div className="metric-grid">
      <div className="metric"><span>이번 주 딴짓 시간</span><strong>1<span>시간</span> 42<span>분</span></strong><small className="good">지난주보다 18분 줄었어요</small></div>
      <div className="metric"><span>평균 집중률</span><strong>84<span>%</span></strong><small className="good">지난주보다 6% 올랐어요</small></div>
      <div className="metric"><span>가장 집중한 과목</span><strong className="subject-name">과학</strong><small>집중률 93%</small></div>
    </div>
    <section className="tuition-card">
      <div className="tuition-summary">
        <Doodle kind="receipt" />
        <div>
          <span>이번 주 샛길 영수증</span>
          <strong>{wastedTuition.toLocaleString("ko-KR")}<small>원</small></strong>
          <p>1시간 42분 동안 등록금이 조용히 산책을 다녀왔어요.</p>
        </div>
      </div>
      <div className="tuition-exchange">
        <span className="exchange-title">그 돈이면 살 수 있었던 것</span>
        <div>
          {comparisons.map(comparison => <article key={comparison.item}>
            <span>{comparison.item}</span>
            <strong>{comparison.amount}<small>{comparison.unit}</small></strong>
            <p>{comparison.note}</p>
          </article>)}
        </div>
      </div>
      <small className="tuition-basis">학기 등록금 420만 원 · 16주 · 주 30교시 기준의 재미용 환산이에요.</small>
    </section>
    <div className="stats-grid">
      <section className="chart-card"><div className="card-title"><div><span>일별 딴짓 시간</span><small>단위: 분</small></div><b>주간 평균 14분</b></div><div className="bar-chart">{bars.map((h, i) => <div key={i}><span>{h}</span><i style={{ height: `${h * 2}px` }} className={i === 3 ? "peak" : ""} /><small>{["월", "화", "수", "목", "금", "토", "일"][i]}</small></div>)}</div></section>
      <section className="chart-card reasons"><div className="card-title"><div><span>딴짓 이유</span><small>이번 주 기준</small></div></div><div className="donut"><div><strong>1시간 42분</strong><span>총 딴짓 시간</span></div></div><ul><li><i className="phone" />휴대폰 <b>42%</b></li><li><i className="blank" />멍때리기 <b>28%</b></li><li><i className="talk" />잡담 <b>18%</b></li><li><i className="etc" />기타 <b>12%</b></li></ul></section>
    </div>
    <section className="insight-card"><Doodle kind="insight" /><span>이번 주 발견</span><p><b>목요일 4교시</b>에 딴짓 시간이 가장 길었어요. 점심시간 직후에는 가벼운 스트레칭으로 집중력을 깨워보세요.</p></section>
  </>;
}

function Toggle({ active = true }: { active?: boolean }) {
  const [on, setOn] = useState(active);
  return <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(v => !v)} aria-label="설정 전환"><span /></button>;
}

function Settings() {
  return <>
    <Header eyebrow="PREFERENCES" title="설정" description="샛길을 나에게 꼭 맞게 설정해보세요." />
    <div className="settings-layout">
      <section className="settings-card"><h2>프로필</h2><div className="profile-edit"><div className="avatar large">김</div><div><strong>김집중</strong><span>jipjoong@example.com</span><button>프로필 사진 변경</button></div></div><div className="field-row"><label>이름<input defaultValue="김집중" /></label><label>학교 / 학년<input defaultValue="샛길고등학교 · 2학년" /></label></div><Button>변경사항 저장</Button></section>
      <section className="settings-card"><h2>알림 설정</h2><div className="setting-row"><div><strong>수업 시작 알림</strong><span>수업 시작 5분 전에 알려드려요.</span></div><Toggle /></div><div className="setting-row"><div><strong>주간 리포트</strong><span>매주 월요일, 지난 주 집중 기록을 보내드려요.</span></div><Toggle /></div><div className="setting-row"><div><strong>집중 응원 알림</strong><span>기록을 잊지 않도록 가끔 응원을 보내드려요.</span></div><Toggle active={false} /></div></section>
      <section className="settings-card"><h2>계정</h2><div className="setting-row action"><div><strong>비밀번호 변경</strong><span>안전한 계정 관리를 위해 주기적으로 변경해주세요.</span></div><button><Icon name="chevron" /></button></div><div className="setting-row action danger"><div><strong>회원 탈퇴</strong><span>모든 기록과 계정 정보가 영구적으로 삭제됩니다.</span></div><button><Icon name="chevron" /></button></div></section>
    </div>
  </>;
}

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const navigate = (target: Page) => {
    if (target === "login" || target === "signup") {
      setPage(target);
      return;
    }
    setPage("loading");
    window.setTimeout(() => setPage(target), 850);
  };
  if (page === "loading") return <LoadingPage />;
  if (page === "login") return <AuthLayout onNavigate={() => setPage("signup")} onComplete={() => navigate("timetable")} />;
  if (page === "signup") return <AuthLayout signup onNavigate={() => setPage("login")} onComplete={() => navigate("timetable")} />;
  return <AppShell page={page} setPage={navigate} logout={() => setPage("login")}>
    {page === "timetable" && <Timetable onCreate={() => navigate("create")} />}
    {page === "create" && <CreateTimetable onBack={() => navigate("timetable")} />}
    {page === "timer" && <TimerPage />}
    {page === "stats" && <Stats />}
    {page === "settings" && <Settings />}
  </AppShell>;
}
