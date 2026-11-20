"""Build the English Salesforce CV (PDF + DOCX) from a single content source.

The layout mirrors the Spanish CV (A4, Carlito/Calibri, blue #1a5fb4 headings).
The PDF is printed from HTML with headless Edge; the DOCX is built with python-docx.

Usage (from the repo root):
    python scripts/cv/build_cv_en.py
"""

from __future__ import annotations

import html
import re
import subprocess
import tempfile
from pathlib import Path

from docx import Document
from docx.enum.text import WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE
from docx.shared import Pt, RGBColor

ROOT = Path(__file__).resolve().parents[2]
OUT_BASE = ROOT / "public" / "docs" / "joaquin-haro-filippon-salesforce-cv-2026"
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")

BLUE = "1a5fb4"
INK = "1f1f1f"
DARK = "111111"
MUTED = "555555"

# Text between **double asterisks** is rendered bold.
CV = {
    "name": "Joaquín Haro Filippon",
    "headline": "Salesforce Consultant · Platform | Marketing Cloud Next | Data 360",
    "contact": [
        ("Esquel, Argentina · Remote", None),
        ("+54 9 2945 699379", None),
        ("joaquinharofilippon@gmail.com", "mailto:joaquinharofilippon@gmail.com"),
        ("LinkedIn", "https://www.linkedin.com/in/joaquin-haro-filippon-a05967191/"),
        ("GitHub", "https://github.com/Keromon2k19"),
        ("Trailblazer", "https://www.salesforce.com/trailblazer/jharofilippon"),
    ],
    "summary": (
        "Salesforce Consultant with 3 years of project experience and a prior background in "
        "technology and customer support. I have worked on platform administration (Flows, "
        "validation rules, reports and dashboards) and Apex development (REST API, SOQL, "
        "Triggers). On my latest project I took part in a Marketing Cloud Next and Data 360 "
        "implementation: customer data ingestion and unification, segmentation, and activation "
        "through email and WhatsApp. I also wrote the implementation methodology the team "
        "followed. I am comfortable working between business and technology: I understand what "
        "the client needs and turn it into something the team can deliver."
    ),
    "certifications": [
        "Salesforce Certified Associate",
        "Marketing Cloud Essentials, Levels 1 and 2 · The Orange Academy (2023)",
        "EF SET English C1 · 90/100 (2026)",
    ],
    "job": {
        "title": "Esphera Consulting - Salesforce Consultant",
        "dates": "2023 - August 2026",
        "subtitle": "Platform, Marketing Cloud Next and Data 360 · Remote",
        "groups": [
            (
                "Marketing Cloud Next and Data 360 · Implementation for a retail client",
                [
                    "Designed the complete Marketing Cloud Next implementation methodology adopted by "
                    "the delivery team: 13 sequential chapters, from provisioning to go-live, checked "
                    "against the official Salesforce documentation.",
                    "Worked with the team to enable Data 360: ingestion through **Data Streams and "
                    "Data Kits**, **DLO to DMO** mapping on the canonical model (Individual, Contact "
                    "Point Email/Phone, Party Identification), and **Identity Resolution rulesets** "
                    "(match and reconciliation rules) to build a **unified customer profile**.",
                    "Turned marketing requirements into **segments and audiences** ready to activate "
                    "in email and WhatsApp journeys.",
                    "Documented email deliverability: domain authentication with **SPF, DKIM and "
                    "DMARC** and a gradual **IP warm-up** plan.",
                    "Launched the **WhatsApp Business (WABA)** channel with Meta-approved templates, "
                    "and set up consent management with **Consent & Preference Manager**.",
                    "Took part in planning a phased go-live with Agile methods: assigned owners, stop "
                    "and exit criteria, and an auditable implementation log.",
                    "Proposed a five-level decision classification (product requirement, "
                    "implementation-route requirement, project decision, recommendation, and "
                    "conditional) that reduced ambiguity in the handoff to the technical team.",
                ],
            ),
            (
                "Administration and data quality",
                [
                    "Audited and corrected data across multiple objects: removed duplicates, fixed "
                    "inconsistent field values, and restored the integrity of production reports.",
                    "Helped create custom objects and fields to model the quoting and operations "
                    "processes.",
                    "Restructured Account page layouts by process stage for the sales and operations "
                    "teams.",
                    "Localized the org metadata into Spanish (labels, fields and components) and "
                    "documented the production quoting system so non-technical teams could use it on "
                    "their own.",
                ],
            ),
            (
                "Platform development and architecture",
                [
                    "Developed in Apex with **REST API**, **SOQL**, **Triggers**, **Agentforce** and "
                    "**Agent Script**, using **CI/CD**.",
                    "Was part of the team that built and maintained the custom data architecture of a "
                    "client's Salesforce org.",
                    "Helped build the **Dashboards** and **Reports** layer for the client's "
                    "stakeholders.",
                    "Implemented and tested platform automation with **Flows**.",
                    "Created profiles and permission sets for role-based access.",
                ],
            ),
        ],
    },
    "skills": [
        ("Salesforce Platform", "Sales Cloud · custom objects and fields · page layouts · Flows · "
         "validation rules · reports and dashboards · users, profiles and permission sets · "
         "translation and localization"),
        ("Data 360", "Data Streams · Data Kits · DLO / DMO · Identity Resolution (match and "
         "reconciliation) · unified profile · segmentation · activation"),
        ("Marketing Cloud", "Marketing Cloud Next · multichannel journeys · email · WhatsApp / WABA · "
         "Consent & Preference Manager · SPF, DKIM, DMARC · IP warm-up · Email Studio · "
         "Journey Builder"),
        ("Development", "Apex · SOQL · Triggers · Lightning Web Components · REST API integrations · "
         "Agentforce and Agent Script · CI/CD · HTML, CSS, JavaScript · Git"),
        ("Data and business", "data quality and cleanup · systems documentation · requirements "
         "gathering · stakeholder communication"),
        ("Support", "case and ticket management · technical troubleshooting · service follow-up · "
         "plain-language communication"),
        ("Tools and AI", "GitHub · VS Code · Agile/Scrum · Trello · Notion · Obsidian · Slack · "
         "Claude · ChatGPT · Gemini · NotebookLM"),
    ],
    "education": [
        "Pareto Talent Bootcamp: AI, systems and operations (2026)",
        "Salesforce Development Bootcamp, 800+ hours · Plataforma 5 / CloudGaia (2023)",
        "Introduction to Salesforce course, 54 hours · Plataforma 5 / CloudGaia (2022 - 2023)",
        "Accounting and Finance Technician · Escuela N.º 708 Malvinas Argentinas, Esquel (2013)",
    ],
    "languages": "Spanish (native) · English C1 Advanced (EF SET 90/100, 2026)",
}

BOLD = re.compile(r"\*\*(.+?)\*\*")


def segments(text: str) -> list[tuple[str, bool]]:
    """Split a string into (text, is_bold) pieces using the **bold** markers."""
    parts = BOLD.split(text)
    return [(part, i % 2 == 1) for i, part in enumerate(parts) if part]


# ---------------------------------------------------------------- HTML / PDF


def rich_html(text: str) -> str:
    return "".join(
        f"<strong>{html.escape(t)}</strong>" if bold else html.escape(t)
        for t, bold in segments(text)
    )


def build_html() -> str:
    contact = ' <span class="sep">|</span> '.join(
        f'<a href="{url}">{html.escape(label)}</a>' if url else html.escape(label)
        for label, url in CV["contact"]
    )
    certs = "".join(f"<li>{rich_html(c)}</li>" for c in CV["certifications"])
    job = CV["job"]
    groups = "".join(
        f'<div class="group"><h3>{html.escape(title)}</h3>'
        f'<ul>{"".join(f"<li>{rich_html(b)}</li>" for b in bullets)}</ul></div>'
        for title, bullets in job["groups"]
    )
    skills = "".join(
        f"<p class=\"skill\"><strong>{html.escape(k)}:</strong> {html.escape(v)}</p>"
        for k, v in CV["skills"]
    )
    education = "".join(f"<li>{rich_html(e)}</li>" for e in CV["education"])

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Joaquin-Haro-Filippon-CV-Salesforce-2026</title>
<style>
  @page {{ size: A4; margin: 40pt 47.5pt 40pt 48pt; }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; font-family: Carlito, Calibri, sans-serif; font-size: 10.6pt;
         line-height: 1.32; color: #{INK}; }}
  a {{ color: #{BLUE}; text-decoration: none; }}
  h1 {{ margin: 0; font-size: 23pt; line-height: 1.2; color: #{DARK}; }}
  .headline {{ margin: 6pt 0 2pt; font-size: 11.5pt; font-weight: 700; color: #{BLUE}; }}
  .contact {{ margin: 0; font-size: 9.6pt; color: #{MUTED}; }}
  .sep {{ color: #bbbbbb; padding: 0 1pt; }}
  h2 {{ margin: 14pt 0 6pt; padding-bottom: 3pt; border-bottom: 0.75pt solid #{BLUE};
       font-size: 10.8pt; text-transform: uppercase; color: #{BLUE}; break-after: avoid; }}
  h3 {{ margin: 6pt 0 2pt; font-size: 10.6pt; color: #{BLUE}; break-after: avoid; }}
  p {{ margin: 0; text-align: justify; }}
  ul {{ margin: 0; padding-left: 16pt; }}
  li {{ margin: 0 0 2.2pt; break-inside: avoid; }}
  .group {{ break-inside: avoid; }}
  .job {{ display: flex; justify-content: space-between; font-weight: 700; color: #{BLUE};
         break-after: avoid; }}
  .job-sub {{ font-style: italic; color: #{MUTED}; break-after: avoid; }}
  .skill {{ margin-bottom: 3pt; text-align: left; }}
  .skill strong {{ color: #{DARK}; }}
</style>
</head>
<body>
  <h1>{html.escape(CV["name"])}</h1>
  <p class="headline">{html.escape(CV["headline"])}</p>
  <p class="contact">{contact}</p>

  <h2>Professional summary</h2>
  <p>{html.escape(CV["summary"])}</p>

  <h2>Certifications</h2>
  <ul>{certs}</ul>

  <h2>Professional experience</h2>
  <div class="job"><span>{html.escape(job["title"])}</span><span>{html.escape(job["dates"])}</span></div>
  <div class="job-sub">{html.escape(job["subtitle"])}</div>
  {groups}

  <h2>Technical skills</h2>
  {skills}

  <h2>Education</h2>
  <ul>{education}</ul>

  <h2>Languages</h2>
  <p>{html.escape(CV["languages"])}</p>
</body>
</html>
"""


def build_pdf(out: Path) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / "cv-en.html"
        src.write_text(build_html(), encoding="utf-8")
        subprocess.run(
            [
                str(EDGE),
                "--headless",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--print-to-pdf={out}",
                src.as_uri(),
            ],
            check=True,
            capture_output=True,
        )


# ---------------------------------------------------------------- DOCX


def rgb(hex_color: str) -> RGBColor:
    return RGBColor.from_string(hex_color.upper())


def add_runs(paragraph, text: str, size: float, color: str = INK, bold_color: str | None = None):
    for t, bold in segments(text):
        run = paragraph.add_run(t)
        run.font.size = Pt(size)
        run.font.bold = bold
        run.font.color.rgb = rgb(bold_color if bold and bold_color else color)


def add_hyperlink(paragraph, text: str, url: str, size: float) -> None:
    r_id = paragraph.part.relate_to(url, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    link = OxmlElement("w:hyperlink")
    link.set(qn("r:id"), r_id)
    run = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")
    color = OxmlElement("w:color")
    color.set(qn("w:val"), BLUE)
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(int(size * 2)))
    rpr.extend([color, sz])
    run.append(rpr)
    t = OxmlElement("w:t")
    t.text = text
    run.append(t)
    link.append(run)
    paragraph._p.append(link)


def bottom_border(paragraph) -> None:
    ppr = paragraph._p.get_or_add_pPr()
    pbdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "2")
    bottom.set(qn("w:color"), BLUE)
    pbdr.append(bottom)
    # pBdr has to come before shd/tabs/spacing/ind/jc in the schema order.
    ppr.insert_element_before(
        pbdr, "w:shd", "w:tabs", "w:suppressAutoHyphens", "w:spacing", "w:ind", "w:jc",
        "w:rPr", "w:sectPr", "w:pPrChange",
    )


def spacing(paragraph, before: float = 0, after: float = 0, keep_next: bool = False) -> None:
    fmt = paragraph.paragraph_format
    fmt.space_before = Pt(before)
    fmt.space_after = Pt(after)
    fmt.line_spacing = 1.1
    fmt.keep_with_next = keep_next


def build_docx(out: Path) -> None:
    doc = Document()
    section = doc.sections[0]
    section.page_width, section.page_height = Pt(595.3), Pt(841.9)
    section.left_margin = section.right_margin = Pt(48)
    section.top_margin = section.bottom_margin = Pt(40)
    text_width = section.page_width - section.left_margin - section.right_margin

    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
    normal.font.size = Pt(10.5)
    normal.font.color.rgb = rgb(INK)

    def heading(text: str) -> None:
        p = doc.add_paragraph()
        spacing(p, before=12, after=5, keep_next=True)
        add_runs(p, text.upper(), 11, BLUE)
        p.runs[0].font.bold = True
        bottom_border(p)

    def subheading(text: str) -> None:
        p = doc.add_paragraph()
        spacing(p, before=5, after=2, keep_next=True)
        add_runs(p, f"**{text}**", 10.5, BLUE, bold_color=BLUE)

    def bullet(text: str) -> None:
        p = doc.add_paragraph(style="List Bullet")
        spacing(p, after=2)
        add_runs(p, text, 10.5)

    p = doc.add_paragraph()
    spacing(p)
    add_runs(p, f"**{CV['name']}**", 23, DARK, bold_color=DARK)

    p = doc.add_paragraph()
    spacing(p, before=4, after=2)
    add_runs(p, f"**{CV['headline']}**", 11.5, BLUE, bold_color=BLUE)

    p = doc.add_paragraph()
    spacing(p)
    for i, (label, url) in enumerate(CV["contact"]):
        if i:
            add_runs(p, "  |  ", 9.5, "BBBBBB")
        if url:
            add_hyperlink(p, label, url, 9.5)
        else:
            add_runs(p, label, 9.5, MUTED)

    heading("Professional summary")
    p = doc.add_paragraph()
    spacing(p)
    p.paragraph_format.alignment = 3  # justify
    add_runs(p, CV["summary"], 10.5)

    heading("Certifications")
    for c in CV["certifications"]:
        bullet(c)

    heading("Professional experience")
    job = CV["job"]
    p = doc.add_paragraph()
    spacing(p, keep_next=True)
    p.paragraph_format.tab_stops.add_tab_stop(text_width, WD_TAB_ALIGNMENT.RIGHT)
    add_runs(p, f"**{job['title']}**\t**{job['dates']}**", 10.5, BLUE, bold_color=BLUE)
    p = doc.add_paragraph()
    spacing(p, keep_next=True)
    add_runs(p, job["subtitle"], 10.5, MUTED)
    p.runs[0].font.italic = True
    for title, bullets in job["groups"]:
        subheading(title)
        for b in bullets:
            bullet(b)

    heading("Technical skills")
    for label, value in CV["skills"]:
        p = doc.add_paragraph()
        spacing(p, after=3)
        add_runs(p, f"**{label}:** {value}", 10.5, bold_color=DARK)

    heading("Education")
    for e in CV["education"]:
        bullet(e)

    heading("Languages")
    p = doc.add_paragraph()
    spacing(p)
    add_runs(p, CV["languages"], 10.5)

    doc.core_properties.title = "Joaquín Haro Filippon - Salesforce CV"
    doc.core_properties.author = "Joaquín Haro Filippon"
    doc.save(out)


if __name__ == "__main__":
    build_pdf(OUT_BASE.with_suffix(".pdf"))
    build_docx(OUT_BASE.with_suffix(".docx"))
    print(f"Wrote {OUT_BASE.with_suffix('.pdf')}")
    print(f"Wrote {OUT_BASE.with_suffix('.docx')}")
