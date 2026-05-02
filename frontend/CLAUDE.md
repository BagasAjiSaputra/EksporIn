CLAUDE.md

Project ini menggunakan pendekatan:

- Server-first architecture (React Server Components)
- Minimal client state
- Server Actions untuk handling form & mutation
- UI ringan dengan TailwindCSS
- Icon menggunakan lucide-react

Fokus utama:
- Simple
- Fast
- Maintainable
- Minim over-engineering


====================================
ARCHITECTURE OVERVIEW
====================================

1. Server Components (Default)

Semua komponen default adalah Server Component.

Gunakan server component untuk:
- Fetch data
- Render UI
- Komposisi layout

Contoh:

export default async function Page() {
  const data = await getProducts()
  return <ProductList data={data} />
}


------------------------------------

2. Client Components (Only When Needed)

Gunakan "use client" hanya jika butuh:
- Event handler (onClick, onChange)
- Local state (useState)
- Browser API

Contoh:

"use client"

export function Button() {
  return <button onClick={() => alert("clicked")}>Click</button>
}

Hindari:
- Fetch data di client jika bisa di server
- State management berlebihan


------------------------------------

3. Server Actions (Form Handling)

Gunakan Server Actions untuk semua mutation:
- Create
- Update
- Delete
- Login / Auth

Contoh:

"use server"

export async function createProduct(formData: FormData) {
  const name = formData.get("name")
  // call API / DB
}

Di UI:

<form action={createProduct}>
  <input name="name" />
  <button type="submit">Save</button>
</form>

Tidak perlu:
- useState untuk form sederhana
- fetch manual di client


====================================
STYLING (TAILWINDCSS)
====================================

Gunakan Tailwind sebagai standar styling.

Guidelines:
- Gunakan utility class langsung
- Hindari CSS custom jika tidak perlu
- Gunakan clsx / cn() untuk conditional class

Contoh:

<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Submit
</button>


====================================
ICONS (LUCIDE REACT)
====================================

Gunakan lucide-react untuk semua icon.

Contoh:

import { Plus, Trash } from "lucide-react"

<Plus className="w-4 h-4" />

Guidelines:
- Konsisten ukuran (w-4 h-4 / w-5 h-5)
- Jangan mix dengan library lain


====================================
DATA FETCHING RULES
====================================

DO:
- Fetch di server component
- Gunakan async/await langsung

Contoh:

const data = await fetch("https://api.example.com")
  .then(res => res.json())

DON'T:
- Fetch di client tanpa alasan kuat
- Double fetching


====================================
DATA FLOW PATTERN
====================================

Server Component → Fetch Data → Render UI
Client Component → Trigger Action → Server Action → Re-render


====================================
COMPONENT STRUCTURE
====================================

/app
  /products
    page.tsx
    ProductList.tsx (server)
    ProductItem.tsx (server)
    DeleteButton.tsx (client)

/actions
  product.ts


====================================
PERFORMANCE GUIDELINES
====================================

- Gunakan Server Components sebanyak mungkin
- Hindari hydration berlebihan
- Minimalkan penggunaan "use client"
- Gunakan streaming & suspense jika perlu


====================================
ERROR HANDLING
====================================

Server Action:

if (!res.ok) {
  throw new Error("Failed to create product")
}

UI:

try {
  await action()
} catch (e) {
  console.error(e)
}


====================================
SECURITY NOTES
====================================

- Semua logic sensitif harus di server
- Jangan expose token di client
- Gunakan cookies/httpOnly jika auth


====================================
ANTI-PATTERNS (HINDARI)
====================================

- Overuse client components
- Global state untuk hal sederhana
- Fetch di client padahal bisa server
- Form pakai useState padahal bisa Server Action
- Mixing banyak UI library


====================================
BEST PRACTICES SUMMARY
====================================

- Server-first mindset
- Form = Server Action
- UI simple, no over abstraction
- Client hanya untuk interaksi
- Keep code readable & modular