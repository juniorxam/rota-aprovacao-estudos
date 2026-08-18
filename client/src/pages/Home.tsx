/**
 * Direção visual: Margem de Caderno — composição editorial, margem coral de progresso,
 * fundo de papel quente e hierarquia que aproxima o estudo digital de uma apostila anotada.
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
import { questions, sourceNote, studyTopics } from "@/data/portugueseMvp";

type AnswerMap = Record<string, number>;

const storageKeys = {
  topic: "rota-portugues-current-topic",
  completed: "rota-portugues-completed-topics",
  answers: "rota-portugues-answers",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function StudyEvidence({ value, label, detail, tone = "coral" }: { value: number; label: string; detail: string; tone?: "coral" | "blue" | "sage" }) {
  return (
    <div className={`evidence-sheet evidence-${tone}`}>
      <div className="evidence-route" aria-hidden="true">
        <span className="evidence-route-track" />
        <span className="evidence-route-mark" style={{ top: `${Math.max(8, Math.min(value, 92))}%` }} />
      </div>
      <div>
        <p className="eyebrow"><em>registro</em> {label}</p>
        <strong className="evidence-value">{value}%</strong>
        <p className="metric-detail">{detail}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTopicId, setActiveTopicId] = useState("interpretacao");
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setActiveTopicId(loadFromStorage(storageKeys.topic, "interpretacao"));
    setCompletedTopicIds(loadFromStorage<string[]>(storageKeys.completed, []));
    setAnswers(loadFromStorage<AnswerMap>(storageKeys.answers, {}));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(storageKeys.topic, JSON.stringify(activeTopicId));
  }, [activeTopicId, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(storageKeys.completed, JSON.stringify(completedTopicIds));
  }, [completedTopicIds, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(storageKeys.answers, JSON.stringify(answers));
  }, [answers, ready]);

  const activeTopic = studyTopics.find((topic) => topic.id === activeTopicId) ?? studyTopics[0];
  const activeIndex = studyTopics.findIndex((topic) => topic.id === activeTopic.id);
  const activeQuestion = questions.find((question) => question.topicId === activeTopic.id) ?? questions[0];
  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () => questions.reduce((total, question) => total + (answers[question.id] === question.correctIndex ? 1 : 0), 0),
    [answers],
  );
  const completedPercent = Math.round((completedTopicIds.length / studyTopics.length) * 100);
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const nextTopic = studyTopics[activeIndex + 1];

  function chooseTopic(id: string) {
    setActiveTopicId(id);
    window.setTimeout(() => document.getElementById("aula-atual")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }

  function markCurrentComplete() {
    setCompletedTopicIds((current) => (current.includes(activeTopic.id) ? current : [...current, activeTopic.id]));
  }

  function answerQuestion(questionId: string, choiceIndex: number) {
    setAnswers((current) => ({ ...current, [questionId]: choiceIndex }));
  }

  function resetQuestion(questionId: string) {
    setAnswers((current) => {
      const copy = { ...current };
      delete copy[questionId];
      return copy;
    });
  }

  function resetProgress() {
    setCompletedTopicIds([]);
    setAnswers({});
    setActiveTopicId("interpretacao");
  }

  const questionAnswer = answers[activeQuestion.id];
  const hasAnswered = typeof questionAnswer === "number";
  const isCurrentComplete = completedTopicIds.includes(activeTopic.id);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Rota da Aprovação, início">
          <img src="/manus-storage/rota-logo_f994c251.png" alt="" className="brand-mark" />
          <span className="brand-name"><em>Rota</em> da Aprovação</span>
        </a>
        <div className="topbar-context">
          <span className="context-dot" />
          <span>Assistente de Serviços de Saúde</span>
          <ChevronDown size={16} strokeWidth={1.8} />
        </div>
        <div className="topbar-profile">
          <div className="streak"><Sparkles size={15} /> <span>ritmo ativo</span></div>
          <div className="avatar" aria-label="Perfil do estudante">A</div>
        </div>
      </header>

      <main id="inicio" className="app-main">
        <aside className="study-sidebar" aria-label="Roteiro de Língua Portuguesa">
          <div className="sidebar-heading">
            <span className="eyebrow">Módulo I · conhecimentos gerais</span>
            <h1>Língua<br />Portuguesa</h1>
            <p>8 frentes do edital para estudar com sequência e evidência de domínio.</p>
          </div>

          <div className="sidebar-progress">
            <div className="sidebar-progress-label"><span>Seu percurso</span><strong>{completedPercent}%</strong></div>
            <div className="progress-track"><span style={{ width: `${completedPercent}%` }} /></div>
          </div>

          <nav className="topic-nav" aria-label="Tópicos de Português">
            {studyTopics.map((topic) => {
              const isActive = topic.id === activeTopic.id;
              const isComplete = completedTopicIds.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`topic-nav-item ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`}
                  onClick={() => chooseTopic(topic.id)}
                >
                  <span className="topic-number">{isComplete ? <Check size={14} strokeWidth={2.4} /> : topic.order}</span>
                  <span>{topic.shortTitle}</span>
                  {isActive && <ChevronRight size={16} className="topic-chevron" />}
                </button>
              );
            })}
          </nav>

          <div className="sidebar-note">
            <Target size={16} />
            <p><strong>Próxima meta</strong> Concluir uma aula e responder uma questão de treino.</p>
          </div>
        </aside>

        <section className="content-pane">
          <section className="editorial-hero" aria-label="Panorama do seu estudo">
            <img src="/manus-storage/rota-editorial-hero_815e76df.jpg" alt="Mesa de estudos com caderno e materiais de escrita" />
            <div className="hero-overlay" />
            <div className="hero-copy">
              <p className="eyebrow eyebrow-coral">Roteiro de hoje</p>
              <h2>Hoje, avance um tópico —<br /><em>não uma aba.</em></h2>
              <p>Você está no início da trilha. Escolha a aula atual, pratique e deixe o painel mostrar onde revisar.</p>
              <a href="#aula-atual" className="hero-action"><Play size={15} fill="currentColor" /> Retomar roteiro</a>
            </div>
            <div className="hero-rule"><span>Português · edital 2026</span></div>
          </section>

          <section className="metrics-row" aria-label="Monitor de desempenho">
            <div className="section-label"><LayoutDashboard size={16} /><span>Monitor de desempenho</span><i /></div>
            <div className="metrics-grid">
              <StudyEvidence value={completedPercent} label="Roteiro" detail={`${completedTopicIds.length} de ${studyTopics.length} tópicos concluídos`} />
              <StudyEvidence value={accuracy} label="Acerto" detail={answeredCount ? `${correctCount} acerto${correctCount === 1 ? "" : "s"} em ${answeredCount} tentativa${answeredCount === 1 ? "" : "s"}` : "Responda o primeiro treino"} tone="blue" />
              <div className="target-card">
                <div className="target-card-top"><span className="eyebrow">Sinal de revisão</span><Flag size={17} /></div>
                <strong>{answeredCount === 0 ? "Ainda sem evidência" : accuracy >= 70 ? "Base consistente" : "Revisão recomendada"}</strong>
                <p>{answeredCount === 0 ? "Pratique para revelar sua primeira leitura de desempenho." : accuracy >= 70 ? "Mantenha o ritmo e siga para o próximo tópico." : "Retome a aula e teste novamente o ponto mais frágil."}</p>
              </div>
            </div>
          </section>

          <section id="aula-atual" className="lesson-section">
            <div className="section-label"><BookOpenCheck size={16} /><span>Aula em foco</span><i /></div>
            <div className="lesson-layout">
              <article className="lesson-card">
                <div className="lesson-card-meta">
                  <span className={`topic-pill pill-${activeTopic.accent}`}>Tópico {activeTopic.order}</span>
                  <span><Clock3 size={14} /> {activeTopic.duration}</span>
                </div>
                <h2>{activeTopic.title}</h2>
                <p>{activeTopic.description}</p>
                <div className="lesson-focus"><span>Foco da aula</span><strong>{activeTopic.focus}</strong></div>
                <div className="lesson-card-actions">
                  <button type="button" className={`complete-button ${isCurrentComplete ? "is-complete" : ""}`} onClick={markCurrentComplete}>
                    {isCurrentComplete ? <><Check size={17} /> Conteúdo concluído</> : <><BookOpenCheck size={17} /> Marcar como concluído</>}
                  </button>
                  {nextTopic && <button type="button" className="next-button" onClick={() => chooseTopic(nextTopic.id)}>Próximo <ChevronRight size={16} /></button>}
                </div>
              </article>

              <div className="video-card">
                <div className="video-head">
                  <div>
                    <span className="eyebrow">Seleção pública</span>
                    <h3>{activeTopic.teacher}</h3>
                  </div>
                  <a href={activeTopic.sourceUrl} target="_blank" rel="noreferrer" aria-label="Abrir aula no YouTube"><ExternalLink size={18} /></a>
                </div>
                <div className="video-frame">
                  <iframe
                    key={activeTopic.videoId}
                    src={`https://www.youtube-nocookie.com/embed/${activeTopic.videoId}?rel=0&playsinline=1`}
                    title={activeTopic.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="video-foot"><span>{activeTopic.source} · {activeTopic.videoTitle}</span><a href={activeTopic.sourceUrl} target="_blank" rel="noreferrer">Ver origem <ArrowUpRight size={14} /></a></div>
              </div>
            </div>
          </section>

          <section id="questoes" className="practice-section">
            <div className="section-label"><CircleHelp size={16} /><span>Treino imediato</span><i /></div>
            <div className="practice-layout">
              <article className="question-card">
                <div className="question-heading">
                  <div><span className="eyebrow eyebrow-coral">Questão autoral · {activeTopic.shortTitle}</span><h2>Teste sua leitura do conteúdo.</h2></div>
                  <span className="question-count">01</span>
                </div>
                <p className="question-statement">{activeQuestion.statement}</p>
                <div className="alternatives" role="radiogroup" aria-label="Alternativas da questão">
                  {activeQuestion.alternatives.map((alternative, index) => {
                    const state = hasAnswered
                      ? index === activeQuestion.correctIndex
                        ? "is-correct"
                        : index === questionAnswer
                          ? "is-wrong"
                          : ""
                      : "";
                    return (
                      <button
                        type="button"
                        role="radio"
                        aria-checked={questionAnswer === index}
                        key={alternative}
                        disabled={hasAnswered}
                        onClick={() => answerQuestion(activeQuestion.id, index)}
                        className={`alternative ${state}`}
                      >
                        <span>{String.fromCharCode(65 + index)}</span>
                        <p>{alternative}</p>
                        {hasAnswered && index === activeQuestion.correctIndex && <Check size={18} />}
                      </button>
                    );
                  })}
                </div>
                {hasAnswered && (
                  <div className={`answer-feedback ${questionAnswer === activeQuestion.correctIndex ? "feedback-good" : "feedback-review"}`}>
                    <div>{questionAnswer === activeQuestion.correctIndex ? <Trophy size={19} /> : <RotateCcw size={19} />}</div>
                    <p><strong>{questionAnswer === activeQuestion.correctIndex ? "Boa leitura." : "Transforme o erro em revisão."}</strong> {activeQuestion.explanation}</p>
                    <button type="button" onClick={() => resetQuestion(activeQuestion.id)}>Refazer</button>
                  </div>
                )}
              </article>

              <aside className="revision-card">
                <img src="/manus-storage/rota-revision-illustration_89e699dc.jpg" alt="Ilustração editorial de uma rota de revisão com abas de papel" />
                <div className="revision-content">
                  <span className="eyebrow">Método de revisão</span>
                  <h3>Errou aqui? Volte com intenção.</h3>
                  <p>A combinação entre aula concluída e resposta registrada ajuda a priorizar o seu próximo retorno.</p>
                  <a href="#aula-atual">Rever a aula <ChevronRight size={15} /></a>
                </div>
              </aside>
            </div>
          </section>

          <section className="footnote-section">
            <img src="/manus-storage/rota-focus-illustration_b9a0435b.jpg" alt="Ilustração de progresso de estudo com papéis e marca de verificação" />
            <div>
              <span className="eyebrow">Sobre esta curadoria</span>
              <h3>Vídeos na plataforma, autonomia no estudo.</h3>
              <p>{sourceNote}</p>
            </div>
            <button type="button" className="reset-button" onClick={resetProgress}><RotateCcw size={15} /> Reiniciar MVP</button>
          </section>
        </section>
      </main>
    </div>
  );
}
