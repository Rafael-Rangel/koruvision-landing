# KORUVISION — Motion System
## Regras de animação premium para toda a landing page

> Aplicável a S01–S19. Referência: `demo/s04.html`  
> Filosofia híbrida máxima: `docs/KORUVISION-Master-Directive-v4.md`

---

## 1. Continuidade visual (frame in = frame out)

- Início e fim de cada cena devem **casar** — mesmo ambiente, mesma iluminação, mesma perspectiva base.
- Câmera virtual interpola **continuamente** entre atos; sem saltos de `rotateX/Y/Z` no boundary.
- Elementos compartilhados (device shell, void BG, data-river) **permanecem** entre transições.
- Transições entre telas = **morph/transform**, não corte para composição diferente.

---

## 2. Três fases obrigatórias por ato

Cada ato usa `local` de 0→1 mapeado ao scroll:

| Fase | Range local | Função |
|------|-------------|--------|
| **BUILD** | 0% – 48% | Elementos entram um a um, composição enriquece |
| **PEAK** | 48% – 72% | Tudo visível, legível, estável — momento de ápice |
| **EXIT** | 72% – 100% | Saída trabalhada: transform, morph, reposicionamento |

Constantes globais (GSAP):

```js
const BUILD_END = 0.48;
const PEAK_END  = 0.72;
```

---

## 3. Momento de máxima clareza (PEAK)

Durante PEAK **proibido**:

- Elemento principal em fade-out
- Texto parcialmente legível
- Card cortado ou em movimento
- Informação ainda entrando

Durante PEAK **obrigatório**:

- Opacidade 1 nos elementos principais
- Tipografia estável
- UI montada por completo
- Câmera estável (sem drift)

---

## 4. Entrada / permanência / saída independentes

Cada elemento tem slots próprios:

```js
{ enter: [0.10, 0.28], exit: [0.78, 0.94] }
```

- **enter**: stagger individual na fase BUILD
- **hold**: implícito entre fim do enter e início do exit
- **exit**: na fase EXIT — preferir `translate / scale / rotate` a `opacity: 0`

Função utilitária: `elementState(local, enterLo, enterHi, exitLo, exitHi)`

---

## 5. Transformações > desaparecimentos

Prioridade de saída:

1. Morph / Flip para elemento da próxima cena
2. Reposicionamento + escala
3. Rotação de perspectiva
4. Opacity (último recurso, máx. 30% no exit)

Exemplos FlowIA:

- Bolha WhatsApp → comprime e vira card do agente
- Card Kanban → voa para coluna (MotionPath), não some
- Chip flutuante → desliza para dentro do device

---

## 6. Narrativa contínua entre atos

| De | Para | Ponte visual |
|----|------|--------------|
| WhatsApp | Agente IA | Chip "intenção detectada" → painel IA |
| Agente IA | Kanban | Reply bubble → card Maria |
| Kanban | Agenda | Card Fechado → evento calendário |
| Agenda | Dashboard | Evento verde → métrica conversão |
| Dashboard | CTA | Pull-out câmera → convergência S19 |

---

## 7. Regra de ouro

> Nenhum elemento inicia saída antes de ter completado entrada **e** o ato ter atingido PEAK.

Checklist por elemento:

- [ ] Apareceu 100%?
- [ ] Usuário teve tempo de ler?
- [ ] Função ficou clara?
- [ ] Ato passou pelo PEAK?
- [ ] Só então: exit com transform

---

## 8. Parâmetros S04 (referência)

| Parâmetro | Desktop | Mobile |
|-----------|---------|--------|
| Pin scroll | +=620% | +=380% |
| Scrub | 2.8 | 1.6 |
| Screen peak | local 0.06–0.74 | igual |
| Crossfade entre telas | 0.74–0.98 | igual |

---

## 9. Implementação Next.js

```
lib/gsap/
  motion-system.ts    # BUILD_END, PEAK_END, elementState, phaseLocal
  useActScroll.ts     # hook por seção pinned
components/motion/
  ActPhase.tsx        # contexto build/peak/exit
```

Toda seção pinned deve declarar `ActScript` com slots por elemento.

---

*Motion System v1 — KORUVISION x FlowIA*
