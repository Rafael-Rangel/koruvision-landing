# KORUVISION v10 — Prompts de Video / Loops (Kling 2.5)

Diretrizes: loops perfeitos (frame inicial ~ frame final), 5s ou 10s, foco no produto,
estetica cinematografica, SEM espaco sideral generico, SEM abstrato sem contexto.
Cada video tem roteiro com inicio -> meio -> fim que retorna ao inicio.

## 1. Hero — "Despertar da plataforma" (10s, loop)
- Inicio: olhos da coruja fechados no escuro.
- Meio: olhos abrem, energia dourada percorre conexoes; nodes acendem; um dashboard/pipeline se forma em luz.
- Fim: a luz recolhe suavemente para os olhos -> volta ao inicio.
- Prompt: `owl eyes opening in darkness, golden energy flowing through neural connections, holographic CRM dashboard forming from light particles, violet and gold, cinematic, seamless loop, dark background`.

## 2. IA — "Agentes trabalhando" (5s, loop)
- Inicio/fim: rede neural calma pulsando.
- Meio: pulsos de luz viajam entre nodes, um "score" se ilumina.
- Prompt: `digital neural network with traveling light pulses between glowing nodes, an AI core pulsing, violet/gold, seamless loop`.

## 3. Pipeline — "Leads avancando" (5s, loop)
- Meio: esferas de luz (leads) descem por um funil 3D dourado, etapa a etapa.
- Prompt: `glowing spheres flowing down a 3D golden sales funnel stage by stage, premium, seamless loop, dark bg`.

## 4. WhatsApp — "Conversa automatizada" (5s, loop)
- Meio: bolhas de mensagem aparecem e a IA responde, um deal card se cria.
- Prompt: `chat bubbles appearing and an AI reply animating, a deal card materializing, green/gold accents, seamless loop`.

## 5. Analytics — "Indicadores evoluindo" (5s, loop)
- Meio: barras e linha de grafico sobem e respiram; numeros sobem e estabilizam.
- Prompt: `holographic bar and line charts rising and breathing, numbers counting up, violet/teal, seamless loop, dark bg`.

## 6. Integracoes — "Sistemas conectando" (5s, loop)
- Meio: nucleo central emite filamentos que se conectam a icones orbitando.
- Prompt: `central glowing core emitting data filaments connecting to orbiting integration icons, halo, seamless loop`.

## 7. CTA — "Convergencia" (10s, loop)
- Meio: rios de luz dourada convergem; coruja surge sutil; logo se forma e recolhe.
- Prompt: `streams of golden light converging to a focal point, subtle owl silhouette emerging, brand climax, seamless loop, dark cinematic`.

> Producao: `python scripts/nv9_pipeline.py` (Kling via Replicate, token em `.env`).
> Otimizar: exportar WebM/MP4 H.264, poster .webp, `preload="none"`, tocar so visivel (componente `SmartVideo`).
