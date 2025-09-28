import api from '../helper/api.ts';
import { mrrAtK, precisionAtK, recallAtK, ndcgAtK } from '../helper/metrics.ts';
import fs from "fs"
import { fileURLToPath } from 'url';
import path from 'path';
import extractor from '../helper/extractor.ts';
import assert from 'node:assert/strict';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "..", "..", "eval", "queries.jsonl");
if (!fs.existsSync(filePath)) {
  throw new Error(`queries.jsonl not found at ${filePath}`);
}
const raw = fs.readFileSync(filePath, "utf-8");
const queries = raw.trim().split("\n").map(line => JSON.parse(line));

describe('Matrics Evaluation: ', async function () {
  this.timeout(600000)

  for (const item of queries) {
    it(`Query: "${item.q}"`, async () => {
      const res = await api.get_reccomendation_movies(item.q);
      const res_path = await api.generate_response_by_title(item.q, res);
      const titles = extractor.extractTitlesFromJson(res_path as string);
      const k = item.k ?? 10;
      
      // Empty-state expectation
      if (item.expect_empty) {
        console.log('// Empty-state expectation')
        assert.equal(titles.length, 0, `Expected empty result, but got ${titles.length} items.`);
        return;
      }

      // must_include → MRR
      if (item.must_include?.length) {
        const mrr = mrrAtK(titles, item.must_include, k);
        const min = item.min_mrr ?? 0.6;
        console.log('// must_include → MRR')
        assert.ok(mrr >= min, `Expected MRR to be at least ${min}, but got ${mrr}.`);
      }

      // should_include_any → Precision / Recall / NDCG
      if (item.should_include_any?.length) {
        const hits = titles.slice(0, k).map((t: string) =>
          item.should_include_any.some((r: any) => t.toLowerCase().includes(String(r).toLowerCase()))
        );
        const prec = precisionAtK(hits, Math.min(k, titles.length));
        const rec = recallAtK(titles, item.should_include_any);
        const ndcg = ndcgAtK(titles, item.should_include_any, k);

        const minP = item.min_precision ?? 0.3;
        const minR = item.min_recall ?? 0.0;
        const minN = item.min_ndcg ?? 0.5;

        console.log('// should_include_any → Precision / Recall / NDCG')
        assert.ok(prec >= minP, `Expected Precision to be at least ${minP}, but got ${prec}.`);
        assert.ok(rec >= minR, `Expected Recall to be at least ${minR}, but got ${rec}.`);
        assert.ok(ndcg >= minN, `Expected NDCG to be at least ${minN}, but got ${ndcg}.`);
      }

    })
  }
});