# Menu Glitch Fixes - Shaking/Hanging Performance

## Symptoms
- Menu displays but browser shakes/hangs
- Likely: CSS animation thrashing + JS re-renders

## Fix Plan (check off as done)

### Phase 1: JS Optimization (menu.js)
- [ ] Debounce re-renders (search/filter)
- [ ] Fix pagination (remove recursion)
- [ ] Single render function
- [ ] Remove duplicate data

### Phase 2: CSS Perf (menu.css)
- [ ] Fixed img heights
- [ ] Simplify animations
- [ ] GPU optimizations

### Phase 3: Conflicts
- [ ] Disable theme.js menu code
- [ ] Add default image

### Phase 4: Test
- [ ] Smooth scrolling/search
- [ ] Lighthouse score >90

**Current: 0/10**
