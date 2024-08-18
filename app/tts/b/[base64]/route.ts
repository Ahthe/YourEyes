export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { base64: string } }
) {
  const base64 = params.base64.replace(".mp3", "");
  const text = atob(base64);

  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    return new Response("Deepgram API key not set.", { status: 500 });
  }

  const url = "https://api.deepgram.com/v1/speak?model=aura-orpheus-en";

  const data = JSON.stringify({
    text,
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    // replace complex grammar marks such as ;/ with commas
    body: data.replace(/;|\/|\\|`/g, ","),
  };

  const reqDeepgram = await fetch(url, options);

  if (reqDeepgram.status !== 200) {
    return new Response(`HTTP error! Status: ${reqDeepgram.status}`, {
      status: 500,
    });
  }

  return new Response(reqDeepgram.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=600 s-maxage=600",
      "CDN-Cache-Control": "public, max-age=31536000 s-maxage=31536000",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000 s-maxage=31536000",
    },
  });
}
