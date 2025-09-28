export function precisionAtK(hits: boolean[], k: number) {
  const n = Math.min(k, hits.length);
  if (n === 0) return 0;
  return hits.slice(0, n).filter(Boolean).length / n;
}

export function recallAtK(titles: string[], relevant: string[]) {
  if (!relevant?.length) return 0;
  const hit = relevant.filter(r =>
    titles.some(t => t.toLowerCase().includes(r.toLowerCase()))
  ).length;
  return hit / relevant.length;
}

export function mrrAtK(titles: string[], must: string[], k: number) {
  const n = Math.min(k, titles.length);
  for (let i = 0; i < n; i++) {
    if (must.some(m => titles[i].toLowerCase().includes(m.toLowerCase()))) {
      return 1 / (i + 1);
    }
  }
  return 0;
}

function dcg(rels: number[]) {
  return rels.reduce((acc, rel, i) => acc + (rel / Math.log2(i + 2)), 0);
}

export function ndcgAtK(titles: string[], relevant: string[], k: number) {
  if (!relevant?.length) return 0;
  const rels = titles.slice(0, k).map(t =>
    relevant.some(r => t.toLowerCase().includes(r.toLowerCase())) ? 1 : 0
  );
  const ideal = [...rels].sort((a, b) => b - a);
  const denom = dcg(ideal);
  return denom === 0 ? 0 : dcg(rels) / denom;
}
