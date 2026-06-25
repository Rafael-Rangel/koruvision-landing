# FlowIA — Prompts Completos para Geração de Assets
> FLUX Schnell (Replicate) + Kling 2.5 Turbo Pro  
> Use este documento diretamente: copie o prompt + parâmetros e cole nas ferramentas

---

## ÍNDICE DE ASSETS

| # | Tipo | Asset | Seção | Status |
|---|------|-------|-------|--------|
| I-01 a I-04 | Imagem | Hero backgrounds e glow | S01 | — |
| I-05 a I-08 | Imagem | Dor / Problema | S02 | — |
| I-09 a I-13 | Imagem | Mockups de produto | S04 | — |
| I-14 a I-15 | Imagem | Antes / Depois lifestyle | S11 | — |
| I-16 a I-20 | Imagem | Cases por vertical | S12 | — |
| I-21 a I-25 | Imagem | Abstratos / Decorativos | Global | — |
| I-26 a I-29 | Imagem | Avatares testimonials | S13 | — |
| I-30 a I-32 | Imagem | Backgrounds de seção | Global | — |
| V-01 a V-22 | Vídeo | Kling — todos os clipes | Global | — |

---

# ════════════════════════════════════════
# PARTE 1 — FLUX SCHNELL (IMAGENS)
# ════════════════════════════════════════

## CONFIGURAÇÕES GLOBAIS FLUX SCHNELL

Aplique em todos os prompts abaixo, salvo quando indicado diferente:

```
num_inference_steps: 4       ← máximo recomendado
output_format: webp
output_quality: 95
go_fast: true
megapixels: 1                ← ~1024×1024 ou equivalente no aspect_ratio
num_outputs: 4               ← gere 4 variações, escolha a melhor
```

**Dica de produção:** Para assets hero (I-01, I-09, I-14, I-15), use `num_outputs: 4` e `go_fast: false` para máxima qualidade. Para assets de apoio e background, `go_fast: true` é suficiente.

---

## HERO — BACKGROUNDS E AMBIENTE (S01)

---

### I-01 — Hero Background Principal (Glow Radial)
**Arquivo:** `hero-bg-glow.webp`  
**Uso:** Background full-bleed do hero, atrás de todo conteúdo  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Abstract dark technology background, ultra deep navy void #03060F, massive radial 
glow emanating from top center, electric blue #3B82F6 core bleeding into violet 
#8B5CF6 at the edges, atmospheric volumetric light shafts descending vertically, 
perspective grid lines converging toward a vanishing point at the bottom third, 
grid made of extremely thin luminous cyan lines at 4% opacity, noise grain texture 
overlay for depth and film-like quality, multiple subtle bokeh orbs scattered at 
various depths creating dimensional layering, dark vignette at all four corners 
pulling focus to center glow, no text, no UI elements, no people, pure abstract 
cinematic technology aesthetic, inspired by Linear.app and Stripe homepage aesthetics, 
ultra high resolution, 8K quality, photorealistic lighting, professional art direction
```

---

### I-02 — Hero Particle Field
**Arquivo:** `hero-particles.webp`  
**Uso:** Overlay de partículas sobre o fundo do hero (blend mode: screen ou add)  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 90
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Abstract particle constellation field on pure black background, hundreds of tiny 
luminous dots of varying sizes arranged in organic clusters and flowing streams, 
colors ranging from bright white to electric blue #3B82F6 to soft violet #8B5CF6, 
particles connected by ultra-thin filament lines at very low opacity creating a 
neural network or constellation map effect, some particles with soft glow bloom 
halos, particles denser toward the upper center and sparser at edges, bokeh blur 
on distant particles creating depth of field effect, no background color only pure 
black so it can be used as overlay, reminiscent of stars in deep space or synaptic 
connections, abstract and beautiful, minimalist and precise, 8K detail
```

---

### I-03 — Hero Noise Texture Overlay
**Arquivo:** `hero-noise-texture.webp`  
**Uso:** Overlay de grain/ruído cinematográfico (blend mode: overlay, opacity 3–5%)  
**Parâmetros Flux:**
```
aspect_ratio: 1:1
megapixels: 0.25
output_quality: 100
num_outputs: 1
go_fast: true
```

**Prompt:**
```
Pure film grain texture, fine analog noise, monochromatic gray tones, cinematic 16mm 
film grain texture tile, seamlessly tileable, uniform distribution of noise particles, 
no patterns no shapes no objects, only pure photographic grain texture, high contrast 
grain suitable for overlay blending, similar to Kodak Portra film grain, the texture 
should appear neutral gray with grain variation, professional texture asset
```

---

### I-04 — Hero Product Environment (Isometric Preview)
**Arquivo:** `hero-product-env.webp`  
**Uso:** Mockup isométrico do produto flutuando no hero  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Isometric 3D render of a sleek ultra-modern dark mode software dashboard floating 
in a dark void, slight 30-degree isometric perspective, the interface shows a CRM 
inbox with three panels: left sidebar with conversation list showing notification 
badges, center chat panel with clean dark bubbles and typing indicator, right panel 
with contact details and Kanban stage indicator, the screen glows with electric blue 
and green UI elements, multiple soft layered drop shadows beneath the device creating 
elevation sense, thin rim light outlining the device edges in electric blue, 
background is deep navy #03060F with a subtle glow halo behind the device, interface 
text is blurred and illegible for privacy, purely visual impression of a premium 
dark mode SaaS product, inspired by Linear.app and Vercel design language, 
hyperrealistic render, studio lighting, 8K quality, no text readable, 
professional product photography composition
```

---

## PROBLEMA / DOR (S02)

---

### I-05 — Dor 1: WhatsApp Caótico
**Arquivo:** `pain-whatsapp-chaos.webp`  
**Uso:** Card de dor "WhatsApp sem resposta"  
**Parâmetros Flux:**
```
aspect_ratio: 3:4
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Close-up macro photography of a smartphone screen in a dim room, screen showing 
a dark mode messaging app with dozens of unanswered messages stacked vertically, 
red unread badge showing "47" notifications, blue message delivery ticks without 
read receipts, messages from different contacts piling up with timestamps showing 
hours ago and yesterday, the phone lies on a wooden surface with other scattered 
items, dramatic single side light from the left creating strong shadows, 
desaturated moody color grade leaning toward cold blue-gray, the image communicates 
stress overwhelm and chaos, cinematic documentary photography style, shallow depth 
of field f/2.8 equivalent, sharp focus on the screen with background softly blurred, 
no faces visible, no readable text on screen, evocative of missed business opportunities, 
professional editorial photography quality
```

---

### I-06 — Dor 2: Planilha Caótica
**Arquivo:** `pain-spreadsheet-chaos.webp`  
**Uso:** Card de dor "Planilhas impossíveis"  
**Parâmetros Flux:**
```
aspect_ratio: 3:4
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Close-up overhead shot of a laptop screen showing a messy disorganized spreadsheet 
with hundreds of rows, cells filled with crossed out names highlighted in red and 
yellow, inconsistent data formatting, multiple colors indicating different statuses 
without clear system, visible scrollbar showing how much more data exists below, 
the laptop is surrounded by handwritten sticky notes with phone numbers, a coffee 
mug with cold coffee, scattered business cards, disorganized workspace suggesting 
overwhelm and manual chaos, cold fluorescent office lighting, desaturated teal-gray 
color grade, editorial photography style, shallow depth of field, no readable text 
or real data visible, conveys the pain of manual CRM management, 
professional photography quality
```

---

### I-07 — Dor 3: Chatbot Robótico Rejeitado
**Arquivo:** `pain-chatbot-generic.webp`  
**Uso:** Card de dor "IA robótica afasta leads"  
**Parâmetros Flux:**
```
aspect_ratio: 3:4
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Close-up of a smartphone screen showing a chat conversation with an obviously 
robotic automated chatbot, the bot message reads generic error-like text suggesting 
misunderstanding, clean white clinical chat interface contrasting with the message 
content, the screen is held in human hands (only hands visible) with thumb moving 
away in gesture of dismissal and frustration, background is blurred dark office 
setting, cold harsh white light from the screen illuminating the hands, 
desaturated color grade with emphasis on cold clinical white of the interface, 
the composition suggests rejection and lost customer, professional editorial 
photography, f/1.8 equivalent bokeh, no readable text
```

---

### I-08 — Dor 4: Pipeline Vazio
**Arquivo:** `pain-empty-pipeline.webp`  
**Uso:** Card de dor "Sem pipeline, sem previsão"  
**Parâmetros Flux:**
```
aspect_ratio: 3:4
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Close-up of a dark mode dashboard screen on a monitor showing empty Kanban columns 
with zero cards, empty states with ghost placeholder text in each column reading 
"no leads here", a flat zero revenue line chart in the corner, the monitor sits on 
a desk in a dimly lit office at night, the glow from the empty dark screen 
illuminates the desk in a cold blue light, a coffee cup and scattered papers in the 
blurred foreground, the scene communicates emptiness and business uncertainty, 
dramatic chiaroscuro lighting, deep shadows in room corners, desaturated except for 
the blue screen glow, cinematic and moody, editorial photography quality, f/2.8 bokeh
```

---

## PRODUTO — MOCKUPS DE UI (S04 · Demo Visual)

---

### I-09 — Mockup: WhatsApp Conversation Screen
**Arquivo:** `mockup-whatsapp.webp`  
**Uso:** Frame inicial da Demo — lead chegando no WhatsApp  
**Parâmetros Flux:**
```
aspect_ratio: 9:16
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Ultra-realistic dark mode mobile messaging app interface screenshot, premium design 
quality, conversation view showing an incoming message from a contact named "Maria", 
the message bubble reads indistinct blurred text suggesting a business inquiry, 
deep dark background #0A0F1E, message bubbles in dark navy #1E2940 for received 
and electric blue #3B82F6 for sent, clean modern typography, timestamp showing 
seconds ago, subtle animated typing indicator with three bouncing dots visible, 
read receipt double blue check marks, contact avatar showing initials "M" in a 
green circle, status bar at top showing signal and battery, bottom input bar with 
mic and attachment icons, the interface looks like a premium WhatsApp Business 
clone in dark mode, extremely high fidelity, pixel perfect, UI/UX design quality, 
professional product screenshot aesthetic, no real recognizable app UI, 
original design inspired by modern chat interfaces
```

---

### I-10 — Mockup: IA Respondendo (Agent Screen)
**Arquivo:** `mockup-ai-agent.webp`  
**Uso:** Frame da Demo — IA Comercial processando e respondendo  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Premium dark mode CRM split-screen interface, left half shows a chat conversation 
with a typing indicator of three animated dots pulsing in a dark bubble, right half 
shows an elegant AI agent status panel with a flowing neural network visualization 
in electric blue and violet, the neural network shows nodes connecting with light 
pulses indicating AI processing, agent name "Sofia — Atendimento" displayed with 
status "respondendo..." in green, a progress bar showing response generation, 
model name badge showing "Groq — Llama 3.3 70B" in small monospace font, 
background #080D1A with glowing accent elements, glass card effect with 
backdrop-filter blur appearance, ultra clean typography, professional UI design 
quality, inspired by Linear.app design system, dark premium SaaS aesthetic, 
no real brand logos, pixel-perfect interface design
```

---

### I-11 — Mockup: Funil Kanban
**Arquivo:** `mockup-kanban.webp`  
**Uso:** Frame da Demo — lead sendo movido no funil  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Premium dark mode Kanban board interface in a CRM software, five columns labeled 
"Novo", "Qualificado", "Proposta", "Negociação", "Fechado" from left to right, 
each column showing stacked cards with contact names initials-avatars and deal 
values in Brazilian Reais format "R$ 1.200", the leftmost column has more cards 
indicating fresh leads, rightmost Fechado column shows green success indicators, 
cards use dark navy #0F1629 background with colored left border accents, tags 
visible on some cards like "Clínica" in violet and "Urgente" in amber, 
column totals shown at top of each column in small green text, drag-and-drop 
handle icons visible, clean card shadow separation, background #080D1A, 
vertical scrollbar visible on taller columns, overall layout feels premium and 
organized, inspired by Linear.app issue tracker, SaaS product screenshot quality, 
ultra detailed and pixel-perfect UI
```

---

### I-12 — Mockup: Calendário/Agenda
**Arquivo:** `mockup-calendar.webp`  
**Uso:** Frame da Demo — agendamento automático  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Premium dark mode calendar scheduling application interface, week view layout 
showing Monday through Friday with time slots from 8am to 6pm, a new event card 
"Consulta — Maria" appearing in Tuesday 14:00–15:00 slot in electric blue #3B82F6 
with a soft glow, a green "Confirmado" badge on the event, a Google Calendar sync 
indicator in corner, other events already scheduled in varying accent colors, 
time grid with subtle horizontal lines, left sidebar showing mini month calendar, 
right panel showing event details with contact info, Google Meet link in teal, 
notification bell icon, dark background #080D1A, glass card effects, clean 
typography Inter font, professional SaaS scheduling product aesthetic, 
pixel-perfect UI design quality, no real brand logos visible, inspired by modern 
calendar apps but original dark mode design
```

---

### I-13 — Mockup: Dashboard Overview
**Arquivo:** `mockup-dashboard.webp`  
**Uso:** Frame final da Demo — dashboard completo com métricas  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Premium dark mode CRM analytics dashboard, full screen layout with sidebar 
navigation on the left, main content showing multiple data visualization widgets: 
top row with four metric cards showing "Leads hoje: 12 ↑", "Conversas ativas: 7", 
"Agendamentos: 3", "Receita pipeline: R$ 14.200 ↑" each with colored icons and 
trend arrows in green, center section showing a line chart of lead conversion 
over 30 days in electric blue with green area fill, right column showing a 
mini Kanban summary and recent activity feed with avatar icons and timestamps, 
bottom section showing a bar chart of lead origins, all data presented with 
premium glassmorphism cards on dark #080D1A background, sidebar with logo and 
navigation icons with hover states, clean spacing and typography hierarchy, 
professional SaaS analytics quality, inspired by Vercel analytics and Linear, 
pixel-perfect and ultra detailed, no readable real data
```

---

## LIFESTYLE — ANTES / DEPOIS (S11)

---

### I-14 — ANTES: Workspace Caótico
**Arquivo:** `lifestyle-before.webp`  
**Uso:** Painel esquerdo do comparativo Antes/Depois  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Cinematic wide shot of a chaotic small business workspace at night, messy wooden 
desk covered in overlapping sticky notes with handwritten phone numbers and names, 
three smartphones simultaneously displaying notification badges and unread alerts, 
an open laptop showing a disorganized spreadsheet with red highlighted cells, 
scattered business cards, a cold coffee mug, crumpled receipts, pen marks on 
notepad, the overall lighting is harsh overhead fluorescent mixed with blue screen 
glow creating unflattering cold light, deep shadows in room corners creating 
oppressive atmosphere, the scene is slightly overexposed on the screens suggesting 
visual noise and overstimulation, no people visible, purely environmental storytelling, 
desaturated color grade leaning cool blue-gray, film noir influence, 
editorial photography quality, wide 35mm lens perspective, 
communicates chaos stress and lost revenue
```

---

### I-15 — DEPOIS: Workspace Organizado
**Arquivo:** `lifestyle-after.webp`  
**Uso:** Painel direito do comparativo Antes/Depois  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Cinematic wide shot of an elegant minimal home office workspace during golden hour, 
clean uncluttered desk with warm wood surface, a single large ultrawide monitor 
showing a beautiful dark mode CRM dashboard with green metrics and organized Kanban 
board, a single smartphone face-down (calls handled by AI), a premium notebook 
closed indicating no manual work needed, small succulent plant, clean coffee mug, 
professional wireless keyboard, the lighting is a warm golden hour sun from a 
large window on the left creating beautiful side lighting, warm amber and electric 
blue from the monitor combining into a sophisticated atmosphere, the room feels 
calm, controlled, prosperous and modern, rich warm color grade with blue accent 
from screen, inspired by high-end commercial photography for tech brands, 
35mm lens wide perspective, sharp focus, communicates control success and freedom, 
no people visible, purely environmental
```

---

## CASES POR VERTICAL (S12)

---

### I-16 — Case: Clínica / Saúde
**Arquivo:** `case-clinic.webp`  
**Uso:** Card de case study — vertical saúde  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Premium medical clinic reception area, modern and minimalist interior design with 
white and soft blue color scheme, a sleek dark mode tablet mounted on reception desk 
showing an organized appointment calendar fully booked with green status indicators, 
soft natural light from large windows creating clean clinical atmosphere, fresh 
flowers in a vase, clean surfaces, professional medical branding elements subtly 
visible, the tablet screen shows blurred appointment schedules and patient flow 
metrics, no staff faces visible, the scene communicates organization efficiency 
and professional healthcare, commercial interior photography style, warm daylight 
mixed with cool clinical ambient, 50mm lens perspective, sharp focus on tablet 
with room in gentle bokeh, premium healthcare brand aesthetic
```

---

### I-17 — Case: Imobiliária
**Arquivo:** `case-realestate.webp`  
**Uso:** Card de case study — vertical imóveis  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Elegant real estate agency office, large floor-to-ceiling windows showing city 
skyline in background, modern contemporary interior with wood and glass finishes, 
a large presentation screen on the wall showing a dark mode property catalog with 
property cards displaying prices and status badges, a laptop on a glass desk showing 
a lead pipeline Kanban, property brochures neatly arranged, a premium coffee machine 
in background, professional warm corporate lighting from overhead and natural window 
light, the scene communicates success premium service and organized operations, 
commercial real estate brand photography quality, 35mm wide lens, 
no people faces visible, warm tones with electric blue screen accent
```

---

### I-18 — Case: Consultoria
**Arquivo:** `case-consulting.webp`  
**Uso:** Card de case study — vertical consultorias  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Modern consultant private office, dark wood and leather premium aesthetic, 
a large monitor showing a dark mode CRM pipeline with revenue forecast chart 
in green, a second smaller screen showing WhatsApp conversations being handled 
by AI with automated responses, a premium leather notebook open with structured 
notes, Mont Blanc pen, minimalist dark desk lamp creating focused downward 
warm light, bookshelves with business books in background creating depth, 
the scene communicates strategic intelligence organized systems and premium 
professional services, moody but optimistic color grade, warm amber and electric 
blue contrast, commercial photography quality for consulting firm, 85mm lens portrait 
perspective, no faces visible
```

---

### I-19 — Case: Agência Digital
**Arquivo:** `case-agency.webp`  
**Uso:** Card de case study — vertical agências  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Creative digital agency team workspace, open plan loft office with exposed brick 
and industrial metal elements mixed with modern tech, multiple large dark monitors 
showing different client dashboards — a multi-tenant agency panel with client cards 
MRR metrics and status indicators, whiteboards with post-it notes in background, 
standing desks with premium equipment, cool blue ambient LED lighting strips 
combined with warm bulb pendant lights creating creative agency atmosphere, 
plants adding warmth, the scene shows organized multi-client operations without 
showing faces, commercial photography for digital agency brand, wide 24mm lens 
capturing the full environment, vibrant electric blue and amber color palette, 
communicates scale creativity and systematic operations
```

---

### I-20 — Case: E-commerce / Varejo
**Arquivo:** `case-ecommerce.webp`  
**Uso:** Card de case study — vertical varejo  
**Parâmetros Flux:**
```
aspect_ratio: 4:3
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Modern e-commerce operations center, clean packing and fulfillment area with warm 
lighting, a mounted tablet showing WhatsApp conversations being answered 
automatically by AI with customer order updates and tracking information, shipping 
boxes neatly stacked in background, a laptop showing order management dashboard 
with green shipped status badges, barcode scanner on table, professional yet warm 
small business atmosphere, the scene communicates automated customer service 
and efficient operations, commercial photography for retail tech brand, 
warm amber light from windows, electric blue from screens, 35mm lens, 
no faces, communicates growth and efficiency
```

---

## ELEMENTOS ABSTRATOS E DECORATIVOS

---

### I-21 — Fluxo de Dados Abstrato
**Arquivo:** `abstract-dataflow.webp`  
**Uso:** Background da seção Automações e CTA Final  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Abstract digital art, thousands of glowing luminous particles flowing in curved 
organic streams through a deep black void, the streams originate from multiple 
scattered source points and converge toward a bright central luminous node, 
particle colors transition from electric blue #3B82F6 at origin points through 
violet #8B5CF6 mid-stream to pure white at convergence center, each stream has 
motion blur suggesting high velocity flow, individual particles visible at the 
edges with glow bloom halos, the overall composition is dynamic yet harmonious 
suggesting data converging into intelligence, inspired by Studio Drift data art 
and NASA space photography, deep rich blacks with no light pollution except the 
streams, the image should feel infinite and vast, generative art aesthetic, 
4K ultra detailed, seamlessly composable as background
```

---

### I-22 — Rede Neural / IA Abstrata
**Arquivo:** `abstract-neural-network.webp`  
**Uso:** Background da seção IA e Agentes  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Abstract visualization of an artificial neural network in three-dimensional space, 
dozens of glowing spherical nodes connected by luminous filament threads, nodes 
pulsing with electric blue and violet light suggesting active computation, 
connection threads vary in brightness indicating signal strength, the entire 
network floats in a deep indigo void, depth of field creates bokeh on distant 
nodes while foreground nodes are sharply detailed, a subtle golden light pulse 
travels along one highlighted path from input to output suggesting data processing, 
the composition has the nodes arranged in recognizable left-to-right input-hidden-
output layer structure but abstracted and beautiful, inspired by scientific 
visualization and generative art, no text no labels, pure visual representation 
of artificial intelligence, ultra detailed 8K render quality
```

---

### I-23 — Sistema Orbital / Integrações
**Arquivo:** `abstract-orbital-system.webp`  
**Uso:** Background da seção Integrações  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Abstract cosmic orbital system, a bright central star or planet in the center 
radiating electric blue energy, multiple concentric orbital rings at different 
distances each with small luminous satellites orbiting at different speeds, 
the orbital rings are thin glowing lines in soft blue and violet with a slight 
transparency, satellites are small glowing spheres of varying sizes and colors, 
motion blur trails behind faster inner satellites, the background is pure deep 
space black with a distant nebula suggesting blue and purple clouds at very low 
opacity, the entire scene feels like both astronomy and technology, could represent 
a solar system or a technology integration ecosystem, no text, abstract and majestic, 
inspired by NASA Hubble imagery and data visualization art, 4K ultra detail, 
the central node should feel powerful and magnetic
```

---

### I-24 — Crescimento e Sucesso Abstrato
**Arquivo:** `abstract-growth-success.webp`  
**Uso:** Background da seção Métricas / Prova Social  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Abstract representation of exponential growth, multiple glowing ascending lines 
and bar charts in three-dimensional space, colors transitioning from deep blue 
at the base to bright emerald green #10B981 at the peaks, the charts are made of 
light and energy rather than solid objects, they float in a dark blue-black void, 
smaller data particles orbit around the chart peaks celebrating their heights, 
a prominent upward arrow shape formed by converging light beams dominates the 
upper right quadrant, the whole composition radiates optimism success and momentum, 
no text no numbers visible, pure abstract feeling of business success and 
measurable growth, inspired by Bloomberg data visualization and generative art, 
warm green and cool blue contrast, 8K quality
```

---

### I-25 — Segurança / Escudo
**Arquivo:** `abstract-security-shield.webp`  
**Uso:** Background ou elemento visual da seção Segurança/LGPD  
**Parâmetros Flux:**
```
aspect_ratio: 1:1
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Elegant abstract shield emblem floating in dark void, the shield is constructed 
from luminous geometric lines forming a hexagonal shield shape with internal 
structural patterns, the lines glow electric blue and white suggesting force 
fields and digital protection, concentric rings of energy emanate from the shield 
suggesting layers of security, a small lock symbol in the center radiates golden 
light, the background is deep navy black with very subtle grid pattern at 2% 
opacity, the shield has a slight 3D perspective tilt showing depth, reflection 
of blue light on an imaginary floor surface below, corporate security aesthetic 
meets digital art, no text labels no company logos, abstract but immediately 
communicates protection and security, cybersecurity brand visual quality, 
8K ultra detailed render, inspired by premium cybersecurity brand aesthetics
```

---

## AVATARES — TESTIMONIALS (S13)

---

### I-26 — Avatar: Dona de Clínica
**Arquivo:** `avatar-clinic-owner.webp`  
**Parâmetros Flux:**
```
aspect_ratio: 1:1
megapixels: 0.25
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Professional corporate headshot portrait of a confident Brazilian woman in her 
late 30s, warm smile, wearing elegant white medical coat over professional 
business attire, dark soft background with subtle blue bokeh, three-quarter 
angle facing slightly toward camera, warm professional studio lighting from 
front-right key light, soft fill light on shadow side, hair pulled back neatly, 
minimal professional jewelry, conveys trust competence and warmth, 
high-end LinkedIn headshot quality, sharp focus on eyes, 85mm portrait lens 
compression, photorealistic, no text overlays
```

---

### I-27 — Avatar: Consultor de Vendas
**Arquivo:** `avatar-sales-consultant.webp`  
**Parâmetros Flux:**
```
aspect_ratio: 1:1
megapixels: 0.25
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Professional corporate headshot portrait of a confident Brazilian man in his 
early 40s, slight knowing smile, wearing premium dark suit with open collar 
white shirt, dark desaturated background with subtle electric blue rim light 
from behind, direct eye contact with camera, three-quarter portrait composition, 
professional studio key light with soft shadows, conveys strategic intelligence 
confidence and success in sales, high-end executive headshot quality, 
85mm portrait lens, photorealistic rendering, no text
```

---

### I-28 — Avatar: Fundadora de Agência
**Arquivo:** `avatar-agency-founder.webp`  
**Parâmetros Flux:**
```
aspect_ratio: 1:1
megapixels: 0.25
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Professional creative director headshot of a confident Brazilian woman in her 
early 30s, dynamic energetic expression, wearing modern business-casual blazer 
in dark color, creative agency office background softly blurred showing monitors 
and creative environment, slightly more casual than corporate, animated genuine 
smile, direct engaging eye contact, side-lit with warm creative studio lighting 
plus blue rim light from back, conveys creativity ambition and entrepreneurial 
spirit, premium LinkedIn profile photo quality, 85mm portrait, photorealistic
```

---

### I-29 — Avatar: Dono de Imobiliária
**Arquivo:** `avatar-real-estate.webp`  
**Parâmetros Flux:**
```
aspect_ratio: 1:1
megapixels: 0.25
output_quality: 95
num_outputs: 4
go_fast: true
```

**Prompt:**
```
Professional real estate agent headshot portrait of a confident Brazilian man 
in his late 40s, polished business smile, wearing premium dark suit with 
subtle tie, modern real estate office background blurred showing glass walls 
and property listings on screens, authoritative yet approachable expression, 
classic corporate portrait lighting from front with subtle window light side 
fill, conveys trustworthiness experience and real estate expertise, 
top-tier executive headshot photography quality, 85mm lens, photorealistic
```

---

## BACKGROUNDS DE SEÇÃO

---

### I-30 — Background: Seção Problema
**Arquivo:** `bg-problem-section.webp`  
**Uso:** Fundo da seção O Problema — deve ser mais pesado e opressivo  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 90
num_outputs: 2
go_fast: true
```

**Prompt:**
```
Abstract dark oppressive background texture, very deep near-black background 
#030410, subtle red-orange embers or sparks scattered at very low density 
suggesting problems and urgency, barely visible grid lines creating a cage-like 
geometric structure, strong vignette pulling all edges to pure black, 
center slightly lighter but still very dark, overall atmosphere of tension and 
constriction, no recognizable objects, pure abstract texture suitable as 
full-bleed section background, low contrast and subtle so text remains readable 
on top, dark editorial photographic texture quality
```

---

### I-31 — Background: Seção Benefícios
**Arquivo:** `bg-benefits-section.webp`  
**Uso:** Fundo neutro premium para a grade de 12 benefícios  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 90
num_outputs: 2
go_fast: true
```

**Prompt:**
```
Subtle premium dark technology texture background, deep navy #080D1A base color, 
extremely faint geometric hexagonal honeycomb pattern at 3% opacity suggesting 
technology and structure, very subtle gradient from slightly lighter center to 
darker edges, microscopic noise texture adding depth and film-like quality, 
no focal point, uniform and clean enough to layer content on top without 
competition, the texture should feel premium and technological without being 
distracting, similar to Linear.app or Vercel homepage background treatment, 
purely abstract and functional
```

---

### I-32 — Background: CTA Final (Hero Fechamento)
**Arquivo:** `bg-cta-final.webp`  
**Uso:** Background full-bleed do CTA Final — mais épico e aspiracional que o hero  
**Parâmetros Flux:**
```
aspect_ratio: 16:9
megapixels: 1
output_quality: 100
num_outputs: 4
go_fast: false
```

**Prompt:**
```
Epic abstract cinematic background, deep space darkness with a massive convergence 
event happening at center, thousands of tiny glowing particles representing 
conversations and messages streaming in from all directions toward a brilliant 
central point of light, as they converge the particles transform color from 
cool blue to warm emerald green suggesting conversion and success, the central 
convergence point radiates golden-white light illuminating the surrounding 
particle streams, the edges of the image fade to pure black void, the overall 
composition feels like witnessing something powerful and inevitable, 
an abundance of opportunity being captured and converted, epic scale matching 
closing cinematic shots of award-winning films, stunning 8K generative art quality, 
ultra detailed particle simulation aesthetic
```

---

---

# ════════════════════════════════════════
# PARTE 2 — KLING 2.5 TURBO PRO (VÍDEOS)
# ════════════════════════════════════════

## CONFIGURAÇÕES GLOBAIS KLING

```
Modelo: Kling 2.5 Turbo Pro
Output: MP4 H.264 ou H.265
FPS: 24fps (cinematic) ou 30fps (para product demos)
Resolução: 4K (3840×2160) quando possível, mínimo 1080p
Color space: Rec.709 com LUT aplicada no grade
Audio: Sem áudio (trilha será adicionada em pós-produção)
```

**Após gerar os vídeos, para conversão em frames:**
```bash
# Extrair frames em WebP (15fps para scroll animations)
ffmpeg -i video.mp4 -vf fps=15 -q:v 85 frame_%04d.webp

# Para sequências de alta qualidade (hero)
ffmpeg -i video.mp4 -vf fps=24 -compression_level 4 frame_%04d.webp
```

---

## V-01 — HERO: Loop Ambiental de Fluxo de Dados
**Arquivo:** `hero-ambient-loop.mp4`  
**Uso:** Background ambiental em loop no Hero  
**Specs:** 6s · seamless loop · 16:9 · sem pino de câmera

**Prompt Kling:**
```
Abstract ambient video loop, thousands of microscopic luminous particles flowing in 
slow organic curved streams through an infinite dark void, the particles drift from 
the far edges of frame toward a softly glowing convergence area at center-right, 
stream colors cycle between electric blue (#3B82F6) and violet (#8B5CF6) with 
occasional pure white bright particles punctuating the streams, each stream has 
very subtle speed variation creating organic breathing rhythm, long-exposure 
light-trail aesthetic where each particle leaves a glowing filament trail 10x its 
own length, the darkest areas are absolute black with zero ambient light 
contamination creating maximum contrast with the streams, overall composition 
resembles bioluminescent deep ocean creatures or aurora borealis in darkness, 
camera completely static — zero camera movement — pure particle motion only, 
extremely slow contemplative pace, motion blur on all moving elements, 
the loop point should be at frame 1 where stream density and position perfectly 
matches the end frame for seamless looping, color grade: deep crushed blacks, 
saturated cool highlights, cinematic LUT, 4K, 24fps, Anamorphic 2.39:1 letterbox bars
```

**Negative prompt:**
```
humans, text, UI elements, logos, camera movement, bright backgrounds, 
warm colors, green tones, stock footage aesthetic, cheap CGI
```

---

## V-02 — HERO: Caos para Controle (Principal)
**Arquivo:** `hero-chaos-to-control.mp4`  
**Uso:** Vídeo principal do Hero — narrativa de transformação  
**Specs:** 10s · não loop · 16:9 · movimento de câmera definido

**Frame inicial:** Smartphone com WhatsApp caótico em close extremo  
**Frame final:** Dashboard FlowIA completo e organizado em monitor

**Prompt Kling:**
```
Cinematic transformation sequence, 10 seconds total in two acts.

ACT 1 (0-4s): Extreme macro close-up of a modern smartphone held by unseen hands 
in a dimly lit environment, the screen fills 70% of frame showing a chaotic dark 
mode messaging app with dozens of overlapping unread badges in red, notifications 
piling up in real-time, the text is illegible blurred impressionism only — the 
feeling of overwhelming information is what matters, the phone emits harsh cold 
blue light that illuminates the hands and nearby surface with unflattering 
clinical glow, camera starts completely static then begins an extremely slow 
micro-dolly backward movement (barely perceptible), color grade: desaturated, 
pushed contrast, cold steel blue tones, slight film grain

TRANSITION (4-6s): Rack focus from the phone screen toward the background — 
the phone progressively blurs as the focus shifts backward, a warm golden-blue 
light begins to emerge from the background (the monitor), camera continues 
smooth dolly backward, the phone becomes an out-of-focus bokeh element

ACT 2 (6-10s): Focus resolves on a large premium monitor in the background 
showing the FlowIA dark mode CRM dashboard — perfectly organized, green metrics 
ascending, Kanban board full of cards, an AI conversation in progress with a 
warm typing indicator, the dashboard radiates a premium authoritative glow, 
camera continues slow dolly backward to reveal the full workspace which is 
clean minimal and aspirational, color grade shifts: warm amber from room lighting 
mixed with cool electric blue from monitor screen, saturated vibrant and hopeful

Camera movement: slow dolly backward 60cm total over 10 seconds, zero vertical 
movement, extremely stable — gimbal/dolly quality, not handheld
Lens: 85mm equivalent, wide open aperture f/1.8
Color grade: warm cinematic, telecine, film look LUT
4K 24fps, slight motion blur on transitions
```

---

## V-03 — PROBLEMA: Dores Fragmentadas (4 Micro-Loops)
**Arquivo:** `pain-01-whatsapp.mp4` / `pain-02-spreadsheet.mp4` / `pain-03-chatbot.mp4` / `pain-04-pipeline.mp4`  
**Uso:** Cards de dor na seção O Problema — cada vídeo em loop no seu card  
**Specs:** 4s cada · seamless loop · 3:4 (vertical) · 30fps

**Prompt V-03a — WhatsApp Caótico:**
```
Seamless loop video, extreme close-up of a smartphone screen in a darkened environment, 
the screen shows a messaging app with notification badges incrementing from large 
numbers, messages appearing and stacking without being answered, the unread counter 
badge pulses red with each new notification, the screen emits cold blue light onto 
the dark table surface beneath it, slight camera breathing (imperceptible zoom in and 
out 1%) simulating shallow breathing suggesting stress and anxiety, sound design absent, 
the loop: badges increment for 2 seconds, pause for 1 second showing the accumulated 
unread count, then smoothly reset to start, desaturated cold color grade, 
film grain overlay, cinematic and moody, 4K 30fps
```

**Prompt V-03b — Planilha Caótica:**
```
Seamless loop video, overhead close-up of a laptop screen on a messy desk, 
the screen shows a large chaotic spreadsheet with hundreds of rows, cells highlighted 
in red yellow and green without obvious system, data appearing blurred and illegible, 
a cursor moves erratically across cells highlighting one then another in confusion, 
surrounding the laptop are scattered papers sticky notes and business cards creating 
the impression of manual overload, harsh overhead lighting creating strong shadows 
beneath laptop screen, cold fluorescent color temperature, desaturated grade, 
loop point: cursor completes its confused journey and returns to start position, 
4K 30fps, editorial documentary aesthetic
```

**Prompt V-03c — Chatbot Rejeitado:**
```
Seamless loop video, close-up of a smartphone held in one hand, screen shows 
a chat conversation with a chatbot sending an obviously mechanical generic response 
(text blurred but tone clear from visual hierarchy), the hand holding the phone 
tilts slightly in a gesture of frustration and dismissal — thumb moving away from 
screen, slight head shake visible at frame edges (just hair movement no face), 
the motion is subtle: receive robotic response (0-2s), read it with growing 
disappointment suggested by hand micro-movements (2-3s), dismissive tilt gesture 
(3-4s), loop back to receiving the message, cold clinical white light from screen, 
desaturated grade, editorial handheld aesthetic, 4K 30fps
```

**Prompt V-03d — Pipeline Vazio:**
```
Seamless loop video, medium shot of a dark mode monitor screen on a desk showing 
an empty CRM dashboard — Kanban columns are empty with ghost placeholder text, 
a revenue chart shows a flat line at zero, notification center shows no activity, 
the monitor's blue-black glow illuminates an otherwise dark empty office desk, 
the screen blinks occasionally as it refreshes with still-empty data, 
a single desk lamp off to the side barely illuminates scattered papers and 
an empty coffee cup, loop: screen refreshes with loading animation then shows 
empty state again (cycle communicates waiting and emptiness), muted desaturated 
tones, cold blue from screen, atmospheric and melancholic, 4K 24fps, static camera
```

---

## V-04 — TRANSIÇÃO: Transformação de Orbs
**Arquivo:** `transition-orbs-transform.mp4`  
**Uso:** Seção Solução — orbs transitando de vermelho para azul  
**Specs:** 8s · não loop · 16:9 · câmera estática

**Prompt Kling:**
```
Abstract CGI visualization, four glowing orbs arranged in a perfect 2×2 grid 
floating in a deep black void with subtle smoke or atmosphere, each orb approximately 
1/6 of frame width in diameter.

PHASE 1 (0-2s): All four orbs are blood red-orange, surface flickering with 
irregular electrical arcs like unstable energy, they pulse erratically and 
asymmetrically at different rates suggesting chaos and malfunction, red light 
casts harsh red shadows on imaginary surfaces below them, the overall feeling 
is danger and instability

PHASE 2 (2-6s): A transformation begins — starting from the top-left orb and 
cascading diagonally: each orb's core temperature changes from red to deep blue 
to electric blue (#3B82F6), the surface arcs smooth from erratic to rhythmic 
and regular, the flickering becomes a steady confident pulse like a heartbeat, 
the transformation should feel like watching a star's temperature change or 
a chemical reaction completing, blue light gradually replaces red light illuminating 
the surrounding space

PHASE 3 (6-8s): All four orbs now pulse in perfect synchronized rhythm in electric 
blue and violet, their surfaces are smooth and controlled, they have a magnetic 
relationship — the space between them shows connecting energy threads, 
volumetric light rays radiate upward from each orb, the transformation complete 
is visually satisfying and hopeful

Camera: completely static, centered composition, slight wide-angle lens, 
colored lighting illuminates imaginary floor plane below orbs, 
color grade: rich blacks, saturated neons, cinematic, 4K 24fps
```

---

## V-05 — DEMO STEP 1: Lead Chegando no WhatsApp
**Arquivo:** `demo-step-01-whatsapp.mp4`  
**Uso:** Frame-by-frame da Demo — passo 1  
**Specs:** 6s · não loop · 9:16 · câmera definida

**Prompt Kling:**
```
Product demo video, portrait orientation 9:16, showing a premium dark mode 
messaging application on a smartphone screen in close-up product photography style.

The sequence (6 seconds):
0-1s: Phone screen shows quiet empty chat, cursor blinks in input field, 
      ambient blue light from screen on dark surface
1-2s: A new message notification arrives with a subtle ping visual animation — 
      a small notification banner drops from top of screen with contact name 
      "Maria" and preview text blurred, the badge counter appears on the app icon
2-4s: The conversation opens showing Maria's incoming message in a dark navy bubble 
      on the left side of screen, message arrives with the standard instant messaging 
      entrance animation (slide in from left, slight opacity fade-in), the message 
      text is blurred beyond readability but the layout is clearly a business inquiry
4-5.5s: Three typing indicator dots appear on the right side of the conversation 
        (AI is about to respond) — the dots pulse with a satisfying rhythmic animation 
        in the signature electric blue color
5.5-6s: Freeze/hold on the typing indicator state for loop or next frame

Camera: static overhead shot of phone on dark surface, phone in center frame, 
50mm equivalent, sharp focus on screen, surface in very soft bokeh, 
backlit rim light on phone edges in electric blue, 
premium product photography studio aesthetic, matte dark surface reflection
Color grade: near-black background, electric blue as dominant accent from screen glow
4K 30fps for smooth frame extraction
```

---

## V-06 — DEMO STEP 2: IA Processando e Respondendo
**Arquivo:** `demo-step-02-ai-response.mp4`  
**Uso:** Frame-by-frame da Demo — passo 2  
**Specs:** 8s · não loop · 16:9

**Prompt Kling:**
```
Premium product demo video, landscape 16:9, split-screen composition 
(40% left / 60% right).

LEFT PANEL — WhatsApp conversation:
Shows the continuation from previous step: typing indicator (three blue dots) 
animating for 2 seconds, then a warm well-written response message appears 
bubble-by-bubble from top to bottom of the response (as if being typed in real time), 
the response includes a friendly emoji at the start, the text appears character 
by character or word by word in a natural typing rhythm, NOT all at once, 
final message has a subtle "sent" animation, 
overall feeling: intelligent warm personalized human-like response from AI

RIGHT PANEL — AI Agent Status Dashboard:
A sleek dark mode panel showing the AI agent "Sofia" at work:
- Agent name "Sofia — Comercial" with an avatar circle showing initials
- Status badge reading "Gerando resposta..." with a small animated spinner in blue
- A subtle flowing neural network visualization: 5-6 interconnected glowing nodes 
  with light pulses traveling between them (the pulses should be fast and numerous 
  during generation, then slow down as the response completes)
- A small token counter incrementing rapidly during generation
- When response is complete (around 6s mark): status changes to "Enviado ✓" in green, 
  neural network pulses slow to resting rhythm, a small satisfaction indicator appears

DIVIDING LINE: a subtle 1px glowing line separates the two panels

Camera: completely static, studio product shot
Color grade: deep dark, electric blue dominant, green accents on success states
4K 30fps
```

---

## V-07 — DEMO STEP 3: Card Movendo no Kanban
**Arquivo:** `demo-step-03-kanban.mp4`  
**Uso:** Frame-by-frame da Demo — passo 3  
**Specs:** 6s · não loop · 16:9

**Prompt Kling:**
```
Cinematic product demo, overhead isometric perspective of a premium dark mode 
Kanban board displayed on a large monitor screen.

The board shows 4 columns: "Novo" / "Qualificado" / "Proposta" / "Fechado"
Each column has 2-3 dark navy card stacked with minimal information visible.

The 6-second sequence:
0-1s: Static view of the board with a specific card in "Novo" column highlighted 
      with a subtle blue glow, the card is labeled "Maria — R$ 800" 
1-2s: The highlighted card slowly lifts from its column — a subtle elevation 
      animation (card raises 8px, shadow deepens dramatically beneath it, 
      a ghost placeholder appears in the original position)
2-4s: The card glides smoothly horizontally from "Novo" to "Qualificado" column, 
      leaving a brief luminous motion trail in electric blue, 
      the movement follows a slight arc (not perfectly horizontal — 
      it rises slightly in the middle of the journey), 
      intermediate columns "illuminate" as the card passes over them
4-5s: Card drops into "Qualificado" column with a satisfying magnetic snap, 
      a small green confirmation pulse radiates from the landing position, 
      the column total counter at the top of the column increments with a 
      number flip animation, the ghost placeholder in "Novo" fades away
5-6s: The entire board gently pulses once in celebration, 
      settling back to its organized state with the card in its new home

Camera: overhead bird's eye static, monitor fills frame, 
the Kanban board fills 80% of the monitor screen
Color grade: deep dark, electric blue card accent, green success, premium
4K 30fps for frame extraction
```

---

## V-08 — DEMO STEP 4: Agendamento Automático
**Arquivo:** `demo-step-04-calendar.mp4`  
**Uso:** Frame-by-frame da Demo — passo 4  
**Specs:** 6s · não loop · 16:9

**Prompt Kling:**
```
Premium product demo video, close-up of a dark mode calendar application 
displayed on a monitor, week view showing Monday through Friday.

The 6-second sequence:
0-1.5s: Calendar view loads with several existing events in various columns, 
        Tuesday 14:00 slot is visibly empty (ghost placeholder visible), 
        a loading/processing indicator appears briefly at top of screen

1.5-3s: A new event card materializes in the Tuesday 14:00 slot using a 
         bloom animation — it starts as a small bright dot of electric blue light 
         and expands outward to fill the event slot, the event card reads 
         "Consulta — Maria" in clean white text, the animation should feel 
         like the calendar slot is being filled by energy crystallizing into form

3-4s: A green "Confirmado" badge animates onto the event card from right edge, 
      simultaneously a Google Calendar logo briefly appears in the top bar with 
      a sync animation (spinning circle completing) and a small check mark 
      confirming external calendar sync

4-5.5s: Camera gently pushes in toward the newly created event, the event glows 
        with satisfied green, a Meet link icon appears below the event title 
        with a brief materialization animation

5.5-6s: The full calendar settles showing the organized week view 
        with the new appointment perfectly in place

Camera: slight slow push-in during the sequence, starting medium and ending 
closer on the event card, very slow and subtle — barely perceptible
Color grade: dark professional, electric blue new event, green confirmations
4K 30fps
```

---

## V-09 — DEMO STEP 5: Dashboard com Métricas Subindo
**Arquivo:** `demo-step-05-dashboard.mp4`  
**Uso:** Frame-by-frame da Demo — passo final  
**Specs:** 8s · não loop · 16:9

**Prompt Kling:**
```
Cinematic product reveal, a premium dark mode analytics dashboard materializes 
on a large ultra-wide monitor, the reveal happens progressively from left to right 
as if the dashboard is loading or being unveiled.

The sequence (8 seconds):
0-2s: Screen is dark, then a loading progress bar sweeps from left to right 
      as the dashboard data loads, individual UI sections appear one by one: 
      first the sidebar navigation, then the header, then the metric cards

2-5s: The four metric cards at top animate in stagger (300ms between each):
      Card 1: "Leads hoje" counter counts from 0 to 12 with upward green arrow
      Card 2: "Conversas ativas" counter goes 0 to 7 with blue activity indicator
      Card 3: "Agendamentos" counter goes 0 to 3 with calendar icon pulsing
      Card 4: "Pipeline" counter goes 0 to R$14.200 with prominent green upward trend
      Each card "locks" into its final value with a satisfying micro-animation

5-7s: The main line chart in the center draws itself from left to right over 2 seconds — 
      a line of electric blue rises from lower left to upper right showing growth, 
      a green fill area animates beneath the line following its drawing path, 
      data point dots pop in at key milestones with small sparkle animations

7-8s: The camera very slowly pulls back from close to medium shot revealing 
      the full scope of the organized dashboard — the full picture of control 
      and business intelligence made visible, the final frame shows everything 
      working in harmony

Camera: starts close (80% of monitor fills frame), pulls back to show 
the monitor and a bit of its premium environment, very smooth and slow
Color grade: deep dark background, electric blue data, emerald green success metrics
4K 24fps for cinematic feel
```

---

## V-10 — SETUP: Conectando WhatsApp (QR Code)
**Arquivo:** `setup-qr-connection.mp4`  
**Uso:** Como Funciona — Step 1  
**Specs:** 6s · não loop · 16:9

**Prompt Kling:**
```
Clean minimal product demonstration video, a dark mode setup screen on a monitor 
shows a QR code in the center of the interface, surrounded by the message 
"Conecte seu WhatsApp" in clean white typography, the QR code is rendered as 
glowing electric blue lines on dark background rather than traditional black/white.

Sequence (6 seconds):
0-2s: The setup screen is visible, QR code centered, a subtle scanning animation 
      pulses over the QR code (horizontal blue scanning line moving top to bottom 
      repeatedly suggesting it's waiting to be scanned)

2-3.5s: A smartphone appears from the bottom-right of frame, held by unseen hands, 
         the phone camera interface visible on screen as it approaches the QR code 
         on the monitor, the phone's camera focuses on the QR code

3.5-4.5s: The QR code is scanned — a green checkmark animation explodes from the 
           center of the QR code outward, the scanning animation stops, 
           the monitor screen transitions to a success state

4.5-6s: The monitor screen shows a success message with a large animated checkmark 
        in green, a WhatsApp icon with green connected status badge appears, 
        text "WhatsApp Conectado com sucesso!" with satisfying animation, 
        the smartphone in the foreground shows a connection confirmed screen too

Camera: static medium shot, monitor fills center, 
smartphone enters from bottom-right corner
Color grade: dark premium, electric blue to green transition on success
4K 24fps
```

---

## V-11 — AGENTES: Comparativo IA Robótica vs FlowIA
**Arquivo:** `agents-comparison.mp4`  
**Uso:** Seção Agentes de IA — demonstração comparativa  
**Specs:** 10s · não loop · 16:9 · split screen

**Prompt Kling:**
```
High contrast split-screen comparison video, strict vertical center divider line.

LEFT HALF — BEFORE (Generic Chatbot):
Cold clinical white background (unusual for dark theme — makes it feel sterile), 
a messaging interface showing a bot response: mechanical, all caps, 
no personalization, error messages and numbered menu options, 
response appears instantly (no typing indicator — unnervingly fast), 
red warning triangles and error icons visible, the customer's follow-up message 
appears confused and frustrated, second bot response is equally robotic and unhelpful, 
labels at top: "CHATBOT GENÉRICO" in small red text
Color temperature: cold white, blue-white, clinical, sterile

RIGHT HALF — AFTER (FlowIA Agent "Sofia"):
Dark premium interface with warm AI agent avatar circle showing "S" for Sofia, 
a natural delay before response (typing indicator with three dots for 2 seconds — 
showing the AI is "thinking"), then a warm personalized message arrives with 
a friendly emoji, proper punctuation, the customer's follow-up gets another 
thoughtful response that shows contextual memory (references previous message), 
a small "Qualificado" status badge updates automatically on the contact panel, 
labels at top: "AGENTE FLOWTIA" in small green text
Color temperature: warm dark, amber, electric blue accents

CENTER DIVIDER: a thin luminous white-blue vertical line with subtle glow

Timeline: messages exchange in real-time synced across both halves 
showing simultaneous contrasting experiences
Color grade: cold desaturated left, warm rich dark right
4K 24fps
```

---

## V-12 — KANBAN: Card Sendo Fechado (Celebração)
**Arquivo:** `kanban-deal-closed.mp4`  
**Uso:** Seção CRM/Funil — jornada completa do pipeline  
**Specs:** 10s · não loop · 16:9

**Prompt Kling:**
```
Cinematic product celebration video, overhead aerial view of a premium dark mode 
Kanban board displayed on a monitor or as floating interface.

Full journey (10 seconds):
0-2s: Wide view showing all 5 pipeline columns with cards in various stages, 
      the board is organized and full of active deals, 
      one specific card in "Novo" column glows with a brighter blue suggesting 
      our focus lead

2-4s: The focus card ("Maria — Clínica — R$ 2.400") begins its journey — 
      lifts slightly with dramatic shadow, glides from "Novo" through 
      "Qualificado" and "Proposta" at an accelerated cinematic pace, 
      each column it passes illuminates briefly in electric blue, 
      a comet-like light trail follows the card's path

4-6s: Card arrives at "Fechado" column with maximum impact: 
      a radial burst of green light energy emanates from landing point, 
      the card transforms from blue to celebration green, 
      a large "✓" checkmark materializes on the card with a draw animation, 
      "R$ 2.400" value glows prominently in gold

6-8s: The entire board responds to the success — a gentle green pulse wave 
      radiates outward from the "Fechado" column across the whole board, 
      particle sparks of green and gold shoot upward from the card, 
      the "Fechado" column total counter increments with a bold flip animation, 
      a "Pipeline total" counter visible at top of board increases significantly

8-10s: Slow pull-back reveal of the full organized board in its celebratory state, 
       the atmosphere shifts to triumphant and prosperous, 
       green light warmly illuminates the scene

Camera: starts overhead close, maintains overhead as card moves, 
slow pullback at celebration, virtual camera dolly
Color grade: dark with electric blue → green celebration
4K 24fps, slight motion blur on card movement
```

---

## V-13 — WORKFLOW: Automação Visual
**Arquivo:** `automation-workflow.mp4`  
**Uso:** Seção Automações — workflow se construindo  
**Specs:** 8s · seamless loop opcional · 16:9

**Prompt Kling:**
```
Abstract technical visualization video, a workflow automation diagram builds 
itself progressively in a dark void space.

The diagram consists of 5 connected nodes arranged horizontally 
(left to right workflow):
Node 1 - Trigger: Speech bubble icon (incoming message)
Node 2 - Condition: Diamond/fork icon (time elapsed)  
Node 3 - Action: Envelope icon (send follow-up)
Node 4 - Action: Kanban card icon (update pipeline stage)
Node 5 - Result: Checkmark in circle (conversion achieved)

Build sequence (0-5s):
Each node appears with a pop/bloom animation from nothing, 
then a connecting arrow draws itself from the right side of that node 
to the left side of the next node (DrawSVG style animation), 
stagger timing: 1s per node + connector, nodes are electric blue glowing 
circles, connector arrows are thin luminous lines with arrowheads

Active state (5-8s or loop):
Once fully built, data particles (small bright dots) travel along the 
connector paths from left to right in a continuous stream, 
the whole workflow breathes with a gentle synchronized pulse, 
each node flashes briefly as a "packet" passes through it, 
node 5 (result) emits a small celebration green flash each time a 
particle completes the journey

Camera: completely static, wide shot, diagram centered in frame, 
nodes and connectors use only the horizontal center third of the frame 
leaving dark void above and below
Color grade: deep black void, electric blue nodes, white-blue connectors, 
green success flashes
4K 24fps
```

---

## V-14 — ANTES: Workspace Caótico (Cinematic)
**Arquivo:** `before-workspace-cinematic.mp4`  
**Uso:** Painel esquerdo do comparativo Antes/Depois  
**Specs:** 6s · loop suave · 16:9

**Prompt Kling:**
```
Cinematic slow documentary video, wide shot of a chaotic small business workspace 
captured at night with only screen glow and a single overhead lamp.

Scene contents:
- Wooden desk completely covered in sticky notes with handwritten phone numbers
- Three smartphones simultaneously displaying red notification badges (47, 23, 11)
- One phone is visibly buzzing/vibrating (subtle table shake)
- An open laptop with a disorganized spreadsheet full of red cells
- Scattered business cards, crumpled papers, pens without caps
- A cold coffee mug with old coffee ring stain on a notepad
- Overhead lamplight creating harsh shadows beneath objects

Camera movement: extremely slow almost imperceptible push-in 
(starting at 100% and ending at 103% zoom over 6 seconds), 
the slowness creates a documentary/observational quality, 
no handheld shake — gimbal perfectly stable but with that micro-zoom

The phones' screens increment their notification numbers during the video: 
badges go from 47→49, 23→24, 11→13 (subtle real-time accumulation of missed leads)

Color grade: severely desaturated (almost black and white), 
pushed to near-monochrome with only the red notification badges retaining 
their red color for emphasis, harsh cold light, deep shadows, oppressive
4K 24fps
```

---

## V-15 — DEPOIS: Workspace Organizado (Cinematic)
**Arquivo:** `after-workspace-cinematic.mp4`  
**Uso:** Painel direito do comparativo Antes/Depois  
**Specs:** 6s · loop suave · 16:9

**Prompt Kling:**
```
Cinematic commercial video, wide shot of an aspirational minimal home office workspace 
during golden hour transitioning to evening — the perfect mix of warm natural light 
and cool monitor glow.

Scene contents:
- Clean uncluttered white oak desk with generous empty surface
- A single large ultrawide monitor showing the FlowIA dashboard with green 
  metrics and organized data (clearly labeled as the controlled resolution 
  of all previous chaos)
- One smartphone face-down and silent (AI is handling communication)
- A premium leather notebook, closed and unused
- A small succulent plant in a concrete planter
- A modern clean coffee mug with fresh coffee (steam visible)
- A wireless keyboard and trackpad perfectly positioned
- A window to the left with golden sunset light streaming in

Camera movement: gentle slow push-in over 6 seconds (100%→104%), 
ending closer on the monitor to subtly emphasize the dashboard 
as the source of all this calm, perfectly stable

Color grade: warm amber from sunset + cool electric blue from monitor 
creating a sophisticated bicolor atmosphere, fully saturated and rich, 
skin tones warm (even though no people visible the warm light feels welcoming), 
the grade should feel like a premium lifestyle advertisement for a tech brand
4K 24fps
```

---

## V-16 — CASOS: Clínica com Dashboard
**Arquivo:** `case-clinic-video.mp4`  
**Uso:** Card de case Clínica — loop ambiental  
**Specs:** 6s · seamless loop · 4:3

**Prompt Kling:**
```
Elegant medical clinic aesthetic product placement video, 
a warm modern reception area with natural light from large windows, 
white and light blue interior design with clean lines.

Focus: a sleek dark mode tablet mounted on reception desk pedestal showing 
a fully booked appointment calendar in green (all slots filled), 
a WhatsApp conversations panel showing messages being answered automatically 
with "✓✓" read receipts, a notification showing "3 novos agendamentos hoje"

The ambient is calm and organized — everything is under control.

Movement: very gentle parallax/drift from left to right (±3 degrees tilt 
over 6 seconds creating subtle 3D depth feel), no camera cut, continuous

Color grade: warm daylight white balance, cream and blue medical palette, 
electric blue accent from tablet screen, the scene communicates 
patient trust and professional healthcare management

The video should feel like a premium medical device or healthcare SaaS advertisement, 
aspirational and trustworthy
4K 24fps loop
```

---

## V-17 — MÉTRICAS: Crescimento em Tempo Real
**Arquivo:** `metrics-growth.mp4`  
**Uso:** Background/hero da seção Prova Social  
**Specs:** 8s · seamless loop · 16:9

**Prompt Kling:**
```
Abstract data visualization ambient loop video, a three-dimensional space 
showing real-time business metrics materializing and updating.

Visual elements:
- Large ascending bar charts growing from bottom to top, 
  bars made of stacked glowing block particles in emerald green (#10B981)
- Multiple line chart paths drawing themselves across the space, 
  trending upward from lower-left to upper-right in electric blue
- Floating number counters incrementing continuously: 
  "2.300+" conversations, "94%" satisfaction, "47%" conversion uplift
- When a metric hits a milestone, a brief firework-like particle burst 
  in gold emanates from that counter
- The metrics float at various depths in the dark space creating layered depth
- All moving at slightly different speeds and phases creating organic rhythm

Camera: very slow drift moving slightly to the right and slightly upward 
over 8 seconds, then seamlessly looping, creating the sense of ascending 
through an infinite space of metrics

Color grade: deep black void, emerald green data, electric blue trend lines, 
gold celebration bursts, white counter text
4K 24fps, subtle motion blur on fastest-moving elements
```

---

## V-18 — INTEGRAÇÕES: Sistema Orbital
**Arquivo:** `integrations-orbital.mp4`  
**Uso:** Seção Integrações — logos orbitando  
**Specs:** 10s · seamless loop · 16:9

**Prompt Kling:**
```
Abstract cosmic technology visualization, an orbital system representing 
connected software integrations.

Central node: A bright luminous sphere approximately 1/8 of frame width, 
glowing with electric blue core and violet outer corona, emitting periodic 
pulse waves outward like a pulsar

Orbital ring 1 (inner, fast): 3 small glowing satellites orbiting at a 
relatively fast pace (one full orbit in ~4 seconds), satellites are colored 
geometric shapes: green hexagon, blue circle, teal square — representing 
WhatsApp, Asaas, and Google Calendar

Orbital ring 2 (middle, medium): 4 satellites at medium distance, slower orbit 
(6 seconds/orbit), different geometric forms in electric blue and violet, 
representing Groq AI, Supabase, Uazapi, Apify

Orbital ring 3 (outer, slow): 3 satellites at outer distance, very slow orbit 
(10 seconds/orbit), larger and more prominent, in blue-white, 
representing Meta, Stripe, Google

All orbital rings are visible as thin glowing lines in the respective plane, 
orbital inclinations vary slightly (not perfectly flat — some are at 10-15 degrees) 
creating 3D depth, satellites leave brief glowing trails as they orbit, 
energy threads briefly connect adjacent satellites when they pass close to each other

Camera: extremely slow rotation of the entire composition (full rotation in 60s, 
so barely perceptible over 10s), creating depth perspective shift
Background: absolute deep space black, very faint blue-violet nebula at 5% opacity
4K 30fps for smooth rotation, slight motion blur on orbital trails
```

---

## V-19 — AGÊNCIA: Painel Multi-cliente
**Arquivo:** `agency-panel.mp4`  
**Uso:** Seção Painel Agência — demo de impersonation  
**Specs:** 10s · não loop · 16:9

**Prompt Kling:**
```
Premium product demonstration video showing multi-tenant agency management.

PHASE 1 (0-3s): Wide shot of a sophisticated agency dashboard on a large monitor, 
showing a grid of client cards — each card displays a different business name 
with status indicators (green "Ativo", amber "Trial"), MRR values, and 
activity metrics, the dashboard has a dark premium aesthetic with sidebar 
navigation, a global revenue total "MRR Total: R$ 8.940" prominently displayed 
at top with upward trend arrow, the scene suggests scale and organized management

PHASE 2 (3-5s): A cursor moves to one specific client card "Clínica Vida" 
and hovers, the card elevates slightly on hover with a glow, 
a tooltip appears: "Entrar como cliente", cursor clicks

PHASE 3 (5-7s): A magnificent portal/warp transition — the screen does a 
circular iris wipe transition zooming into the client card, which expands 
to fill the screen revealing the interior of that client's CRM dashboard, 
the transition should feel premium and deliberate like a magic door opening, 
subtle lens distortion at the transition peak

PHASE 4 (7-10s): The client dashboard is now visible in full — 
a different CRM with that client's data, leads, and conversations, 
a prominent amber banner at the top reads "Modo Agência — Clínica Vida", 
suggesting the agency is safely viewing the client's account, 
the camera slowly pulls back to frame the full dashboard

Color grade: dark navy agency dashboard, vibrant multi-colored client cards, 
the transition uses a brilliant electric blue flash, client dashboard warmer 
4K 24fps, premium cinematic finish
```

---

## V-20 — CTA FINAL: Conversas Virando Oportunidades
**Arquivo:** `cta-final-epic.mp4`  
**Uso:** Background do CTA Final — épico e aspiracional  
**Specs:** 12s · seamless loop · 16:9

**Prompt Kling:**
```
Epic cinematic ambient loop video representing business opportunity and abundance.

The scene is a magnificent abstract space:

FIRST ACT (0-4s): From the edges and corners of the frame, tiny glowing 
speech bubble particles begin to appear and drift inward — hundreds of them, 
each carrying an implied conversation (microscopic impressionistic text fragments: 
"Oi, quanto custa?", "Quero saber sobre...", "Me fala mais" — all intentionally 
too small and blurred to actually read), the particles are electric blue 
and violet, they move with purpose toward the center of the frame, 
streams of them form like tributaries joining rivers, the space feels vast 
and full of incoming opportunity

SECOND ACT (4-8s): As the particle streams converge toward center, 
a magnificent transformation occurs — the blue-violet particles change color 
as they reach the convergence zone: they transition to warm emerald green (#10B981) 
and gold as they transform from "conversation" to "opportunity", 
the convergence point emits pulses of warm green light, 
the transforming particles begin to take the shape of deal cards or checkmarks 
(abstract/impressionistic, not literal UI), the abundance of transformation 
is overwhelming and beautiful

THIRD ACT (8-12s): The final state — a rich ongoing flow of transformation 
in full progress, blue streams entering from all sides, green abundance 
radiating from center, the whole scene breathes with prosperity, 
this 4-second final state is the loop point (end seamlessly connects to start)

Camera: no movement — the dynamic energy of the particles is the motion, 
absolutely static camera
Color grade: deep void blacks, saturated electric blue input streams, 
rich warm emerald green output abundance, gold conversion sparks at peak moments
4K 24fps, heavy motion blur on all particle movement for long-exposure effect, 
final render should feel like award-winning generative art
```

---

## V-21 — HERO SECUNDÁRIO: Produto Flutuando (Loop)
**Arquivo:** `hero-product-float.mp4`  
**Uso:** Mockup flutuante no Hero — loop animado  
**Specs:** 6s · seamless loop · 4:3

**Prompt Kling:**
```
Product showcase video, an elegant dark mode CRM dashboard displayed on a 
minimalist frameless monitor floating in a dark premium environment.

The monitor floats above a reflective surface that mirrors its glow, 
multiple conversations and Kanban updates happening in real-time on the screen 
(new message notification briefly appears, a card slides in the kanban, 
a metric counter increments).

FLOATING ANIMATION: The monitor performs a gentle continuous float — 
it moves upward 15px over 3 seconds, then returns to starting position 
over 3 seconds, creating a perpetual levitation effect. 
Simultaneously a very subtle rotation: ±2 degrees tilt left/right synced 
with the float (up = slight left tilt, down = slight right tilt) 
creating a breathing/living quality.

The monitor's screen reflects in the surface below it, 
the reflection distorts slightly with the floating movement.
Rim lighting: thin electric blue outline on monitor edges from backlight.
Atmosphere: pure dark void background with a very subtle radial gradient 
of dark navy at center fading to pure black at edges.

This is a seamless loop: at 6s the position and tilt exactly matches 0s.

Color grade: dark premium void, electric blue accent, screen content 
predominantly blue-green, warm ambient light fill from slightly below 
suggesting physical environment
4K 30fps for smooth loop extraction
```

---

## V-22 — PROVA SOCIAL: Ambiente de Sucesso
**Arquivo:** `social-proof-ambient.mp4`  
**Uso:** Background ou intro da seção Métricas/Testimonials  
**Specs:** 6s · seamless loop · 16:9

**Prompt Kling:**
```
Abstract ambient loop video evoking business success and social validation.

A dark elegant space with three abstract elements:

ELEMENT 1: A large glowing five-star rating visualization floating at left-center — 
five stars in warm gold filling in left to right with a satisfying shine animation 
that loops, each star emitting a subtle golden bloom when it lights

ELEMENT 2: At center-right, a counter reading "4.9/5.0" in large premium typography 
with a subtle breathing scale animation (1.0x → 1.01x), beneath it a smaller 
"127 avaliações" text in secondary color

ELEMENT 3: A gentle cascade of small card-like shapes representing testimonials 
rising slowly from the bottom of the frame and fading out at the top, 
each card is an indistinct soft rectangle suggesting a review card, 
very subtle and background-like, not distracting from the main elements

The entire composition has a warm gold and deep dark aesthetic suggesting 
trust achievement and excellence.

Camera: completely static
Color grade: deep rich blacks, warm gold for ratings, electric blue for numbers, 
the overall temperature is warmer than other videos — more human and trustworthy
4K 24fps seamless loop
```

---

## CHECKLIST DE PRODUÇÃO

### FLUX Schnell — Ordem de Geração Recomendada

**Alta prioridade (gerar primeiro — usados nas seções acima do fold):**
- [ ] I-01 Hero Background Principal
- [ ] I-04 Hero Product Environment
- [ ] I-09 Mockup WhatsApp
- [ ] I-11 Mockup Kanban
- [ ] I-13 Mockup Dashboard

**Média prioridade:**
- [ ] I-05 a I-08 (Cards de dor)
- [ ] I-14 e I-15 (Antes/Depois)
- [ ] I-21 a I-24 (Abstratos)
- [ ] I-10 e I-12 (Mockups restantes)

**Baixa prioridade (apoio):**
- [ ] I-16 a I-20 (Cases verticais)
- [ ] I-26 a I-29 (Avatares)
- [ ] I-02, I-03 (Overlays hero)
- [ ] I-30 a I-32 (Backgrounds de seção)

---

### Kling 2.5 — Ordem de Geração Recomendada

**Críticos (bloqueiam implementação):**
- [ ] V-01 Hero Ambient Loop
- [ ] V-02 Hero Chaos to Control
- [ ] V-20 CTA Final Epic

**Alta prioridade (seção Demo):**
- [ ] V-05 Demo Step 1
- [ ] V-06 Demo Step 2
- [ ] V-07 Demo Step 3
- [ ] V-08 Demo Step 4
- [ ] V-09 Demo Step 5

**Média prioridade:**
- [ ] V-03a/b/c/d Problema (4 micro-loops)
- [ ] V-11 Comparativo IA
- [ ] V-12 Kanban Celebração
- [ ] V-19 Agência Panel

**Demais:**
- [ ] V-04 Transformação Orbs
- [ ] V-10 Setup QR
- [ ] V-13 Workflow Automações
- [ ] V-14 e V-15 Lifestyle
- [ ] V-16 a V-18 Cases
- [ ] V-21 e V-22 Loops auxiliares

---

## DICAS DE QUALIDADE

### Para FLUX Schnell
- Gere sempre `num_outputs: 4` e curate a melhor
- Se o resultado não estiver bom, adicione no final do prompt: `, award-winning photography, editorial quality, featured on Behance`
- Para mockups de UI: sempre inclua `no readable text, blurred interface text, UI elements only as visual impression`
- Para pessoas: sempre inclua `no faces visible` ou `only hands visible` para evitar rostos distorcidos
- Para melhorar coerência com o design system: mencione sempre as cores em hex junto dos nomes

### Para Kling 2.5 Turbo Pro
- Seja muito específico no camera movement — câmeras vagas resultam em moves imprevisíveis
- Para loops: o último frame deve descrever exatamente o estado que existe no primeiro frame
- Para product demos: sempre mencione "dark mode interface" e "premium SaaS aesthetic"
- Use "4K" e "cinematic grade" para elevar a qualidade
- Para motion blur desejado: "heavy motion blur" ou "long-exposure effect"
- Negative prompt sempre inclua: `stock footage aesthetic, cheap CGI, watermark, text overlays, jarring cuts`

---

*Documento de assets — FlowIA Landing Page Premium*  
*Total: 32 imagens (FLUX) + 22 vídeos (Kling) = 54 assets de produção*  
*Junho 2026*