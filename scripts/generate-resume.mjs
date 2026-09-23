import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '..', 'public', 'resume.pdf')

const W = 595
const H = 842
const MARGIN = 60
const AVAIL = W - MARGIN * 2

// Every drawn text line is tracked so we can detect any overlap before writing the PDF.
const boxes = []
function drawText(content, size, font, x, y) {
  const widthFactor = font === 'F1' ? 0.66 : 0.56
  boxes.push({
    x0: x,
    x1: x + content.length * size * widthFactor,
    yTop: y + size * 0.8,
    yBot: y - size * 0.2,
  })
  return `BT /${font} ${size} Tf ${x} ${y} Td (${content}) Tj ET\n`
}

function wrap(content, size, maxW) {
  const perChar = size * 0.5
  const cpl = Math.max(1, Math.floor(maxW / perChar))
  const lines = []
  const words = content.split(/\s+/)
  let line = ''
  for (const word of words) {
    if ((line + ' ' + word).trim().length <= cpl) {
      line = (line + ' ' + word).trim()
    } else {
      if (line) lines.push(line)
      line = word.length > cpl ? word.slice(0, cpl) : word
    }
  }
  if (line) lines.push(line)
  return lines
}

function block(content, size, font, x, y, leading) {
  const lines = wrap(content, size, AVAIL)
  return {
    y: y - (lines.length - 1) * leading,
    lines: lines.map((line, i) => drawText(line, size, font, x, y - i * leading)).join(''),
  }
}

function sectionTitle(t) {
  const out = drawText(t, 12, 'F1', MARGIN, y)
  y -= 22
  return out
}

// A row = bold title line(s) with the date on its own line (right-aligned) right below.
// Dates never share a line with a title, so text can never overwrite.
function row(title, date) {
  const titleLines = wrap(title, 11, AVAIL)
  let out = titleLines.map((line, i) => drawText(line, 11, 'F1', MARGIN, y - i * 18)).join('')
  if (date) {
    const dateX = W - MARGIN - Math.ceil(date.length * 9.5 * 0.5)
    out += drawText(date, 9.5, 'F2', dateX, y - titleLines.length * 18 + 4)
  }
  y -= titleLines.length * 18 + 12
  return out
}

let y = 760
const content = []

content.push(drawText('KASHFA AHSAAN', 26, 'F1', MARGIN, y))
y -= 32
content.push(drawText('Full Stack Web Developer', 14, 'F1', MARGIN, y))
y -= 24
content.push(
  drawText('kashfa.ahsaan@gmail.com  |  +92 309 4642386  |  github.com/KASHU890  |  Pakistan', 9, 'F2', MARGIN, y),
)
y -= 28

// PROFILE
content.push(sectionTitle('PROFILE'))
const profileBlock = block(
  'Passionate fresher full-stack developer building complete web apps from scratch — front-end with React, back-end with Node.js and Express, MongoDB databases, and REST APIs — plus responsive e-commerce stores, travel apps, and browser games.',
  10.5,
  'F2',
  MARGIN,
  y,
  17,
)
content.push(profileBlock.lines)
y = profileBlock.y - 22

// SKILLS
content.push(sectionTitle('SKILLS'))
const skillsBlock = block(
  'HTML5 | CSS3 | JavaScript (ES6+) | React | Node.js | Express | MongoDB | REST APIs | Responsive Design | Tailwind CSS | Git & GitHub',
  10,
  'F2',
  MARGIN,
  y,
  15,
)
content.push(skillsBlock.lines)
y = skillsBlock.y - 22

// EXPERIENCE
content.push(sectionTitle('EXPERIENCE'))
content.push(row('Full Stack Web Developer (Fresher)', '2024 - Present'))
const exp1 = block(
  'Building full-stack web apps end-to-end — e-commerce store, travel recommendation app, and browser-based games — from database and API design to responsive front-end.',
  10,
  'F2',
  MARGIN,
  y,
  15,
)
content.push(exp1.lines)
y = exp1.y - 22
content.push(row('Final-Year Project - Full Stack Web App', '2025'))
const exp2 = block(
  'Developed a complete full-stack web application from scratch using clean code, a REST API, and modern JavaScript.',
  10,
  'F2',
  MARGIN,
  y,
  15,
)
content.push(exp2.lines)
y = exp2.y - 22

// EDUCATION
content.push(sectionTitle('EDUCATION'))
content.push(row('BS Computer Science - University', '2022 - 2026'))
const eduBlock = block(
  'Pursuing a BS in Computer Science — focused on web technologies, databases, and human-computer interaction.',
  10,
  'F2',
  MARGIN,
  y,
  15,
)
content.push(eduBlock.lines)
y = eduBlock.y - 22

// PROJECTS
content.push(sectionTitle('PROJECTS'))

const projectLines = [
  { name: 'E-Plant Shopping', desc: 'Online plant store web app', url: 'live: kashu890.github.io/e-plantShopping' },
  { name: 'Travel Recommendation', desc: 'Destination suggestion web app', url: 'live: kashu890.github.io/travel-recommendation' },
  { name: 'Fullstack Capstone', desc: 'End-to-end full-stack project (Express + MongoDB)', url: 'code: github.com/KASHU890/fullstack-capstone-project' },
  { name: 'Vendors', desc: 'Vendor listing web app', url: 'live: kashu890.github.io/vendors' },
  { name: 'Candy Crush', desc: 'Match-3 browser game', url: 'live: kashu890.github.io/candy-crush' },
  { name: 'Space Jumper Game', desc: 'Arcade jumping game', url: 'live: kashu890.github.io/space-jumper-game' },
]

for (const project of projectLines) {
  const p = block(`${project.name} - ${project.desc}`, 10, 'F2', MARGIN, y, 12)
  content.push(p.lines + drawText(project.url, 8.5, 'F2', MARGIN, p.y - 13))
  y = p.y - 13 - 18
}

// ---- Overlap self-check: abort if any two text boxes collide ----
for (let i = 0; i < boxes.length; i++) {
  for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i]
    const b = boxes[j]
    const hitX = Math.min(a.x1, b.x1) > Math.max(a.x0, b.x0)
    const hitY = Math.min(a.yTop, b.yTop) > Math.max(a.yBot, b.yBot)
    if (hitX && hitY) {
      throw new Error(`Overlap detected between boxes ${i} and ${j}`)
    }
  }
}
console.log(`No text overlaps found (${boxes.length} text boxes checked).`)

const stream = content.join('')

const objects = []
objects[0] = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`
objects[1] = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`
objects[2] = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n`
objects[3] = `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n`
objects[4] = `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n`
objects[5] = `6 0 obj\n<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream\nendobj\n`

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (const obj of objects) {
  offsets.push(Buffer.byteLength(pdf, 'utf8'))
  pdf += obj
}

const xrefStart = Buffer.byteLength(pdf, 'utf8')
let xref = `xref\n0 ${objects.length + 1}\n`
xref += '0000000000 65535 f \n'
for (const offset of offsets.slice(1)) {
  xref += `${String(offset).padStart(10, '0')} 00000 n \n`
}
xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`
pdf += xref
pdf += `startxref\n${xrefStart}\n%%EOF\n`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, pdf, 'utf8')
console.log(`Resume written to ${outPath} (${Buffer.byteLength(pdf)} bytes)`)