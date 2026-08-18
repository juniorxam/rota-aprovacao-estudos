# Direção de Design — Rota da Aprovação

## Três abordagens consideradas

| Tema | Introdução breve | Probabilidade |
|---|---|---:|
| Margem de Caderno | Uma plataforma editorial inspirada em cadernos de preparação, com anotações, marcadores e ritmo de leitura. Aproxima o estudo digital do gesto de acompanhar uma apostila bem marcada. | 0.07 |
| Sala de Prova | Uma experiência objetiva inspirada no ambiente de concurso, com blocos de foco, cronômetros discretos e alto contraste. O clima é de preparo calmo, sem pressão visual. | 0.04 |
| Atlas de Domínio | Um painel cartográfico que representa conteúdos como territórios a conquistar, com caminhos e marcos de evolução. Privilegia orientação e sensação de avanço. | 0.09 |

## Abordagem selecionada: Margem de Caderno

### Movimento de design

**Editorial contemporâneo com influência de cadernos de estudo anotados.** A interface se comporta como uma folha técnica bem diagramada: blocos de conteúdo assimétricos, margens generosas, hierarquia tipográfica forte e sinais visuais de grifo, índice e progresso.

### Princípios centrais

1. **Ritmo antes de ruído:** cada seção deve ajudar o aluno a decidir o próximo passo, sem competir pela atenção.
2. **Progresso visível e específico:** evolução se apresenta como domínio de tópicos e acertos, nunca apenas como números decorativos.
3. **Editorial, não corporativo:** divisores, labels, sublinhados e anotações substituem painéis genéricos e cartões uniformes.
4. **Estudo ativo:** ações principais, como assistir, responder e revisar erros, permanecem muito próximas do contexto em que serão usadas.

### Filosofia de cor

O fundo de papel quente comunica concentração e continuidade; o azul-tinta dá estrutura e confiança sem cair no visual tecnológico genérico. O coral de marca aparece pontualmente como sinal de ação, avanço ou atenção. Tons de sálvia reservam a leitura de domínio consistente. A paleta precisa parecer uma mesa de estudos organizada, não um painel financeiro.

### Paradigma de layout

O produto usa uma **coluna de índice fixa à esquerda** e uma **trilha de estudo editorial à direita**, com uma faixa superior de panorama. Em telas menores, a navegação vira um seletor de conteúdo e a trilha preserva sua ordem vertical. O conteúdo principal não é centralizado em uma única pilha: player e sequência de tópicos formam uma composição deslocada, inspirada em uma página dupla de caderno.

### Elementos de assinatura

1. Uma **régua vertical coral** marca a posição atual no roteiro de Português.
2. Tags em caixa alta e linhas de sublinhado azuis funcionam como marcadores de apostila.
3. O progresso é expresso por **arcos e traços de caneta**, em vez de barras genéricas isoladas.

### Filosofia de interação

As interações devem confirmar o avanço do aluno de forma serena e tangível. Marcar uma aula como concluída, responder uma questão ou escolher um tópico atualiza imediatamente o roteiro e o panorama. Elementos de alta frequência usam resposta curta; mudanças de contexto podem ter transições suaves, mas nunca lentas.

### Animação

Use entradas sequenciais leves por opacidade e deslocamento vertical máximo de 10 px, entre 160 e 240 ms, com `cubic-bezier(0.23, 1, 0.32, 1)`. Estados de conclusão desenham o traço de progresso brevemente; botões usam redução para 97% no clique. Respeitar `prefers-reduced-motion`, removendo movimentos não essenciais.

### Sistema tipográfico

**DM Sans** conduz navegação, métricas e textos funcionais pela legibilidade. **DM Serif Display** aparece apenas em títulos de módulo, mensagens de orientação e números de destaque, criando a voz editorial. Títulos têm contraste de escala e não usam caixa alta; labels e metadados usam caixa alta com espaçamento moderado.

### Essência da marca

**Rota da Aprovação é a trilha de estudo organizada para quem quer transformar o edital em progresso mensurável, sem se perder entre videoaulas e questões.**

Personalidade: **clara, disciplinada, acolhedora**.

### Voz da marca

Headlines mostram uma decisão e o próximo movimento; CTAs são diretos, sem exageros. A microcópia reconhece a constância do aluno e aponta um caminho específico.

Exemplos: “Hoje, avance um tópico — não uma aba.”

Exemplos: “Errou aqui? Transforme em revisão antes que vire padrão.”

### Wordmark e logotipo

O logotipo combina uma **marca gráfica sem texto**: uma fita coral que contorna três páginas azuis, sugerindo simultaneamente caminho, índice e folha dobrada. O wordmark é desenhado na aplicação pela combinação do serifado editorial em “Rota” e sans em “da Aprovação”, nunca com uma fonte padrão isolada.

### Cor de marca

**Coral de Rota — `#E85D43`**. É a cor exclusiva dos sinais de avanço, da fita da marca e das ações primárias.

## Style Decisions

- Blocos de interface não devem parecer cartões genéricos: cada um precisa se comportar como página de caderno, anotação de margem, entrada de índice, referência recortada ou folha de exercício.
- Os sinais de desempenho devem usar rota marcada, traço de caneta ou anotação de progresso; medidores circulares isolados não fazem parte da linguagem visual.
- O Coral de Rota (`#E85D43`) fica restrito à posição no percurso, avanço, atenção e ação primária, aparecendo como a régua visual que conecta o estudante ao longo da página.
