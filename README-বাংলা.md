# জ্ঞানপথ: ফ্রিতে প্রকাশের গাইড

ফাইল: `index.html` (সাইট), `posts.json` (আপনার লেখা), `worker.js` (চ্যাটবটের ব্যাকএন্ড)

## ধাপ ১: GitHub
1. github.com-এ বিনামূল্যে একাউন্ট খুলুন।
2. New repository বানান (নাম: gyanpath, Public)।
3. "uploading an existing file" চেপে `index.html` ও `posts.json` আপলোড করে Commit করুন। (`worker.js` এখানে লাগবে না।)

## ধাপ ২: Netlify (সাইট প্রকাশ)
1. netlify.com-এ GitHub দিয়ে লগইন করুন।
2. Add new site → Import an existing project → GitHub → আপনার gyanpath রিপো বেছে Deploy করুন।
3. Site settings → Change site name দিয়ে `gyanpath` (বা অন্য নাম) দিন। ঠিকানা হবে `https://gyanpath.netlify.app`।

## ধাপ ৩: Gemini API key (ফ্রি)
1. aistudio.google.com-এ গুগল একাউন্ট দিয়ে ঢুকে "Get API key" থেকে key নিন। এটি কাউকে দেখাবেন না।

## ধাপ ৪: Cloudflare Worker (চ্যাটবট ব্যাকএন্ড)
1. cloudflare.com-এ বিনামূল্যে একাউন্ট খুলুন → Workers & Pages → Create → Worker।
2. Edit code-এ `worker.js`-এর পুরো লেখা বসিয়ে Deploy করুন।
3. Settings → Variables and Secrets-এ দুটি যোগ করুন:
   - `GEMINI_API_KEY` = ধাপ ৩-এর key (Secret)
   - `ALLOWED_ORIGIN` = আপনার সাইটের ঠিকানা, শেষে `/` ছাড়া, যেমন `https://gyanpath.netlify.app`
4. Worker-এর ঠিকানাটি কপি করুন (যেমন `https://xxx.yourname.workers.dev`)।

## ধাপ ৫: চ্যাটবট চালু
1. GitHub-এ `index.html` খুলে পেনসিল (Edit) চাপুন।
2. `var WORKER_URL = "";` লাইনে ধাপ ৪-এর ঠিকানা বসান। Commit করুন।
3. কয়েক সেকেন্ডে Netlify নিজে সাইট হালনাগাদ করবে। এখন 💬 বাটন দেখা যাবে।

## নতুন লেখা দেওয়া (কোড না জেনেই)
1. GitHub-এ `posts.json` খুলে Edit চাপুন।
2. `[` চিহ্নের ঠিক পরে নতুন লেখা বসান (শেষে কমা দিন):
```
  {
    "title": "শিরোনাম",
    "cat": "গণিত",
    "date": "২৭ অক্টোবর ২০২৬",
    "body": "প্রথম অনুচ্ছেদ।\n\nদ্বিতীয় অনুচ্ছেদ।"
  },
```
3. Commit করুন। সাইট নিজে হালনাগাদ হবে। ফোনেও GitHub অ্যাপ বা ব্রাউজার থেকে করা যায়।

## মনে রাখবেন
- সবকিছুর নিয়ন্ত্রণ আপনার GitHub, Netlify ও Cloudflare একাউন্টে।
- বিনামূল্যের এআই-র দৈনিক সীমা আছে। বেশি দর্শক হলে চ্যাটবট মাঝে মাঝে "আবার চেষ্টা করুন" দেখাবে।
- API key শুধু Cloudflare-এ থাকবে, index.html-এ কখনো নয়।
- নিজের নামের ঠিকানা (gyanpath.com) পরে Netlify-তে ডোমেইন জুড়ে নিতে পারবেন, কিনতে হবে।
