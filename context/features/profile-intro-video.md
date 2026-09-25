# Profile introduction video

**Implementation status:** Player and localized scripts are in place. The interaction becomes live when both generated MP4 files are added at the paths below.

## Recommendation snapshot (24 September 2026)

This comparison uses the vendors' published capabilities and plan pages. It is a feature-fit benchmark, not a blind, side-by-side render test; realism claims below come from the vendors.

| Tool | Fit for this intro | Trade-off |
| --- | --- | --- |
| **HeyGen Digital Twin with Avatar IV** | **Primary choice for likeness and movement.** The digital twin is built from your own video and aims to carry over body language, facial expressions, pauses, and delivery. Voice cloning and 175+ languages support separate Portuguese and English versions. Creator is listed at US$29 monthly or US$24/month billed annually, with 600 credits and 1080p export. | Requires reference footage and a separate consent video. The individual web workflow exports MP4; custom Digital Twin creation through HeyGen's API is limited to Enterprise, so do not build this site's playback around a generation API. [Avatar IV Digital Twin](https://help.heygen.com/en/articles/12089286-create-your-first-digital-twin-video-avatar-with-avatar-iv) · [Pricing](https://www.heygen.com/pricing) · [API limits](https://help.heygen.com/en/articles/10060327-heygen-api-pricing-explained) |
| **Captions AI Twin** | **Best alternate for creator-native UGC.** Captions says its twin uses a short recording to reproduce the creator's expressions, voice, and movement, and the workflow targets social-video formats. It says 10 seconds of source footage can be enough. The current Max plan is listed at US$24.99/month on its iOS pricing page. | That price is channel/region dependent, and the stated 10-second minimum is a vendor claim, not a guarantee of a convincing result. [AI Twin](https://captions.ai/features/create-ai-twin) · [Pricing](https://captions.ai/pricing) |
| **Synthesia Custom Studio Avatar** | Strong option when polished leadership video matters more than casual UGC. Synthesia identifies Studio as its highest-realism, highest-identity-consistency option and supports custom avatars built from a real person's filmed footage. | The Studio Avatar add-on is US$1,000/year and requires a professional or high-quality home filming setup. That cost and more formal presentation make it excessive for this short portfolio clip. [Avatar comparison](https://help.synthesia.io/en/articles/15197011-which-avatar-type-is-right-for-me) · [Studio creation](https://help.synthesia.io/en/articles/9680757-how-do-i-create-a-studio-express-1-avatar) |

**Selected workflow:** start with HeyGen Avatar IV Digital Twin for the best documented match to “make this look and move like me.” If its output feels too polished or presenter-like, compare the same scripts in Captions and pick the more conversational result. Review mouth sync, eye movement, pauses, voice accent, and hand/shoulder motion before publishing. The final judgment should come from the rendered samples; vendor feature pages cannot prove comparative realism.

## Important source-footage note

The AI can generate the final performance, but it needs a reference to look and sound like Maycon. For the highest likeness, use a short, one-take recording of Maycon and the platform's consent check. That recording is training/reference material, not the published intro. Starting from only the current profile image can animate a face, but it will not provide the same voice, cadence, and body-language reference.

## AI generation brief

- Make a short, single-take portfolio introduction in a casual creator/UGC style, as if Maycon is speaking directly to a visitor who just opened his portfolio.
- Portrait 9:16 framing, head and shoulders, camera at eye level, natural window light, a simple real-looking background, and natural skin texture.
- Preserve Maycon's likeness, Brazilian Portuguese accent, voice, and ordinary pauses. Use calm eye contact and small natural head and hand movements.
- Keep it warm and direct, not like an ad, training module, or corporate announcement. No b-roll, music, jump cuts, exaggerated gestures, beauty filter, artificial smile, or baked-in text/captions.
- Generate one native Brazilian Portuguese version and one English version with the same digital twin. Export each as a 1080p H.264 MP4.
- Keep the intro around 15 to 18 seconds. After export, put the files at `public/files/profile-intro-pt.mp4` and `public/files/profile-intro-en.mp4`. The website previews the matching locale silently on hover/focus and plays it with sound in the dialog after a click.

## Suggested scripts

**Português (Brasil)**

> Oi, eu sou o Maycon, product designer há oito anos. Trabalho com sites, aplicativos, SaaS e design systems, ajudando times a transformar problemas complexos em experiências mais claras. Já participei de projetos para empresas globais e startups. Fica à vontade para conhecer meu trabalho.

**English**

> Hi, I'm Maycon, a product designer with eight years of experience. I work across websites, apps, SaaS, and design systems, helping teams turn complex problems into clearer experiences. I've contributed to projects for global companies and startups. Take a look around.

The scripts stick to details already stated in the portfolio bio. Read them aloud once in the selected twin and shorten any phrase that sounds stiff before exporting.
