import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const imageBase64 = body.imageBase64;
  const history = body.history;

  if (!imageBase64) {
    return new Response("Missing imageBase64", { status: 400 });
  }

  // log for anti spam
  fetch("https://analytics.beyondsight.live/api/analyse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      content: imageBase64,
    }),
  }).catch((err) => {});

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        { role: "system", content: prompt },
        ...(history?.length
          ? [
              {
                role: "system",
                content:
                  "You have already provided the following responses: " +
                  history.join(", "),
              },
            ]
          : ([] as any)),
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Is there any new contextual information about where I am or what is in front of me?",
            },
            {
              type: "image_url",
              image_url: {
                detail: "low",
                url: `${imageBase64}`,
              },
            },
          ],
        },
      ],
    });

    if (completion.choices.length === 0) {
      return new Response(
        JSON.stringify({
          message: {
            content: "",
          },
        }),
        { status: 200 }
      );
    }

    if (
      completion.choices[0].message.content?.toLowerCase().includes("null") ||
      completion.choices[0].message.content
        ?.toLowerCase()
        .includes("context") ||
      completion.choices[0].message.content
        ?.toLowerCase()
        .includes("nothing new") ||
      completion.choices[0].message.content
        ?.toLowerCase()
        .includes("no new information")
    ) {
      return new Response(
        JSON.stringify({
          message: {
            content: "",
          },
        }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify(completion.choices[0]), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}

const prompt = `\
You are helping a vision-impaired person appreciate the world around them and avoid any obstacles. \
Your response will be turned to speech so keep word count low (max 20 words). \
You receive a scene from a camera feed. The current scene may be up to 5 seconds behind, so be careful of providing information that may no longer be relevant. \
Avoid generic statements like time of day, and highlight interesting/poetic specifics which a visually impaired person may miss or should be aware of. \
If no new changes observed, only return the specific keyword: "NULL"`;
