#!/usr/bin/env python3
"""Gera assets de imagem FlowIA via FLUX Schnell (Replicate REST API)."""

import json
import os
import sys
import time
from pathlib import Path
from urllib.request import Request, urlopen

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "assets" / "images"
MODEL = "black-forest-labs/flux-schnell"
API_BASE = "https://api.replicate.com/v1"

DEFAULT_NUM_OUTPUTS = 1

ASSETS = [
    {
        "id": "I-01",
        "file": "hero-bg-glow.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Abstract dark technology background, ultra deep navy void #03060F, massive radial "
            "glow emanating from top center, electric blue #3B82F6 core bleeding into violet "
            "#8B5CF6 at the edges, atmospheric volumetric light shafts descending vertically, "
            "perspective grid lines converging toward a vanishing point at the bottom third, "
            "grid made of extremely thin luminous cyan lines at 4% opacity, noise grain texture "
            "overlay for depth and film-like quality, multiple subtle bokeh orbs scattered at "
            "various depths creating dimensional layering, dark vignette at all four corners "
            "pulling focus to center glow, no text, no UI elements, no people, pure abstract "
            "cinematic technology aesthetic, inspired by Linear.app and Stripe homepage aesthetics, "
            "ultra high resolution, 8K quality, photorealistic lighting, professional art direction"
        ),
    },
    {
        "id": "I-02",
        "file": "hero-particles.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 90,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Abstract particle constellation field on pure black background, hundreds of tiny "
            "luminous dots of varying sizes arranged in organic clusters and flowing streams, "
            "colors ranging from bright white to electric blue #3B82F6 to soft violet #8B5CF6, "
            "particles connected by ultra-thin filament lines at very low opacity creating a "
            "neural network or constellation map effect, some particles with soft glow bloom "
            "halos, particles denser toward the upper center and sparser at edges, bokeh blur "
            "on distant particles creating depth of field effect, no background color only pure "
            "black so it can be used as overlay, reminiscent of stars in deep space or synaptic "
            "connections, abstract and beautiful, minimalist and precise, 8K detail"
        ),
    },
    {
        "id": "I-03",
        "file": "hero-noise-texture.webp",
        "aspect_ratio": "1:1",
        "megapixels": 0.25,
        "output_quality": 100,
        "num_outputs": 1,
        "go_fast": True,
        "prompt": (
            "Pure film grain texture, fine analog noise, monochromatic gray tones, cinematic 16mm "
            "film grain texture tile, seamlessly tileable, uniform distribution of noise particles, "
            "no patterns no shapes no objects, only pure photographic grain texture, high contrast "
            "grain suitable for overlay blending, similar to Kodak Portra film grain, the texture "
            "should appear neutral gray with grain variation, professional texture asset"
        ),
    },
    {
        "id": "I-04",
        "file": "hero-product-env.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Isometric 3D render of a sleek ultra-modern dark mode software dashboard floating "
            "in a dark void, slight 30-degree isometric perspective, the interface shows a CRM "
            "inbox with three panels: left sidebar with conversation list showing notification "
            "badges, center chat panel with clean dark bubbles and typing indicator, right panel "
            "with contact details and Kanban stage indicator, the screen glows with electric blue "
            "and green UI elements, multiple soft layered drop shadows beneath the device creating "
            "elevation sense, thin rim light outlining the device edges in electric blue, "
            "background is deep navy #03060F with a subtle glow halo behind the device, interface "
            "text is blurred and illegible for privacy, purely visual impression of a premium "
            "dark mode SaaS product, inspired by Linear.app and Vercel design language, "
            "hyperrealistic render, studio lighting, 8K quality, no text readable, "
            "professional product photography composition"
        ),
    },
    {
        "id": "I-05",
        "file": "pain-whatsapp-chaos.webp",
        "aspect_ratio": "3:4",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Close-up macro photography of a smartphone screen in a dim room, screen showing "
            "a dark mode messaging app with dozens of unanswered messages stacked vertically, "
            "red unread badge showing notifications, blue message delivery ticks without "
            "read receipts, messages from different contacts piling up with timestamps showing "
            "hours ago and yesterday, the phone lies on a wooden surface with other scattered "
            "items, dramatic single side light from the left creating strong shadows, "
            "desaturated moody color grade leaning toward cold blue-gray, the image communicates "
            "stress overwhelm and chaos, cinematic documentary photography style, shallow depth "
            "of field f/2.8 equivalent, sharp focus on the screen with background softly blurred, "
            "no faces visible, no readable text on screen, evocative of missed business opportunities, "
            "professional editorial photography quality"
        ),
    },
    {
        "id": "I-06",
        "file": "pain-spreadsheet-chaos.webp",
        "aspect_ratio": "3:4",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Close-up overhead shot of a laptop screen showing a messy disorganized spreadsheet "
            "with hundreds of rows, cells filled with crossed out names highlighted in red and "
            "yellow, inconsistent data formatting, multiple colors indicating different statuses "
            "without clear system, visible scrollbar showing how much more data exists below, "
            "the laptop is surrounded by handwritten sticky notes with phone numbers, a coffee "
            "mug with cold coffee, scattered business cards, disorganized workspace suggesting "
            "overwhelm and manual chaos, cold fluorescent office lighting, desaturated teal-gray "
            "color grade, editorial photography style, shallow depth of field, no readable text "
            "or real data visible, conveys the pain of manual CRM management, "
            "professional photography quality"
        ),
    },
    {
        "id": "I-07",
        "file": "pain-chatbot-generic.webp",
        "aspect_ratio": "3:4",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Close-up of a smartphone screen showing a chat conversation with an obviously "
            "robotic automated chatbot, the bot message reads generic error-like text suggesting "
            "misunderstanding, clean white clinical chat interface contrasting with the message "
            "content, the screen is held in human hands (only hands visible) with thumb moving "
            "away in gesture of dismissal and frustration, background is blurred dark office "
            "setting, cold harsh white light from the screen illuminating the hands, "
            "desaturated color grade with emphasis on cold clinical white of the interface, "
            "the composition suggests rejection and lost customer, professional editorial "
            "photography, f/1.8 equivalent bokeh, no readable text"
        ),
    },
    {
        "id": "I-08",
        "file": "pain-empty-pipeline.webp",
        "aspect_ratio": "3:4",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Close-up of a dark mode dashboard screen on a monitor showing empty Kanban columns "
            "with zero cards, empty states with ghost placeholder text in each column, "
            "a flat zero revenue line chart in the corner, the monitor sits on "
            "a desk in a dimly lit office at night, the glow from the empty dark screen "
            "illuminates the desk in a cold blue light, a coffee cup and scattered papers in the "
            "blurred foreground, the scene communicates emptiness and business uncertainty, "
            "dramatic chiaroscuro lighting, deep shadows in room corners, desaturated except for "
            "the blue screen glow, cinematic and moody, editorial photography quality, f/2.8 bokeh"
        ),
    },
    {
        "id": "I-09",
        "file": "mockup-whatsapp.webp",
        "aspect_ratio": "9:16",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Ultra-realistic dark mode mobile messaging app interface screenshot, premium design "
            "quality, conversation view showing an incoming message from a contact named Maria, "
            "the message bubble reads indistinct blurred text suggesting a business inquiry, "
            "deep dark background #0A0F1E, message bubbles in dark navy #1E2940 for received "
            "and electric blue #3B82F6 for sent, clean modern typography, timestamp showing "
            "seconds ago, subtle animated typing indicator with three bouncing dots visible, "
            "read receipt double blue check marks, contact avatar showing initials M in a "
            "green circle, status bar at top showing signal and battery, bottom input bar with "
            "mic and attachment icons, the interface looks like a premium WhatsApp Business "
            "clone in dark mode, extremely high fidelity, pixel perfect, UI/UX design quality, "
            "professional product screenshot aesthetic, no real recognizable app UI, "
            "original design inspired by modern chat interfaces"
        ),
    },
    {
        "id": "I-10",
        "file": "mockup-ai-agent.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Premium dark mode CRM split-screen interface, left half shows a chat conversation "
            "with a typing indicator of three animated dots pulsing in a dark bubble, right half "
            "shows an elegant AI agent status panel with a flowing neural network visualization "
            "in electric blue and violet, the neural network shows nodes connecting with light "
            "pulses indicating AI processing, agent name Sofia Atendimento displayed with "
            "status respondendo in green, a progress bar showing response generation, "
            "model name badge in small monospace font, "
            "background #080D1A with glowing accent elements, glass card effect with "
            "backdrop-filter blur appearance, ultra clean typography, professional UI design "
            "quality, inspired by Linear.app design system, dark premium SaaS aesthetic, "
            "no real brand logos, pixel-perfect interface design, blurred interface text"
        ),
    },
    {
        "id": "I-11",
        "file": "mockup-kanban.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Premium dark mode Kanban board interface in a CRM software, five columns labeled "
            "Novo, Qualificado, Proposta, Negociacao, Fechado from left to right, "
            "each column showing stacked cards with contact names initials-avatars and deal "
            "values in Brazilian Reais format, the leftmost column has more cards "
            "indicating fresh leads, rightmost Fechado column shows green success indicators, "
            "cards use dark navy #0F1629 background with colored left border accents, tags "
            "visible on some cards like Clinica in violet and Urgente in amber, "
            "column totals shown at top of each column in small green text, drag-and-drop "
            "handle icons visible, clean card shadow separation, background #080D1A, "
            "vertical scrollbar visible on taller columns, overall layout feels premium and "
            "organized, inspired by Linear.app issue tracker, SaaS product screenshot quality, "
            "ultra detailed and pixel-perfect UI, blurred text"
        ),
    },
    {
        "id": "I-12",
        "file": "mockup-calendar.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Premium dark mode calendar scheduling application interface, week view layout "
            "showing Monday through Friday with time slots from 8am to 6pm, a new event card "
            "Consulta Maria appearing in Tuesday 14:00 slot in electric blue #3B82F6 "
            "with a soft glow, a green Confirmado badge on the event, a calendar sync "
            "indicator in corner, other events already scheduled in varying accent colors, "
            "time grid with subtle horizontal lines, left sidebar showing mini month calendar, "
            "right panel showing event details with contact info, Meet link in teal, "
            "notification bell icon, dark background #080D1A, glass card effects, clean "
            "typography Inter font, professional SaaS scheduling product aesthetic, "
            "pixel-perfect UI design quality, no real brand logos visible, inspired by modern "
            "calendar apps but original dark mode design, blurred text"
        ),
    },
    {
        "id": "I-13",
        "file": "mockup-dashboard.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Premium dark mode CRM analytics dashboard, full screen layout with sidebar "
            "navigation on the left, main content showing multiple data visualization widgets: "
            "top row with four metric cards showing leads today, conversas ativas, "
            "agendamentos, receita pipeline each with colored icons and "
            "trend arrows in green, center section showing a line chart of lead conversion "
            "over 30 days in electric blue with green area fill, right column showing a "
            "mini Kanban summary and recent activity feed with avatar icons and timestamps, "
            "bottom section showing a bar chart of lead origins, all data presented with "
            "premium glassmorphism cards on dark #080D1A background, sidebar with logo and "
            "navigation icons with hover states, clean spacing and typography hierarchy, "
            "professional SaaS analytics quality, inspired by Vercel analytics and Linear, "
            "pixel-perfect and ultra detailed, blurred interface text"
        ),
    },
    {
        "id": "I-14",
        "file": "lifestyle-before.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Cinematic wide shot of a chaotic small business workspace at night, messy wooden "
            "desk covered in overlapping sticky notes with handwritten phone numbers and names, "
            "three smartphones simultaneously displaying notification badges and unread alerts, "
            "an open laptop showing a disorganized spreadsheet with red highlighted cells, "
            "scattered business cards, a cold coffee mug, crumpled receipts, pen marks on "
            "notepad, the overall lighting is harsh overhead fluorescent mixed with blue screen "
            "glow creating unflattering cold light, deep shadows in room corners creating "
            "oppressive atmosphere, the scene is slightly overexposed on the screens suggesting "
            "visual noise and overstimulation, no people visible, purely environmental storytelling, "
            "desaturated color grade leaning cool blue-gray, film noir influence, "
            "editorial photography quality, wide 35mm lens perspective, "
            "communicates chaos stress and lost revenue"
        ),
    },
    {
        "id": "I-15",
        "file": "lifestyle-after.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Cinematic wide shot of an elegant minimal home office workspace during golden hour, "
            "clean uncluttered desk with warm wood surface, a single large ultrawide monitor "
            "showing a beautiful dark mode CRM dashboard with green metrics and organized Kanban "
            "board, a single smartphone face-down (calls handled by AI), a premium notebook "
            "closed indicating no manual work needed, small succulent plant, clean coffee mug, "
            "professional wireless keyboard, the lighting is a warm golden hour sun from a "
            "large window on the left creating beautiful side lighting, warm amber and electric "
            "blue from the monitor combining into a sophisticated atmosphere, the room feels "
            "calm, controlled, prosperous and modern, rich warm color grade with blue accent "
            "from screen, inspired by high-end commercial photography for tech brands, "
            "35mm lens wide perspective, sharp focus, communicates control success and freedom, "
            "no people visible, purely environmental"
        ),
    },
    {
        "id": "I-16",
        "file": "case-clinic.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Premium medical clinic reception area, modern and minimalist interior design with "
            "white and soft blue color scheme, a sleek dark mode tablet mounted on reception desk "
            "showing an organized appointment calendar fully booked with green status indicators, "
            "soft natural light from large windows creating clean clinical atmosphere, fresh "
            "flowers in a vase, clean surfaces, professional medical branding elements subtly "
            "visible, the tablet screen shows blurred appointment schedules and patient flow "
            "metrics, no staff faces visible, the scene communicates organization efficiency "
            "and professional healthcare, commercial interior photography style, warm daylight "
            "mixed with cool clinical ambient, 50mm lens perspective, sharp focus on tablet "
            "with room in gentle bokeh, premium healthcare brand aesthetic"
        ),
    },
    {
        "id": "I-17",
        "file": "case-realestate.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Elegant real estate agency office, large floor-to-ceiling windows showing city "
            "skyline in background, modern contemporary interior with wood and glass finishes, "
            "a large presentation screen on the wall showing a dark mode property catalog with "
            "property cards displaying prices and status badges, a laptop on a glass desk showing "
            "a lead pipeline Kanban, property brochures neatly arranged, a premium coffee machine "
            "in background, professional warm corporate lighting from overhead and natural window "
            "light, the scene communicates success premium service and organized operations, "
            "commercial real estate brand photography quality, 35mm wide lens, "
            "no people faces visible, warm tones with electric blue screen accent"
        ),
    },
    {
        "id": "I-18",
        "file": "case-consulting.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Modern consultant private office, dark wood and leather premium aesthetic, "
            "a large monitor showing a dark mode CRM pipeline with revenue forecast chart "
            "in green, a second smaller screen showing WhatsApp conversations being handled "
            "by AI with automated responses, a premium leather notebook open with structured "
            "notes, Mont Blanc pen, minimalist dark desk lamp creating focused downward "
            "warm light, bookshelves with business books in background creating depth, "
            "the scene communicates strategic intelligence organized systems and premium "
            "professional services, moody but optimistic color grade, warm amber and electric "
            "blue contrast, commercial photography quality for consulting firm, 85mm lens portrait "
            "perspective, no faces visible"
        ),
    },
    {
        "id": "I-19",
        "file": "case-agency.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Creative digital agency team workspace, open plan loft office with exposed brick "
            "and industrial metal elements mixed with modern tech, multiple large dark monitors "
            "showing different client dashboards — a multi-tenant agency panel with client cards "
            "MRR metrics and status indicators, whiteboards with post-it notes in background, "
            "standing desks with premium equipment, cool blue ambient LED lighting strips "
            "combined with warm bulb pendant lights creating creative agency atmosphere, "
            "plants adding warmth, the scene shows organized multi-client operations without "
            "showing faces, commercial photography for digital agency brand, wide 24mm lens "
            "capturing the full environment, vibrant electric blue and amber color palette, "
            "communicates scale creativity and systematic operations"
        ),
    },
    {
        "id": "I-20",
        "file": "case-ecommerce.webp",
        "aspect_ratio": "4:3",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Modern e-commerce operations center, clean packing and fulfillment area with warm "
            "lighting, a mounted tablet showing WhatsApp conversations being answered "
            "automatically by AI with customer order updates and tracking information, shipping "
            "boxes neatly stacked in background, a laptop showing order management dashboard "
            "with green shipped status badges, barcode scanner on table, professional yet warm "
            "small business atmosphere, the scene communicates automated customer service "
            "and efficient operations, commercial photography for retail tech brand, "
            "warm amber light from windows, electric blue from screens, 35mm lens, "
            "no faces, communicates growth and efficiency"
        ),
    },
    {
        "id": "I-21",
        "file": "abstract-dataflow.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Abstract digital art, thousands of glowing luminous particles flowing in curved "
            "organic streams through a deep black void, the streams originate from multiple "
            "scattered source points and converge toward a bright central luminous node, "
            "particle colors transition from electric blue #3B82F6 at origin points through "
            "violet #8B5CF6 mid-stream to pure white at convergence center, each stream has "
            "motion blur suggesting high velocity flow, individual particles visible at the "
            "edges with glow bloom halos, the overall composition is dynamic yet harmonious "
            "suggesting data converging into intelligence, inspired by Studio Drift data art "
            "and NASA space photography, deep rich blacks with no light pollution except the "
            "streams, the image should feel infinite and vast, generative art aesthetic, "
            "4K ultra detailed, seamlessly composable as background"
        ),
    },
    {
        "id": "I-22",
        "file": "abstract-neural-network.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Abstract visualization of an artificial neural network in three-dimensional space, "
            "dozens of glowing spherical nodes connected by luminous filament threads, nodes "
            "pulsing with electric blue and violet light suggesting active computation, "
            "connection threads vary in brightness indicating signal strength, the entire "
            "network floats in a deep indigo void, depth of field creates bokeh on distant "
            "nodes while foreground nodes are sharply detailed, a subtle golden light pulse "
            "travels along one highlighted path from input to output suggesting data processing, "
            "the composition has the nodes arranged in recognizable left-to-right input-hidden-"
            "output layer structure but abstracted and beautiful, inspired by scientific "
            "visualization and generative art, no text no labels, pure visual representation "
            "of artificial intelligence, ultra detailed 8K render quality"
        ),
    },
    {
        "id": "I-23",
        "file": "abstract-orbital-system.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Abstract cosmic orbital system, a bright central star or planet in the center "
            "radiating electric blue energy, multiple concentric orbital rings at different "
            "distances each with small luminous satellites orbiting at different speeds, "
            "the orbital rings are thin glowing lines in soft blue and violet with a slight "
            "transparency, satellites are small glowing spheres of varying sizes and colors, "
            "motion blur trails behind faster inner satellites, the background is pure deep "
            "space black with a distant nebula suggesting blue and purple clouds at very low "
            "opacity, the entire scene feels like both astronomy and technology, could represent "
            "a solar system or a technology integration ecosystem, no text, abstract and majestic, "
            "inspired by NASA Hubble imagery and data visualization art, 4K ultra detail, "
            "the central node should feel powerful and magnetic"
        ),
    },
    {
        "id": "I-24",
        "file": "abstract-growth-success.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Abstract representation of exponential growth, multiple glowing ascending lines "
            "and bar charts in three-dimensional space, colors transitioning from deep blue "
            "at the base to bright emerald green #10B981 at the peaks, the charts are made of "
            "light and energy rather than solid objects, they float in a dark blue-black void, "
            "smaller data particles orbit around the chart peaks celebrating their heights, "
            "a prominent upward arrow shape formed by converging light beams dominates the "
            "upper right quadrant, the whole composition radiates optimism success and momentum, "
            "no text no numbers visible, pure abstract feeling of business success and "
            "measurable growth, inspired by Bloomberg data visualization and generative art, "
            "warm green and cool blue contrast, 8K quality"
        ),
    },
    {
        "id": "I-25",
        "file": "abstract-security-shield.webp",
        "aspect_ratio": "1:1",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Elegant abstract shield emblem floating in dark void, the shield is constructed "
            "from luminous geometric lines forming a hexagonal shield shape with internal "
            "structural patterns, the lines glow electric blue and white suggesting force "
            "fields and digital protection, concentric rings of energy emanate from the shield "
            "suggesting layers of security, a small lock symbol in the center radiates golden "
            "light, the background is deep navy black with very subtle grid pattern at 2% "
            "opacity, the shield has a slight 3D perspective tilt showing depth, reflection "
            "of blue light on an imaginary floor surface below, corporate security aesthetic "
            "meets digital art, no text labels no company logos, abstract but immediately "
            "communicates protection and security, cybersecurity brand visual quality, "
            "8K ultra detailed render, inspired by premium cybersecurity brand aesthetics"
        ),
    },
    {
        "id": "I-26",
        "file": "avatar-clinic-owner.webp",
        "aspect_ratio": "1:1",
        "megapixels": 0.25,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Professional corporate headshot portrait of a confident Brazilian woman in her "
            "late 30s, warm smile, wearing elegant white medical coat over professional "
            "business attire, dark soft background with subtle blue bokeh, three-quarter "
            "angle facing slightly toward camera, warm professional studio lighting from "
            "front-right key light, soft fill light on shadow side, hair pulled back neatly, "
            "minimal professional jewelry, conveys trust competence and warmth, "
            "high-end LinkedIn headshot quality, sharp focus on eyes, 85mm portrait lens "
            "compression, photorealistic, no text overlays"
        ),
    },
    {
        "id": "I-27",
        "file": "avatar-sales-consultant.webp",
        "aspect_ratio": "1:1",
        "megapixels": 0.25,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Professional corporate headshot portrait of a confident Brazilian man in his "
            "early 40s, slight knowing smile, wearing premium dark suit with open collar "
            "white shirt, dark desaturated background with subtle electric blue rim light "
            "from behind, direct eye contact with camera, three-quarter portrait composition, "
            "professional studio key light with soft shadows, conveys strategic intelligence "
            "confidence and success in sales, high-end executive headshot quality, "
            "85mm portrait lens, photorealistic rendering, no text"
        ),
    },
    {
        "id": "I-28",
        "file": "avatar-agency-founder.webp",
        "aspect_ratio": "1:1",
        "megapixels": 0.25,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Professional creative director headshot of a confident Brazilian woman in her "
            "early 30s, dynamic energetic expression, wearing modern business-casual blazer "
            "in dark color, creative agency office background softly blurred showing monitors "
            "and creative environment, slightly more casual than corporate, animated genuine "
            "smile, direct engaging eye contact, side-lit with warm creative studio lighting "
            "plus blue rim light from back, conveys creativity ambition and entrepreneurial "
            "spirit, premium LinkedIn profile photo quality, 85mm portrait, photorealistic"
        ),
    },
    {
        "id": "I-29",
        "file": "avatar-real-estate.webp",
        "aspect_ratio": "1:1",
        "megapixels": 0.25,
        "output_quality": 95,
        "num_outputs": 4,
        "go_fast": True,
        "prompt": (
            "Professional real estate agent headshot portrait of a confident Brazilian man "
            "in his late 40s, polished business smile, wearing premium dark suit with "
            "subtle tie, modern real estate office background blurred showing glass walls "
            "and property listings on screens, authoritative yet approachable expression, "
            "classic corporate portrait lighting from front with subtle window light side "
            "fill, conveys trustworthiness experience and real estate expertise, "
            "top-tier executive headshot photography quality, 85mm lens, photorealistic"
        ),
    },
    {
        "id": "I-30",
        "file": "bg-problem-section.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 90,
        "num_outputs": 2,
        "go_fast": True,
        "prompt": (
            "Abstract dark oppressive background texture, very deep near-black background "
            "#030410, subtle red-orange embers or sparks scattered at very low density "
            "suggesting problems and urgency, barely visible grid lines creating a cage-like "
            "geometric structure, strong vignette pulling all edges to pure black, "
            "center slightly lighter but still very dark, overall atmosphere of tension and "
            "constriction, no recognizable objects, pure abstract texture suitable as "
            "full-bleed section background, low contrast and subtle so text remains readable "
            "on top, dark editorial photographic texture quality"
        ),
    },
    {
        "id": "I-31",
        "file": "bg-benefits-section.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 90,
        "num_outputs": 2,
        "go_fast": True,
        "prompt": (
            "Subtle premium dark technology texture background, deep navy #080D1A base color, "
            "extremely faint geometric hexagonal honeycomb pattern at 3% opacity suggesting "
            "technology and structure, very subtle gradient from slightly lighter center to "
            "darker edges, microscopic noise texture adding depth and film-like quality, "
            "no focal point, uniform and clean enough to layer content on top without "
            "competition, the texture should feel premium and technological without being "
            "distracting, similar to Linear.app or Vercel homepage background treatment, "
            "purely abstract and functional"
        ),
    },
    {
        "id": "I-32",
        "file": "bg-cta-final.webp",
        "aspect_ratio": "16:9",
        "megapixels": 1,
        "output_quality": 100,
        "num_outputs": 4,
        "go_fast": False,
        "prompt": (
            "Epic abstract cinematic background, deep space darkness with a massive convergence "
            "event happening at center, thousands of tiny glowing particles representing "
            "conversations and messages streaming in from all directions toward a brilliant "
            "central point of light, as they converge the particles transform color from "
            "cool blue to warm emerald green suggesting conversion and success, the central "
            "convergence point radiates golden-white light illuminating the surrounding "
            "particle streams, the edges of the image fade to pure black void, the overall "
            "composition feels like witnessing something powerful and inevitable, "
            "an abundance of opportunity being captured and converted, epic scale matching "
            "closing cinematic shots of award-winning films, stunning 8K generative art quality, "
            "ultra detailed particle simulation aesthetic"
        ),
    },
]


def api_request(token: str, method: str, path: str, data: dict | None = None) -> dict:
    url = f"{API_BASE}{path}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": "wait",
    }
    body = json.dumps(data).encode() if data is not None else None
    req = Request(url, data=body, headers=headers, method=method)
    with urlopen(req, timeout=300) as resp:
        return json.loads(resp.read().decode())


def wait_prediction(token: str, prediction_id: str, poll_secs: float = 2.0) -> dict:
    while True:
        result = api_request(token, "GET", f"/predictions/{prediction_id}")
        status = result.get("status")
        if status in ("succeeded", "failed", "canceled"):
            return result
        time.sleep(poll_secs)


def run_flux(token: str, params: dict) -> list[str]:
    payload = {"input": params}
    result = api_request(token, "POST", f"/models/{MODEL}/predictions", payload)

    if result.get("status") not in ("succeeded",):
        if result.get("id"):
            result = wait_prediction(token, result["id"])
        else:
            raise RuntimeError(f"Resposta inesperada: {result}")

    if result.get("status") == "failed":
        raise RuntimeError(result.get("error", "Predição falhou"))

    output = result.get("output")
    if output is None:
        raise RuntimeError("Sem output na predição")
    return output if isinstance(output, list) else [output]


def download_file(url: str, dest: Path) -> None:
    response = requests.get(url, timeout=120)
    response.raise_for_status()
    dest.write_bytes(response.content)


def generate_asset(token: str, asset: dict, output_dir: Path, force: bool = False) -> list[Path]:
    asset_id = asset["id"]
    filename = asset["file"]
    base_name = Path(filename).stem
    ext = Path(filename).suffix or ".webp"

    existing = list(output_dir.glob(f"{base_name}*{ext}"))
    if existing and not force:
        print(f"  [{asset_id}] Pulando — já existe: {existing[0].name}")
        return existing

    num_outputs = 1 if DEFAULT_NUM_OUTPUTS == 1 else asset.get("num_outputs", 1)

    params = {
        "prompt": asset["prompt"],
        "aspect_ratio": asset.get("aspect_ratio", "16:9"),
        "megapixels": str(asset.get("megapixels", 1)),
        "output_format": "webp",
        "output_quality": asset.get("output_quality", 95),
        "num_inference_steps": 4,
        "num_outputs": num_outputs,
        "go_fast": asset.get("go_fast", True),
    }

    print(f"  [{asset_id}] Gerando {filename}...")
    urls = run_flux(token, params)

    saved: list[Path] = []
    for i, url in enumerate(urls):
        out_path = output_dir / filename if num_outputs == 1 else output_dir / f"{base_name}-v{i + 1}{ext}"
        download_file(url, out_path)
        saved.append(out_path)
        print(f"  [{asset_id}] Salvo: {out_path.name}")

    return saved


def main() -> int:
    load_dotenv(ROOT / ".env")
    token = os.environ.get("API_KEY") or os.environ.get("REPLICATE_API_TOKEN")
    if not token:
        print("Erro: defina API_KEY ou REPLICATE_API_TOKEN no .env")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    only = sys.argv[1:] if len(sys.argv) > 1 else []
    force = "--force" in only
    if force:
        only = [a for a in only if a != "--force"]

    assets = ASSETS
    if only:
        assets = [a for a in ASSETS if a["id"] in only or a["file"] in only]
        if not assets:
            print(f"Nenhum asset encontrado para: {only}")
            return 1

    print(f"FlowIA — Gerando {len(assets)} imagens via FLUX Schnell")
    print(f"Output: {OUTPUT_DIR}\n")

    ok, fail = 0, 0
    for asset in assets:
        try:
            generate_asset(token, asset, OUTPUT_DIR, force=force)
            ok += 1
            time.sleep(0.5)
        except Exception as exc:
            print(f"  [{asset['id']}] ERRO: {exc}")
            fail += 1

    print(f"\nConcluído: {ok} ok, {fail} falhas")
    print(f"Imagens em: {OUTPUT_DIR}")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
