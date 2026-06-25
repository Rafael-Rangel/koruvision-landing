#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "assets" / "refs" / "koruvision-logo-master.png"
OUT = ROOT / "assets" / "images" / "mockup-koruvision-app.webp"
W, H = 1200, 1600
BG = (0, 0, 0)
SURFACE = (10, 10, 15)
PURPLE = (157, 78, 221)
GOLD = (255, 183, 0)
MUTED = (139, 158, 196)
WHITE = (240, 244, 255)
CARD = (18, 18, 26)

def font(size, bold=False):
    paths = ["C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            pass
    return ImageFont.load_default()

def glow(base, cx, cy, color, radius, alpha=80):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for r in range(radius, 0, -8):
        a = int(alpha * (r / radius))
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(*color, a))
    return Image.alpha_composite(base.convert("RGBA"), layer.filter(ImageFilter.GaussianBlur(18)))

def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    img = Image.new("RGB", (W, H), BG)
    img = glow(img, W // 2, H // 2 + 80, (157, 78, 221), 420, 55)
    img = glow(img, W // 2, H // 2 + 120, (255, 183, 0), 280, 35)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((80, H - 280, W - 80, H - 60), radius=24, fill=SURFACE)
    px0, py0, px1, py1 = 310, 120, 890, 1380
    draw.rounded_rectangle((px0 - 14, py0 - 14, px1 + 14, py1 + 14), radius=56, fill=(35, 35, 42), outline=(80, 80, 90), width=2)
    draw.rounded_rectangle((px0, py0, px1, py1), radius=48, fill=(8, 8, 12), outline=(120, 120, 130), width=1)
    sw, sh = px1 - px0, py1 - py0
    screen = Image.new("RGB", (sw, sh), (5, 5, 8))
    sdraw = ImageDraw.Draw(screen)
    sdraw.text((28, 22), "21:09", fill=WHITE, font=font(22, True))
    sdraw.text((sw - 120, 24), "5G  100%", fill=MUTED, font=font(18))
    logo = Image.open(LOGO).convert("RGBA")
    lw = int(sw * 0.82)
    lh = int(lw * logo.height / logo.width)
    logo = logo.resize((lw, lh), Image.Resampling.LANCZOS)
    screen.paste(logo, ((sw - lw) // 2, int(sh * 0.22)), logo)
    cards = [("Conversas ativas", "7 atendimentos em andamento"), ("Pipeline CRM", "R$ 14.200 em negocia\u00e7\u00e3o"), ("Agendamentos", "3 confirmados hoje")]
    cy = int(sh * 0.62)
    for title, sub in cards:
        sdraw.rounded_rectangle((36, cy, sw - 36, cy + 88), radius=16, fill=CARD, outline=(40, 40, 55), width=1)
        sdraw.text((56, cy + 16), title, fill=WHITE, font=font(26, True))
        sdraw.text((56, cy + 48), sub, fill=MUTED, font=font(20))
        cy += 104
    sdraw.rounded_rectangle((36, sh - 130, sw - 36, sh - 58), radius=20, fill=PURPLE)
    sdraw.text((sw // 2 - 95, sh - 108), "Come\u00e7ar agora", fill=WHITE, font=font(22, True))
    nav = ["In\u00edcio", "Chat", "Kanban", "Dashboard"]
    for i, label in enumerate(nav):
        x = 36 + i * ((sw - 72) // 4) + 20
        sdraw.text((x, sh - 48), label, fill=GOLD if i == 0 else MUTED, font=font(16))
    img.paste(screen, (px0, py0))
    refl = screen.copy().transpose(Image.Transpose.FLIP_TOP_BOTTOM).resize((sw, int(sh * 0.18)), Image.Resampling.LANCZOS).convert("RGBA")
    a = refl.split()[3].point(lambda p: int(p * 0.12))
    refl.putalpha(a)
    img.paste(refl, (px0, py1 + 8), refl)
    draw.text((W // 2 - 210, H - 230), "Plataforma CRM + IA para WhatsApp", fill=MUTED, font=font(22))
    draw.text((W // 2 - 180, H - 195), "Intelig\u00eancia. Vis\u00e3o. Solu\u00e7\u00f5es.", fill=GOLD, font=font(20))
    img.save(OUT, "WEBP", quality=95, method=6)
    print("Mockup salvo:", OUT)

if __name__ == "__main__":
    main()