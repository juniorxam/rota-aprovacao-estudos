/**
 * Direção visual: Margem de Caderno — índice editorial de disciplinas, régua coral
 * de percurso e páginas de estudo assimétricas que priorizam aula, exercício e revisão.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  Flag,
  GraduationCap,
  LayoutDashboard,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { allQuestions, allTopics, sourceNote, subjects } from "@/data/curriculum";

type AnswerMap = Record<string, number>;

const storageKeys = { topic: "rota-portugues-current-topic", subject: "rota-edital-current-subject", completed: "rota-portugues-completed-topics", answers: "rota-portugues-answers" };

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const value = window.localStorage.getItem(key); return value ? (JSON.parse(value) as T) : fallback; } catch { return fallback; }
}

function StudyEvidence({ value, label, detail, tone = "coral" }: { value: number; label: string; detail: string; tone?: "coral" | "blue" | "sage" }) {
  return <div className={`evidence-sheet evidence-${tone}`}><div className="evidence-route" aria-hidden="true"><span className="evidence-route-track" /><span className="evidence-route-mark" style={{ top: `${Math.max(8, Math.min(value, 92))}%` }} /></div><div><p className="eyebrow"><em>registro</em> {label}</p><strong className="evidence-value">{value}%</strong><p className="metric-detail">{detail}</p></div></div>;
}

export default function Home() {
  const [activeSubjectId, setActiveSubjectId] = useState("portugues");
  const [activeTopicId, setActiveTopicId] = useState("interpretacao");
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTopic = loadFromStorage(storageKeys.topic, "interpretacao");
    const savedSubject = loadFromStorage(storageKeys.subject, "portugues");
    setActiveSubjectId(subjects.some((subject) => subject.id === savedSubject) ? savedSubject : (allTopics.find((topic) => topic.id === savedTopic)?.subjectId ?? "portugues"));
    setActiveTopicId(allTopics.some((topic) => topic.id === savedTopic) ? savedTopic : "interpretacao");
    setCompletedTopicIds(loadFromStorage<string[]>(storageKeys.completed, []));
    setAnswers(loadFromStorage<AnswerMap>(storageKeys.answers, {}));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) window.localStorage.setItem(storageKeys.subject, JSON.stringify(activeSubjectId)); }, [activeSubjectId, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem(storageKeys.topic, JSON.stringify(activeTopicId)); }, [activeTopicId, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem(storageKeys.completed, JSON.stringify(completedTopicIds)); }, [completedTopicIds, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem(storageKeys.answers, JSON.stringify(answers)); }, [answers, ready]);

  const activeSubject = subjects.find((subject) => subject.id === activeSubjectId) ?? subjects[0];
  const activeSubjectTopics = activeSubject.topics;
  const activeTopic = allTopics.find((topic) => topic.id === activeTopicId) ?? { ...activeSubject.topics[0], subjectId: activeSubject.id };
  const activeIndex = activeSubjectTopics.findIndex((topic) => topic.id === activeTopic.id);
  const activeQuestion = allQuestions.find((question) => question.topicId === activeTopic.id) ?? allQuestions[0];
  const completedPercent = Math.round((completedTopicIds.length / allTopics.length) * 100);
  const subjectCompleted = activeSubjectTopics.filter((topic) => completedTopicIds.includes(topic.id)).length;
  const subjectPercent = Math.round((subjectCompleted / activeSubjectTopics.length) * 100);
  const subjectQuestions = allQuestions.filter((question) => activeSubjectTopics.some((topic) => topic.id === question.topicId));
  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(() => allQuestions.reduce((total, question) => total + (answers[question.id] === question.correctIndex ? 1 : 0), 0), [answers]);
  const subjectAnswered = subjectQuestions.filter((question) => typeof answers[question.id] === "number").length;
  const subjectCorrect = subjectQuestions.filter((question) => answers[question.id] === question.correctIndex).length;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const subjectAccuracy = subjectAnswered ? Math.round((subjectCorrect / subjectAnswered) * 100) : 0;
  const nextTopic = activeSubjectTopics[activeIndex + 1];
  const questionAnswer = answers[activeQuestion.id];
  const hasAnswered = typeof questionAnswer === "number";
  const isCurrentComplete = completedTopicIds.includes(activeTopic.id);

  function chooseTopic(id: string) { setActiveTopicId(id); window.setTimeout(() => document.getElementById("aula-atual")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30); }
  function chooseSubject(id: string) { const subject = subjects.find((entry) => entry.id === id) ?? subjects[0]; setActiveSubjectId(subject.id); chooseTopic(subject.topics.find((topic) => !completedTopicIds.includes(topic.id))?.id ?? subject.topics[0].id); }
  function markCurrentComplete() { setCompletedTopicIds((current) => (current.includes(activeTopic.id) ? current : [...current, activeTopic.id])); }
  function answerQuestion(questionId: string, choiceIndex: number) { setAnswers((current) => ({ ...current, [questionId]: choiceIndex })); }
  function resetQuestion(questionId: string) { setAnswers((current) => { const copy = { ...current }; delete copy[questionId]; return copy; }); }
  function resetProgress() { setCompletedTopicIds([]); setAnswers({}); setActiveSubjectId("portugues"); setActiveTopicId("interpretacao"); }

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#inicio" aria-label="Rota da Aprovação, início"><img src="/manus-storage/rota-logo_f994c251.png" alt="" className="brand-mark" /><span className="brand-name"><em>Rota</em> da Aprovação</span></a><div className="topbar-context"><span className="context-dot" /><span>Assistente de Serviços de Saúde</span><ChevronDown size={16} strokeWidth={1.8} /></div><div className="topbar-profile"><div className="streak"><Sparkles size={15} /><span>edital completo</span></div><div className="avatar" aria-label="Perfil do estudante">A</div></div></header>
    <main id="inicio" className="app-main">
      <aside className="study-sidebar" aria-label="Índice de disciplinas e tópicos">
        <div className="sidebar-heading"><span className="eyebrow">Roteiro completo · 6 disciplinas</span><h1>Seu edital,<br /><em>em rota.</em></h1><p>Selecione uma disciplina, avance pelos blocos e registre evidências de estudo.</p></div>
        <div className="sidebar-progress"><div className="sidebar-progress-label"><span>Seu percurso geral</span><strong>{completedPercent}%</strong></div><div className="progress-track"><span style={{ width: `${completedPercent}%` }} /></div></div>
        <div className="discipline-index"><span className="eyebrow">Índice de disciplinas</span>{subjects.map((subject, index) => <button key={subject.id} type="button" onClick={() => chooseSubject(subject.id)} className={`discipline-index-item ${subject.id === activeSubject.id ? "is-active" : ""}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{subject.shortTitle}</strong><i>{subject.id === activeSubject.id ? <ChevronRight size={15} /> : `${subject.topics.filter((topic) => completedTopicIds.includes(topic.id)).length}/${subject.topics.length}`}</i></button>)}</div>
        <div className="sidebar-topic-head"><span className="eyebrow">Trilha atual</span><strong>{activeSubject.shortTitle}</strong><span>{subjectPercent}% concluído</span></div>
        <nav className="topic-nav" aria-label={`Tópicos de ${activeSubject.title}`}>{activeSubjectTopics.map((topic) => { const isActive = topic.id === activeTopic.id; const isComplete = completedTopicIds.includes(topic.id); return <button key={topic.id} type="button" className={`topic-nav-item ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`} onClick={() => chooseTopic(topic.id)}><span className="topic-number">{isComplete ? <Check size={14} strokeWidth={2.4} /> : topic.order}</span><span>{topic.shortTitle}</span>{isActive && <ChevronRight size={16} className="topic-chevron" />}</button>; })}</nav>
        <div className="sidebar-note"><Target size={16} /><p><strong>Próxima meta</strong> Concluir uma aula e responder uma questão da disciplina atual.</p></div>
      </aside>
      <section className="content-pane">
        <section className="editorial-hero" aria-label="Panorama do seu estudo"><img src="/manus-storage/rota-editorial-hero_815e76df.jpg" alt="Mesa de estudos com caderno e materiais de escrita" /><div className="hero-overlay" /><div className="hero-copy"><p className="eyebrow eyebrow-coral">{activeSubject.module}</p><h2>{activeSubject.title}<br /><em>com direção e evidência.</em></h2><p>{activeSubject.summary} Escolha um bloco, assista à aula e consolide o aprendizado no treino imediato.</p><a href="#aula-atual" className="hero-action"><Play size={15} fill="currentColor" /> Estudar {activeSubject.shortTitle}</a></div><div className="hero-rule"><span>{activeSubject.topics.length} blocos · edital 2026</span></div></section>
        <section className="subject-ledger" aria-label="Panorama da disciplina atual"><div><span className="eyebrow">Página de índice</span><strong>{activeSubject.shortTitle}</strong></div><p>{activeSubject.summary}</p><div className="ledger-stats"><span><b>{subjectCompleted}</b> blocos concluídos</span><span><b>{subjectAnswered}</b> questões respondidas</span><span><b>{subjectAccuracy}%</b> acerto nesta disciplina</span></div></section>
        <section className="metrics-row" aria-label="Monitor de desempenho"><div className="section-label"><LayoutDashboard size={16} /><span>Monitor de desempenho</span><i /></div><div className="metrics-grid"><StudyEvidence value={completedPercent} label="Edital" detail={`${completedTopicIds.length} de ${allTopics.length} blocos concluídos`} /><StudyEvidence value={accuracy} label="Acerto" detail={answeredCount ? `${correctCount} acerto${correctCount === 1 ? "" : "s"} em ${answeredCount} tentativa${answeredCount === 1 ? "" : "s"}` : "Responda o primeiro treino"} tone="blue" /><div className="target-card"><div className="target-card-top"><span className="eyebrow">Sinal de revisão</span><Flag size={17} /></div><strong>{subjectAnswered === 0 ? "Ainda sem evidência" : subjectAccuracy >= 70 ? "Base consistente" : "Revisão recomendada"}</strong><p>{subjectAnswered === 0 ? `Pratique ${activeSubject.shortTitle} para revelar seu primeiro indicador.` : subjectAccuracy >= 70 ? "Mantenha o ritmo e avance para o próximo bloco." : "Retome a aula e teste novamente o ponto mais frágil."}</p></div></div></section>
        <section id="aula-atual" className="lesson-section"><div className="section-label"><BookOpenCheck size={16} /><span>Aula em foco</span><i /></div><div className="lesson-layout"><article className="lesson-card"><div className="lesson-card-meta"><span className={`topic-pill pill-${activeTopic.accent}`}>{activeSubject.shortTitle} · bloco {activeTopic.order}</span><span><Clock3 size={14} /> {activeTopic.duration}</span></div><h2>{activeTopic.title}</h2><p>{activeTopic.description}</p><div className="lesson-focus"><span>Foco da aula</span><strong>{activeTopic.focus}</strong></div><div className="lesson-card-actions"><button type="button" className={`complete-button ${isCurrentComplete ? "is-complete" : ""}`} onClick={markCurrentComplete}>{isCurrentComplete ? <><Check size={17} /> Conteúdo concluído</> : <><BookOpenCheck size={17} /> Marcar como concluído</>}</button>{nextTopic && <button type="button" className="next-button" onClick={() => chooseTopic(nextTopic.id)}>Próximo <ChevronRight size={16} /></button>}</div></article><div className="video-card"><div className="video-head"><div><span className="eyebrow">Seleção pública</span><h3>{activeTopic.teacher}</h3></div><a href={activeTopic.sourceUrl} target="_blank" rel="noreferrer" aria-label="Abrir aula no YouTube"><ExternalLink size={18} /></a></div><div className="video-frame"><iframe key={activeTopic.videoId} src={`https://www.youtube-nocookie.com/embed/${activeTopic.videoId}?rel=0&playsinline=1`} title={activeTopic.videoTitle} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="video-foot"><span>{activeTopic.source} · {activeTopic.videoTitle}</span><a href={activeTopic.sourceUrl} target="_blank" rel="noreferrer">Ver origem <ArrowUpRight size={14} /></a></div></div></div></section>
        <section id="questoes" className="practice-section"><div className="section-label"><CircleHelp size={16} /><span>Treino imediato</span><i /></div><div className="practice-layout"><article className="question-card"><div className="question-heading"><div><span className="eyebrow eyebrow-coral">Questão autoral · {activeSubject.shortTitle}</span><h2>Teste sua leitura do conteúdo.</h2></div><span className="question-count">{activeTopic.order}</span></div><p className="question-statement">{activeQuestion.statement}</p><div className="alternatives" role="radiogroup" aria-label="Alternativas da questão">{activeQuestion.alternatives.map((alternative, index) => { const state = hasAnswered ? index === activeQuestion.correctIndex ? "is-correct" : index === questionAnswer ? "is-wrong" : "" : ""; return <button type="button" role="radio" aria-checked={questionAnswer === index} key={alternative} disabled={hasAnswered} onClick={() => answerQuestion(activeQuestion.id, index)} className={`alternative ${state}`}><span>{String.fromCharCode(65 + index)}</span><p>{alternative}</p>{hasAnswered && index === activeQuestion.correctIndex && <Check size={18} />}</button>; })}</div>{hasAnswered && <div className={`answer-feedback ${questionAnswer === activeQuestion.correctIndex ? "feedback-good" : "feedback-review"}`}><div>{questionAnswer === activeQuestion.correctIndex ? <Trophy size={19} /> : <RotateCcw size={19} />}</div><p><strong>{questionAnswer === activeQuestion.correctIndex ? "Boa leitura." : "Transforme o erro em revisão."}</strong> {activeQuestion.explanation}</p><button type="button" onClick={() => resetQuestion(activeQuestion.id)}>Refazer</button></div>}</article><aside className="revision-card"><img src="/manus-storage/rota-revision-illustration_89e699dc.jpg" alt="Ilustração editorial de uma rota de revisão com abas de papel" /><div className="revision-content"><span className="eyebrow">Método de revisão</span><h3>Errou aqui? Volte com intenção.</h3><p>A combinação entre aula concluída e resposta registrada ajuda a priorizar o seu próximo retorno.</p><a href="#aula-atual">Rever a aula <ChevronRight size={15} /></a></div></aside></div></section>
        <section className="footnote-section"><img src="/manus-storage/rota-focus-illustration_b9a0435b.jpg" alt="Ilustração de progresso de estudo com papéis e marca de verificação" /><div><span className="eyebrow">Sobre esta curadoria</span><h3>Uma fonte, uma trilha, uma escolha consciente.</h3><p>{sourceNote}</p></div><button type="button" className="reset-button" onClick={resetProgress}><RotateCcw size={15} /> Reiniciar percurso</button></section>
      </section>
    </main>
  </div>;
}
