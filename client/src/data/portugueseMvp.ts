/**
 * Conteúdo do MVP: sequência baseada no edital enviado pelo usuário.
 * Direção visual: Margem de Caderno — dados servem a uma jornada de estudo clara e ativa.
 */

export type Question = {
  id: string;
  topicId: string;
  statement: string;
  alternatives: string[];
  correctIndex: number;
  explanation: string;
};

export type StudyTopic = {
  id: string;
  order: string;
  title: string;
  shortTitle: string;
  description: string;
  focus: string;
  teacher: string;
  source: string;
  videoId: string;
  videoTitle: string;
  duration: string;
  sourceUrl: string;
  accent: "coral" | "blue" | "sage";
};

export const studyTopics: StudyTopic[] = [
  {
    id: "interpretacao",
    order: "01",
    title: "Leitura, compreensão e interpretação de textos",
    shortTitle: "Interpretação de textos",
    description:
      "Aprenda a separar o que está escrito no texto das inferências permitidas pela banca e a reconhecer comandos de questão.",
    focus: "Ideia central, implícitos, finalidade e relação entre informações.",
    teacher: "Prof. Álvaro Ferreira",
    source: "Português para concurso",
    videoId: "22iA3PPjr7c",
    videoTitle: "INTERPRETAÇÃO de TEXTOS para CONCURSO",
    duration: "Aula específica",
    sourceUrl: "https://www.youtube.com/watch?v=22iA3PPjr7c",
    accent: "coral",
  },
  {
    id: "sinonimos",
    order: "02",
    title: "Sinônimos, antônimos e sentido das palavras",
    shortTitle: "Sentido das palavras",
    description:
      "Revise como a substituição de palavras altera sentidos e como contexto, denotação e conotação aparecem nas questões.",
    focus: "Sinonímia, antonímia, sentido próprio e sentido figurado.",
    teacher: "AlfaCon",
    source: "Aula de base para concursos",
    videoId: "-JjQalcnvkc",
    videoTitle: "Aula de Língua Portuguesa — Começando do Zero",
    duration: "2h52",
    sourceUrl: "https://www.youtube.com/watch?v=-JjQalcnvkc",
    accent: "blue",
  },
  {
    id: "pontuacao",
    order: "03",
    title: "Pontuação",
    shortTitle: "Pontuação",
    description:
      "Entenda a função sintática da pontuação e abandone a regra insegura de usar vírgula apenas para marcar pausa.",
    focus: "Vírgula, dois-pontos, travessão, ponto e vírgula e efeitos de sentido.",
    teacher: "Aula de revisão para concursos",
    source: "Português em uma semana",
    videoId: "OfNlR1Ld-OU",
    videoTitle: "Destruindo o edital: Pontuação",
    duration: "2h11",
    sourceUrl: "https://www.youtube.com/watch?v=OfNlR1Ld-OU",
    accent: "sage",
  },
  {
    id: "classes",
    order: "04",
    title: "Classes de palavras",
    shortTitle: "Classes de palavras",
    description:
      "Domine a identificação contextual de substantivos, verbos, pronomes, conectivos e as demais classes cobradas no edital.",
    focus: "Morfologia aplicada à leitura e à análise de itens.",
    teacher: "Prof. João Bolognesi",
    source: "Qconcursos",
    videoId: "pIQDLWixKu4",
    videoTitle: "Português para concursos públicos: Morfossintaxe",
    duration: "1h30",
    sourceUrl: "https://www.youtube.com/watch?v=pIQDLWixKu4",
    accent: "blue",
  },
  {
    id: "concordancia",
    order: "05",
    title: "Concordância verbal e nominal",
    shortTitle: "Concordância",
    description:
      "Treine os casos mais recorrentes de concordância e reconheça o núcleo que determina a flexão de nomes e verbos.",
    focus: "Sujeito, porcentagens, expressões partitivas e concordância nominal.",
    teacher: "Aula de revisão para concursos",
    source: "Português em uma semana",
    videoId: "tciSNj12PQ4",
    videoTitle: "Destruindo o edital: Concordância",
    duration: "2h41",
    sourceUrl: "https://www.youtube.com/watch?v=tciSNj12PQ4",
    accent: "coral",
  },
  {
    id: "regencia",
    order: "06",
    title: "Regência verbal e nominal",
    shortTitle: "Regência",
    description:
      "Mapeie as relações exigidas por verbos e nomes para escolher a preposição adequada sem depender de memorização isolada.",
    focus: "Verbos transitivos, preposições exigidas e regência nominal.",
    teacher: "Aula de revisão para concursos",
    source: "Português em uma semana",
    videoId: "-JjisCCFXt8",
    videoTitle: "Destruindo o edital: Regência e crase",
    duration: "2h25",
    sourceUrl: "https://www.youtube.com/watch?v=-JjisCCFXt8",
    accent: "sage",
  },
  {
    id: "colocacao",
    order: "07",
    title: "Colocação pronominal",
    shortTitle: "Colocação pronominal",
    description:
      "Consolide próclise, mesóclise e ênclise a partir dos fatores que atraem ou afastam o pronome oblíquo.",
    focus: "Palavras atrativas, início de oração e formas verbais.",
    teacher: "Gran Cursos Online",
    source: "GranMática",
    videoId: "2bPU0T8x56k",
    videoTitle: "GranMática — Colocação Pronominal",
    duration: "1h35",
    sourceUrl: "https://www.youtube.com/watch?v=2bPU0T8x56k",
    accent: "blue",
  },
  {
    id: "crase",
    order: "08",
    title: "Emprego do sinal indicativo de crase",
    shortTitle: "Crase",
    description:
      "Aprenda a testar a fusão entre preposição e artigo, distinguindo casos obrigatórios, proibidos e facultativos.",
    focus: "Locuções, nomes femininos, pronomes e testes de substituição.",
    teacher: "Prof. Diogo Alves",
    source: "Gran Cursos Online",
    videoId: "U8WFo5fxv4I",
    videoTitle: "Gran Mática — Aprenda a usar a crase",
    duration: "1h34",
    sourceUrl: "https://www.youtube.com/watch?v=U8WFo5fxv4I",
    accent: "coral",
  },
];

export const questions: Question[] = [
  {
    id: "q1",
    topicId: "interpretacao",
    statement:
      "Em questões de interpretação, qual procedimento ajuda a evitar conclusões que não estão autorizadas pelo texto?",
    alternatives: [
      "Considerar apenas conhecimentos pessoais sobre o tema.",
      "Distinguir informação explícita de inferência sustentada por pistas textuais.",
      "Escolher sempre a alternativa mais extensa.",
      "Ignorar o comando da questão para focar apenas no título.",
    ],
    correctIndex: 1,
    explanation:
      "A alternativa correta precisa ser comprovada pelo texto ou resultar de uma inferência legitimada por seus elementos. Conhecimento externo não substitui evidência textual.",
  },
  {
    id: "q2",
    topicId: "classes",
    statement:
      "Na oração “Os candidatos estudaram muito antes da prova”, a palavra “muito” é classificada como:",
    alternatives: ["Substantivo", "Adjetivo", "Advérbio", "Pronome"],
    correctIndex: 2,
    explanation:
      "“Muito” modifica o verbo “estudaram”, indicando intensidade da ação; por isso, funciona como advérbio.",
  },
  {
    id: "q3",
    topicId: "pontuacao",
    statement: "Assinale a alternativa corretamente pontuada.",
    alternatives: [
      "Ao terminar a prova os candidatos, saíram em silêncio.",
      "Ao terminar a prova, os candidatos saíram em silêncio.",
      "Ao terminar, a prova os candidatos saíram em silêncio.",
      "Ao terminar a prova os candidatos saíram, em silêncio.",
    ],
    correctIndex: 1,
    explanation:
      "A oração reduzida adverbial “Ao terminar a prova” é separada por vírgula do restante da oração. Não se separa sujeito e verbo por vírgula.",
  },
  {
    id: "q4",
    topicId: "concordancia",
    statement: "Assinale a redação adequada à norma-padrão.",
    alternatives: [
      "Mais de um candidato compareceram à reunião.",
      "Mais de um candidato compareceu à reunião.",
      "Mais de um candidatos compareceu à reunião.",
      "Mais de um candidato, compareceu à reunião.",
    ],
    correctIndex: 1,
    explanation:
      "Em regra, a expressão “mais de um” exige verbo no singular quando acompanhada de substantivo singular: “Mais de um candidato compareceu”.",
  },
  {
    id: "q5",
    topicId: "regencia",
    statement: "Complete corretamente a oração: “Os estudantes assistiram ___ aula de revisão.”",
    alternatives: ["a", "à", "na", "com a"],
    correctIndex: 1,
    explanation:
      "No sentido de ver ou presenciar, o verbo “assistir” rege a preposição “a”. Diante de “a aula”, ocorre a fusão: “assistiram à aula”.",
  },
  {
    id: "q6",
    topicId: "colocacao",
    statement: "Assinale a alternativa com colocação pronominal adequada.",
    alternatives: [
      "Não avisaram-me sobre a mudança.",
      "Não me avisaram sobre a mudança.",
      "Me não avisaram sobre a mudança.",
      "Avisaram não-me sobre a mudança.",
    ],
    correctIndex: 1,
    explanation:
      "A palavra negativa “não” atrai o pronome para antes do verbo: “Não me avisaram”.",
  },
  {
    id: "q7",
    topicId: "crase",
    statement: "Em qual alternativa o uso da crase está correto?",
    alternatives: [
      "O servidor dirigiu-se à pé ao setor.",
      "A reunião começará à partir das nove horas.",
      "Entreguei o recurso à diretora da unidade.",
      "Os candidatos foram à realizar a inscrição.",
    ],
    correctIndex: 2,
    explanation:
      "Em “à diretora”, há a preposição exigida por “entreguei ... a” e o artigo feminino que acompanha “diretora”. Antes de verbo, em “a partir” e em “a pé”, não ocorre crase.",
  },
];

export const sourceNote =
  "Curadoria inicial de aulas públicas no YouTube, priorizando canais e professores especializados em concursos. A disponibilidade de incorporação depende das configurações do respectivo vídeo.";
