import { z } from "zod"

const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY

export async function POST(req: Request) {
  // 验证请求体
  const json = await req.json()
  const result = z
    .object({
      model: z.string(),
      prompt: z.string(),
    })
    .safeParse(json)

  if (result.error) {
    return new Response(result.error.message, { status: 422 })
  }

  const { model, prompt } = result.data

  try {
    const response = await fetch('https://api.siliconflow.cn/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        prompt,
        seed: Math.floor(Math.random() * 9999999999) // 随机种子
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate image' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const runtime = "edge" 