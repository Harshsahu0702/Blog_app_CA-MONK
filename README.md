# 🚀 CA Monk Blog - Frontend Assignment

A high-performance, responsive blog application built as part of the CA Monk frontend developer assessment. This project adheres strictly to the assessment requirements, leveraging **TanStack Query**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, while delivering a premium "Glassmorphism" UI with advanced animations.

![Project Preview](./public/assets/project_preview.png)

---

## ✨ Features & Highlights

### 🎯 Core Requirements Met
*   **Get All Blogs:** Fetches and displays blog posts using `GET /blogs` with **TanStack Query** (caching & stale-while-revalidate enabled).
*   **Get Blog by ID:** Implements a Master-Detail view to show individual blog content using `GET /blogs/:id`.
*   **Create New Blog:** Features a glassmorphic form to POST new entries to `/blogs`, automatically invalidating the query cache to update the list instantly.
*   **State Management:** Robust handling of `isLoading`, `isError`, and data states via React Query.

### 🎨 Premium UI/UX Polish
*   **Crazy Animations:** Integrated **GSAP (GreenSock)** for complex staggered entrance animations and timelines, side-by-side with **Framer Motion** for layout transitions.
*   **Glassmorphism:** Custom transparency and blur effects (`backdrop-blur-xl`) applied to cards and the navigation bar for a modern feel.
*   **Master-Detail Layout:** A centralized `MasterDetailLayout` in `App.tsx` that automagically adapts from a side-by-side view (Desktop) to a full-screen view (Mobile).
*   **Parallax Scroll:** GSAP ScrollTrigger implementations on the blog detail hero image for immersive reading.
*   **Responsive Design:** Fully fluid layout that works on mobile, tablet, and ultra-wide desktop monitors.

---

## 🛠️ Tech Stack

*   **Framework:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
*   **Data Fetching:** [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Button, Card, Input, Badge, Skeleton)
*   **Animations:** [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Backend:** JSON Server (Mock API)

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── ui/                 # shadcn/ui components (Button, Card, Badge...)
│   ├── AnimatedBackground/ # Custom 3D background effects
│   └── LoadingSkeletons/   # Loading states
├── lib/                    # Utilities (cn helper)
├── pages/
│   ├── BlogList.tsx        # Home view with staggered list animation
│   ├── BlogDetail.tsx      # Split-screen hero & detailed content
│   └── CreateBlog.tsx      # Form to add new posts
├── services/
│   └── api.ts              # Axios instances & API methods
├── App.tsx                 # Main layout & Routing logic
└── main.tsx                # App entry & QueryClientProvider
```

---

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Backend (JSON Server):**
    ```bash
    npm run server
    ```
    *Runs on port 3000*

3.  **Start the Frontend:**
    ```bash
    npm run dev
    ```
    *Runs on http://localhost:5173*

---

## 🧪 Evaluation Checklist

| Criteria | Status | Implementation Details |
| :--- | :---: | :--- |
| **TanStack Query** | ✅ | Used in `BlogList` & `BlogDetail`. Invalidation workflow in `CreateBlog`. |
| **Tailwind CSS** | ✅ | Extensive use of utility classes, custom `glass` utilities in `index.css`. |
| **shadcn/ui** | ✅ | Integrated Button, Inputs, cards, and skeleton loaders. |
| **Structure** | ✅ | Organized by domain (`pages`, `components`, `services`). |
| **Error/Loading** | ✅ | Custom Skeleton loaders & Error Boundary messages implemented. |
| **Responsiveness** | ✅ | Mobile-first design with `md:` and `lg:` breakpoints. |
| **UX Polish** | ✅ | Smooth transitions, hover effects, and strict accessibility optimization. |

---

> Built with ❤️ by [Harsh Sahu] for CA Monk.
