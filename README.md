# KORUVISION Landing (versão simples)

Landing page leve da KORUVISION — hero cinematográfico, seção problema (caos operacional), pilares da plataforma, features, prova social, planos e CTA.

## Stack

- Next.js 15 (App Router)
- React 19
- GSAP + ScrollTrigger
- Lenis (scroll suave)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Estrutura principal

| Caminho | Descrição |
|---------|-----------|
| `app/page.tsx` | Rota raiz — renderiza `SimpleLanding` |
| `landing-page-simples/` | Componentes e estilos da landing simples |
| `sections/OwlChaosFlow.tsx` | Fluxo unificado coruja → problema |
| `public/assets/nv11/` | Imagens, vídeos e sequências F2F |

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Por padrão, vídeos loop ficam desativados (`NEXT_PUBLIC_ENABLE_VIDEO=false`) para carregamento mais rápido.
