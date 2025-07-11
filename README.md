# ⚡️ React Native FlatList Performance Demo

> Benchmarking **Baseline** vs **Optimized** implementations of `FlatList` — accompanying code for the Medium article **“React Native’de FlatList Performansını Artıran Basit İpuçları (2025)”**. Fork it, run it, and _feel_ the FPS difference.

---

## 📸 Quick Look
| Build | UI FPS *(avg)* | JS FPS *(avg)* | Dropped Frames |
|-------|---------------|----------------|----------------|
| **Baseline** | **38** | 35 | 280 |
| **Optimized** | **58** | 58 | 74 |

<sup>Measured on iPhone 11 (iOS 18, Release + Hermes)</sup>

> Replace the numbers with _your own_ measurements! See **`/screens`** for template PNGs/GIFs.

---

## 🗂️ Project Structure
```text
flatlist-perf-demo/
├─ apps/
│  ├─ baseline/      # Default FlatList settings (anti‑patterns enabled)
│  └─ optimized/     # Tweak #1‑#6 from the Medium article applied
├─ screens/          # Benchmarks & GIFs for the README
├─ App.tsx           # Root toggle (env var / debug button)
├─ package.json      # Yarn Workspaces & helper scripts
└─ README.md
```

### Single‑Project vs Monorepo
- **Quick demo?** Use the default _single‑project_ variant (`App.tsx` toggles build).  
- **Side‑by‑side simulators?** Keep the **monorepo** layout (2 RN apps under `apps/`).

---

## 🚀 Getting Started
```bash
# 1 · Clone
$ git clone https://github.com/Enver-Onur-Cogalan/Flatlist-perf-demo.git
$ cd FlatlistPerfDemo

# 2 · Yarn install
yarn install
cd ios
pod install
cd ..
$ yarn

# 3 · iOS
$ BUILD_TYPE=baseline  yarn ios      # Baseline build
$ BUILD_TYPE=optimized yarn ios      # Optimized build

# 4 · Android (cross‑env for Windows/Powershell)
$ yarn add -D cross-env
$ yarn cross-env BUILD_TYPE=baseline  yarn android
```
> ⚠️  If you prefer independent apps, run `yarn ios:baseline` / `yarn ios:optimized` scripts instead.

---

## 📊 Recording FPS (Flipper)
1. Install [Flipper](https://flipper.dev) & open the **Performance** plug‑in.  
2. Hit **Record**, scroll the list for 10 seconds, then stop.  
3. Export the graph PNG and drop it into `/screens`.  
4. Update the table above with your numbers.

---

## 🔍 What Was Optimized?
- **Stable `keyExtractor`** — no more index keys.  
- **Window tuning:** `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`.  
- **Throttled pagination** with `lodash.throttle`.  
- **`React.memo`** + fixed `ROW_HEIGHT` via `getItemLayout`.  
- **Lazy image loading** (`react-native-fast-image`).  
- **Optional:** Remove `removeClippedSubviews` when it hurts `onEndReached`.

_Want the full story?_ → [Read the Medium article →](https://medium.com/@onurcogalan_96763/react-native-flatlist-performansını-zirveye-çıkaracak-8-basit-i̇pucu-bc4992590814)

---

## 🤝 Contributing
Issues, pull requests, and ⭐ stars are welcome!

1. Fork → feature branch (`git checkout -b feat/your-tweak`)  
2. Commit w/ conventional message (`feat: add experimental windowSize`)  
3. PR against `main`.

---

## 🪪 License
MIT © 2025 Enver Onur Çoğalan
