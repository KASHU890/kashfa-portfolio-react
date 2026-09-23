import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '..', 'public', 'resume.pdf')

const W = 595
const H = 842
const MARGIN = 60
const AVAIL = W - MARGIN * 2

function textLine(content, size, font, x, y) {
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
    lines: lines.map((line, i) => textLine(line, size, font, x, y - i * leading)).join(''),
  }
}

// A "row" = bold title with optional right-aligned light date.
// If title + date don't fit on one line, the date drops to its own line.
function row(title, date) {
  const dateSize = 9.5
  const dateW = date ? date.length * dateSize * 0.5 + 8 : 0
  const titleW = title.length * 11 * 0.5
  let yCursor = y
  if (date && titleW + 16 + dateW <= AVAIL) {
    y -= 16
    return (
      textLine(title, 11, 'F1', MARGIN, yCursor) +
      textLine(date, dateSize, 'F2', W - MARGIN - dateW, yCursor)
    )
  }
  const titleLines = wrap(title, 11, AVAIL)
  y -= 16 * titleLines.length
  return (
    titleLines.map((line, i) => textLine(line, 11, 'F1', MARGIN, yCursor - i * 16)).join('') +
    (date ? textLine(date, dateSize, 'F2', MARGIN, yCursor - titleLines.length * 16 + 2) : '')
  )
}

let y = 760
const content = []

content.push(textLine('KASHFA AHSAAN', 26, 'F1', MARGIN, y))
y -= 31
content.push(textLine('Full Stack Web Developer', 14, 'F1', MARGIN, y))
y -= 24
content.push(
  textLine(
    'kashfa.ahsaan@gmail.com  |  +92 309 4642386  |  github.com/KASHU890  |  Pakistan',
    9,
    'F2',
    MARGIN,
    y,
  ),
)
y -= 27

// PROFILE
content.push(textLine('PROFILE', 12, 'F1', MARGIN, y))
y -= 20
const profileBlock = block(
  'Passionate fresher full-stack developer building complete web apps from scratch — front-end with React, back-end with Node.js and Express, MongoDB databases, and REST APIs — plus responsive e-commerce stores, travel apps, and browser games.',
  10.5,
  'F2',
  MARGIN,
  y,
  15,
)
content.push(profileBlock.lines)
y = profileBlock.y - 20

// SKILLS
content.push(textLine('SKILLS', 12, 'F1', MARGIN, y))
y -= 20
const skillsBlock = block(
  'HTML5 | CSS3 | JavaScript (ES6+) | React | Node.js | Express | MongoDB | REST APIs | Responsive Design | Tailwind CSS | Git & GitHub',
  10,
  'F2',
  MARGIN,
  y,
  14,
)
content.push(skillsBlock.lines)
y = skillsBlock.y - 20

// EXPERIENCE
content.push(textLine('EXPERIENCE', 12, 'F1', MARGIN, y))
y -= 20
content.push(row('Full Stack Web Developer (Fresher)', '2024 - Present'))
y -= 2
const exp1 = block(
  'Building full-stack web apps end-to-end — e-commerce store, travel recommendation app, and browser-based games — from database and API design to responsive front-end.',
  10,
  'F2',
  MARGIN,
  y,
  14,
)
content.push(exp1.lines)
y = exp1.y - 2
content.push(row('Final-Year Project - Full Stack Web App', '2025'))
y -= 2
const exp2 = block(
  'Developed a complete full-stack web application from scratch using clean code, a REST API, and modern JavaScript.',
  10,
  'F2',
  MARGIN,
  y,
  14,
)
content.push(exp2.lines)
y = exp2.y - 20

// EDUCATION
content.push(textLine('EDUCATION', 12, 'F1', MARGIN, y))
y -= 20
content.push(row('BS Computer Science - University', '2020 - 2024'))
y -= 2
const eduBlock = block(
  'Focused on web technologies, databases, and human-computer interaction.',
  10,
  'F2',
  MARGIN,
  y,
  14,
)
content.push(eduBlock.lines)
y = eduBlock.y - 20

// PROJECTS
content.push(textLine('PROJECTS', 12, 'F1', MARGIN, y))
y -= 22

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
  content.push(p.lines + textLine(project.url, 8.5, 'F2', MARGIN, p.y - 14))
  y = p.y - 14 - 18
}

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