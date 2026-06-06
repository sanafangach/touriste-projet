const fs = require("fs");
const base = "C:/Users/yassine-oubrik/Desktop/mudux/touriste-projet/frontend";

for (let n = 1; n <= 7; n++) {
  const full = base + "/src/components/learn/darija/Mission" + n + ".jsx";
  let content = fs.readFileSync(full, "utf8");

  const t = `darija_${n}_`;
  const track = "${track}";

  // Fix regex-damaged vocab lines (missions 1,2,5,6,7)
  const rd = `<SaveVocabButton id={darija_${n}_<SaveVocabButton id={${track}_${n}_${"${word.darija}"}} word={word.darija}{word.darija}} word={word.darija}`;
  const cv = `<SaveVocabButton id={'${t}' + word.darija} word={word.darija}`;
  content = content.replaceAll(rd, cv);

  // Fix original broken vocab lines (word.darija)
  const bv = `<SaveVocabButton id={${track}_${n}_${"${word.darija}"}} word={word.darija}`;
  content = content.replaceAll(bv, cv);

  // Fix vocab lines with item.word (missions 3,4)
  const bi = `<SaveVocabButton id={${track}_${n}_${"${item.word}"}} word={item.word}`;
  const ci = `<SaveVocabButton id={'${t}' + item.word} word={item.word}`;
  content = content.replaceAll(bi, ci);

  // Fix expression lines
  const be = `<SaveVocabButton id={${track}_${n}_${"${exp.darija}"}} word={exp.darija}`;
  const ce = `<SaveVocabButton id={'${t}' + exp.darija} word={exp.darija}`;
  content = content.replaceAll(be, ce);

  fs.writeFileSync(full, content, "utf8");
  console.log("Fixed Mission" + n);
}
