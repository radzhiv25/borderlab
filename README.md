# Borderlab

**A procedural stamp-border generator for images.** Upload a photo, pick a style (Stamp, Scallop, or Zigzag), tweak teeth and margin, then export as PNG, SVG, or copy the CSS/React snippet.

## Features

- **Three border styles** — Stamp (postage-style perforations), Scallop (wavy), Zigzag (sawtooth)
- **Live preview** — Changes update instantly as you adjust sliders
- **Aspect ratios** — 1:1, 4:3, 3:2, 16:9, 2:3, 3:4, 9:16
- **Customizable** — Teeth count, depth, margin, and border color
- **Export** — Download PNG (with image), download SVG, copy CSS `clip-path`, or copy React snippet

## Tech stack

| Layer        | Stack |
|-------------|--------|
| Framework   | [Next.js](https://nextjs.org) (App Router) |
| Language   | [TypeScript](https://www.typescriptlang.org/) |
| Styling    | [Tailwind CSS](https://tailwindcss.com) v4 |
| UI         | [Radix UI](https://www.radix-ui.com/) primitives, [CVA](https://cva.style/) |
| State      | [Zustand](https://zustand-demo.pmnd.rs/) |
| Motion     | [Framer Motion](https://www.framer.com/motion/) |
| Upload     | [react-dropzone](https://react-dropzone.js.org/) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (or pnpm / yarn)

### Install and run

```bash
git clone https://github.com/your-username/borderlab.git
cd borderlab
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start dev server         |
| `npm run build` | Production build      |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint            |

## Project structure

```
borderlab/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                  # Reusable UI (Button, Slider, Card, etc.)
│   ├── preview/             # Image preview + dropzone
│   ├── controls/             # Border controls, aspect ratio, export
│   ├── presets/              # Stamp / Scallop / Zigzag presets
│   ├── Sidebar.tsx
│   └── MainContent.tsx
├── lib/
│   ├── generators/           # Border path algorithms
│   │   ├── types.ts
│   │   ├── stamp.ts
│   │   ├── scallop.ts
│   │   ├── zigzag.ts
│   │   ├── corners.ts
│   │   └── index.ts
│   ├── utils.ts
│   └── export.ts             # PNG export (canvas)
├── store/
│   └── useBorderStore.ts     # Zustand store
├── package.json
└── README.md
```

## Adding a new border style

1. **Types** — Add the style to `BorderStyle` and defaults in `lib/generators/types.ts`.
2. **Generator** — Create `lib/generators/my-style.ts` that returns an SVG path string (single closed path + optional corner fills).
3. **Index** — Register it in `generateBorderPath()` in `lib/generators/index.ts`.
4. **UI** — Add a preset in `components/presets/PresetList.tsx` and a dropdown option in `components/controls/BorderControls.tsx`.

Path coordinates should use the same coordinate system as the canvas (see `BorderConfig.width` / `height` and `computeLayout()`).

## Contributing

Contributions are welcome. Please open an issue to discuss larger changes, or a pull request for small fixes and features.

1. Fork the repo and create a branch from `main`.
2. Make your changes; keep commits focused (e.g. `feat: add ticket border style`).
3. Run `npm run lint` and `npm run build`.
4. Open a PR with a short description of the change.

## License

[MIT](LICENSE) — use it freely in personal and commercial projects.
