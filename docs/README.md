# agroFarm Documentation

This directory contains system documentation for the agroFarm platform. The technical docs (**System_Architecture**, **ER_Diagram**, **DFD**) are maintained to match the current codebase (Express API on port **3000** by default, Vite frontend, MongoDB models including **Blog** and **ContactInquiry**, admin **Leads** from `/admin/contacts`, user dashboard **soil** and **orders** sections).

## Files

1. **DFD.md** — Data flow (users, admin, public contact/blog, file uploads, weather from client)
2. **ER_Diagram.md** — Entities: User, Task, SoilBooking, Equipment, Order (embedded items), Blog, ContactInquiry
3. **System_Architecture.md** — Stack, route map, auth, and deployment notes

## Converting to PDF

### Method 1: Using VS Code Extension
1. Install "Markdown PDF" extension in VS Code
2. Open any .md file
3. Right-click → "Markdown PDF: Export (pdf)"

### Method 2: Using Online Converter
1. Visit https://www.markdowntopdf.com/
2. Upload the .md file
3. Download the PDF

### Method 3: Using Pandoc
```bash
# Install pandoc first
sudo apt install pandoc  # Linux
# or brew install pandoc  # macOS

# Convert to PDF
pandoc DFD.md -o DFD.pdf
pandoc ER_Diagram.md -o ER_Diagram.pdf
pandoc System_Architecture.md -o System_Architecture.pdf
```

### Method 4: Using Mermaid Live Editor (for diagrams)
1. Visit https://mermaid.live/
2. Copy the mermaid diagram code from the .md files
3. Paste into the editor
4. Click "Actions" → "Download PNG/SVG" or use print to PDF

### Method 5: Using Chrome/Edge Browser
1. Open the .md file in a markdown viewer (VS Code preview or GitHub)
2. Print (Ctrl+P / Cmd+P)
3. Select "Save as PDF"

## Viewing Mermaid Diagrams

The diagrams use Mermaid syntax. To view them properly:
- GitHub/GitLab: View directly in the repository
- VS Code: Install "Markdown Preview Mermaid Support" extension
- Online: https://mermaid.live/
