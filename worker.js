// Cloudflare Worker: জ্ঞানপথ চ্যাটবটের ব্যাকএন্ড (Google Gemini ব্যবহার করে)
// Secrets (Cloudflare-এ বসাতে হবে): GEMINI_API_KEY, ALLOWED_ORIGIN (যেমন https://gyanpath.netlify.app, শেষে / ছাড়া)
// Google AI Studio-তে বর্তমান বিনামূল্যের মডেলের নাম দেখে নিন; বদলালে নিচের MODEL পাল্টান।
const MODEL = "gemini-2.5-flash";
const SYSTEM = "তুমি ‘জ্ঞানপথ’ ওয়েবসাইটের বন্ধুসুলভ এআই সহকারী। সাইটটি গণিত, প্রযুক্তি ও শেখার কৌশল নিয়ে বাংলা ব্লগ; মালিক সোহরাব, গণিতে অনার্সের শিক্ষার্থী। ব্যবহারকারীর ভাষায় (সাধারণত বাংলায়) সংক্ষিপ্ত, স্পষ্ট ও সঠিক উত্তর দাও। গণিতের সমস্যায় ধাপে ধাপে বুঝিয়ে বলো। নিশ্চিত না হলে সেটা স্বীকার করো। চিকিৎসা, আইন বা আর্থিক বিষয়ে সতর্ক থেকো।";

export default {
  async fetch(req, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST" || req.headers.get("Origin") !== env.ALLOWED_ORIGIN) return json({ error: "forbidden" }, 403);

    let msgs;
    try { msgs = (await req.json()).messages; } catch { return json({ error: "bad request" }, 400); }
    if (!Array.isArray(msgs) || !msgs.length) return json({ error: "bad request" }, 400);
    const contents = msgs.slice(-10).map(m => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: String(m.text || "").slice(0, 1500) }],
    }));

    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: SYSTEM }] }, contents }),
    });
    if (!r.ok) return json({ error: "upstream" }, 502);
    const d = await r.json();
    const reply = d.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "দুঃখিত, উত্তর দিতে পারছি না।";
    return json({ reply });
  },
};
