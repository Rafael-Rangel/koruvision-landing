import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / "demo" / "s04.html").read_text(encoding="utf-8")
m = re.search(r"<script>\s*(.*?)\s*</script>", html, re.S)
js = m.group(1).strip() if m else ""
js = js.replace("gsap.registerPlugin(ScrollTrigger);", "")
js = js.replace('const voidBg = "../assets/images/s04-stage-void.webp";', "")
# Replace void image block
old = """  const layerVoid = document.getElementById("layerVoid");
  const img = new Image();
  img.onload = () => { layerVoid.style.backgroundImage = `url(${voidBg})`; };
  img.onerror = () => { layerVoid.style.backgroundImage = "url(../assets/images/demo-plate-ambient.webp)"; };
  img.src = voidBg;"""
new = """  const layerVoid = document.getElementById("layerVoid");
  if (layerVoid) {
    layerVoid.style.background = "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(178,75,255,0.22), transparent 60%), linear-gradient(165deg, #0A0E1C, #010208)";
  }"""
js = js.replace(old, new)

wrapped = """/** S04 Demo — KORUVISION Motion System */
function initS04() {
  if (!document.getElementById("s04-pin-wrap")) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(500, 33);
""" + js + """
}
"""
(ROOT / "demo" / "js" / "s04.js").write_text(wrapped, encoding="utf-8")
print("s04.js written", len(wrapped))
