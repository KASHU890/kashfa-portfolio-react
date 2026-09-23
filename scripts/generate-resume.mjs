import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '..', 'public', 'resume.pdf')

const W = 595
const H = 842

function textLine(content, size, font, x, y) {
  return `BT /${font} ${size} Tf ${x} ${y} Td (${content}) Tj ET\n`
}

function textLineWrap(content, size, font, x, y, maxWidth, leading) {
  if (!content) return ''
  const charsPerLine = Math.floor(maxWidth / size)
  let out = ''
  let remaining = content
  let lineY = y
  while (remaining.length > 0) {
    let chunk = remaining.slice(0, charsPerLine)
    const idx = chunk.lastIndexOf(' ')
    if (idx > 0 && chunk.length === charsPerLine) chunk = chunk.slice(0, idx)
    out += textLine(chunk, size, font, x, lineY)
    remaining = remaining.slice(chunk.length).replace(/^\s+/, '')
    lineY -= leading
  }
  return out
}

function sectionTitle(t, x, y) {
  return textLine(t, 12, 'F1', x, y)
}

let y = 760
const content = []

content.push(textLine('KASHFA AHSAAN', 26, 'F1', 60, y))
y -= 30
content.push(textLine('Web Developer', 14, 'F1', 60, y))
y -= 24
content.push(
  textLine(
    'kashfa.ahsaan@gmail.com  |  +92 309 4642386  |  github.com/KASHU890  |  Pakistan',
    9,
    'F2',
    60,
    y,
  ),
)
y -= 26

content.push(sectionTitle('PROFILE', 60, y))
y -= 22
content.push(
  textLineWrap(
    'Passionate fresher web developer who builds clean, responsive websites, full-stack capstone projects, and browser-based games. Focused on modern HTML, CSS, and JavaScript, and always learning new ways to craft better user experiences.',
    10.5,
    'F2',
    60,
    y,
    W - 120,
    15,
  ),
)
y -= 76

content.push(sectionTitle('SKILLS', 60, y))
y -= 22
content.push(
  textLineWrap(
    'HTML5 | CSS3 | JavaScript (ES6+) | React | Tailwind CSS | Responsive Design | Git & GitHub | UI/UX Basics',
    10,
    'F2',
    60,
    y,
    W - 120,
    14,
  ),
)
y -= 30

content.push(sectionTitle('EXPERIENCE', 60, y))
y -= 22
content.push(textLine('Web Developer (Fresher) - Freelance & Personal Projects', 11, 'F1', 60, y))
content.push(textLine('2024 - Present', 9.5, 'F2', 380, y))
y -= 14
content.push(
  textLineWrap(
    'Building responsive websites and web apps - e-commerce, travel recommendation, and browser-based games - while growing a portfolio of real-world projects.',
    10,
    'F2',
    60,
    y,
    W - 120,
    14,
  ),
)
y -= 30
content.push(textLine('Final-Year Project - Web Application', 11, 'F1', 60, y))
content.push(textLine('2025', 9.5, 'F2', 380, y))
y -= 14
content.push(
  textLineWrap(
    'Built a complete web app from scratch using clean code, responsive layouts, and modern JavaScript.',
    10,
    'F2',
    60,
    y,
    W - 120,
    14,
  ),
)
y -= 30

content.push(sectionTitle('EDUCATION', 60, y))
y -= 22
content.push(textLine('BS Computer Science - University', 11, 'F1', 60, y))
content.push(textLine('2020 - 2024', 9.5, 'F2', 380, y))
y -= 14
content.push(textLineWrap('Focused on web technologies and human-computer interaction.', 10, 'F2', 60, y, W - 120, 14))
y -= 30

content.push(sectionTitle('PROJECTS', 60, y))
y -= 22

const projectLines = [
  {
    name: 'E-Plant Shopping',
    desc: 'Online plant store web app',
    url: 'code: github.com/KASHU890/e-plantShopping',
  },
  {
    name: 'Travel Recommendation',
    desc: 'Destination suggestion web app',
    url: 'live: kashu890.github.io/travel-recommendation',
  },
  {
    name: 'Fullstack Capstone',
    desc: 'End-to-end full-stack project with API',
    url: 'code: github.com/KASHU890/fullstack-capstone-project',
  },
  {
    name: 'Vendors',
    desc: 'Vendor listing web app',
    url: 'live: kashu890.github.io/vendors',
  },
  {
    name: 'Candy Crush',
    desc: 'Match-3 browser game',
    url: 'live: kashu890.github.io/candy-crush',
  },
  {
    name: 'Space Jumper Game',
    desc: 'Arcade jumping game',
    url: 'live: kashu890.github.io/space-jumper-game',
  },
]

for (const project of projectLines) {
  content.push(textLine(`${project.name} - ${project.desc}`, 10, 'F2', 60, y))
  content.push(textLine(project.url, 8.5, 'F2', 60, y - 12))
  y -= 30
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