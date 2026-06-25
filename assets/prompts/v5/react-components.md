# NV5 — Componentes React (38)

## Design System
| ID | Componente | Path |
|----|------------|------|
| NV5-R-001 | DesignTokensProvider | `components/providers/TokensProvider.tsx` |
| NV5-R-002 | ButtonPrimary | `components/ui/ButtonPrimary.tsx` |
| NV5-R-003 | ButtonGhost | `components/ui/ButtonGhost.tsx` |
| NV5-R-004 | MagneticButton | `components/motion/MagneticButton.tsx` |
| NV5-R-005 | TiltCard | `components/motion/TiltCard.tsx` |
| NV5-R-006 | DepthStage | `components/motion/DepthStage.tsx` |
| NV5-R-007 | VideoLayer | `components/motion/VideoLayer.tsx` |
| NV5-R-008 | FrameScrubber | `components/motion/FrameScrubber.tsx` |
| NV5-R-009 | ParticleField | `components/motion/ParticleField.tsx` |
| NV5-R-010 | DataRiver | `components/motion/DataRiver.tsx` |

## UI Golden (produto legível)
| ID | Componente | Seção |
|----|------------|-------|
| NV5-R-011 | UIWhatsAppChat | S04, S07 |
| NV5-R-012 | UIAgentPanel | S04, S06 |
| NV5-R-013 | UIKanbanBoard | S04, S08 |
| NV5-R-014 | UICalendarView | S04 |
| NV5-R-015 | UIDashboard | S04, S08 |
| NV5-R-016 | UIInboxThreeCol | S07 |
| NV5-R-017 | UIWorkflowCanvas | S09 |
| NV5-R-018 | UIAgencyTenants | S15 |
| NV5-R-019 | UIPricingCards | S17 |
| NV5-R-020 | FAQAccordion | S18 |

## Seções (wrappers)
| ID | Componente |
|----|------------|
| NV5-R-021 | SectionHero S01 |
| NV5-R-022 | SectionProblem S02 |
| NV5-R-023 | SectionBridge S03 |
| NV5-R-024 | SectionDemo S04 |
| NV5-R-025 | SectionSetup S05 |
| NV5-R-026 | SectionAgents S06 |
| NV5-R-027 | SectionInbox S07 |
| NV5-R-028 | SectionFunnel S08 |
| NV5-R-029 | SectionAutomation S09 |
| NV5-R-030 | SectionBenefits S10 |
| NV5-R-031 | SectionBeforeAfter S11 |
| NV5-R-032 | SectionCases S12 |
| NV5-R-033 | SectionSocial S13 |
| NV5-R-034 | SectionIntegrations S14 |
| NV5-R-035 | SectionAgency S15 |
| NV5-R-036 | SectionSecurity S16 |
| NV5-R-037 | SectionPricing S17 |
| NV5-R-038 | SectionCTA S19 |

## GSAP hooks
- `lib/gsap/register.ts` — plugins Club + matchMedia
- `lib/gsap/master-timeline.ts`
- `lib/gsap/motion-system.ts` — BUILD/PEAK/EXIT
- `hooks/useScrollAct.ts`
- `hooks/useGsapContext.ts`
