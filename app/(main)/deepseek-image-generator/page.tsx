"use client";

import { useScrollTo } from "@/hooks/use-scroll-to";
import { CheckIcon } from "@heroicons/react/16/solid";
import { ArrowLongRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import * as Select from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import LoadingDots from "@/components/loading-dots";

let models = [
  {
    label: "Janus-Pro-7B",
    value: "deepseek-ai/Janus-Pro-7B",
  }
];

// 添加示例提示词
const examplePrompts = [
  "The ancient battlefield, thousands of troops and horses to fight, the situation is very fierce, countless casualties",
  "In the style of Makoto Shinkai, operating a holographic screen with both hands, wearing high-tech AR light-emitting gaming glasses with side lenses, within a traditional Chinese room, is a young man in his twenties, a handsome fellow, clad in a gray robe adorned with patterns, with long purple hair. This is a high-quality, animated style with a Chinese ancient flair, featuring meticulous details, at 32k resolution, animated style, Chinese ancient style, at 8k resolution, ultra-high definition.",
  "Chinese style, metallic hues, 3D jade carving, scrolls suspended in mid-air, inscribed with ancient text, poets standing atop the scrolls, background landscape painting, exquisite, vibrant colors, Chinese ancient minimalism, macro perspective, 3D, OC rendering, surreal details, fantasy, high resolution, ultra-high definition.",
  "a beautiful girl with flowers and a bottle of perfume, in the style of art nouveau-inspired illustrations, dark gold and sky-blue, michael martchenko, naoko takeuchi, dark cyan and red, patricia polacco, colorful dreams"
];

export default function ImageGenerator() {
  let [status, setStatus] = useState<"initial" | "generating" | "generated">("initial");
  let [prompt, setPrompt] = useState("");
  let [model, setModel] = useState(models[0].value);
  let [generatedImage, setGeneratedImage] = useState("");
  let [ref, scrollTo] = useScrollTo();

  let loading = status === "generating";

  // 添加点击示例提示词的处理函数
  const handleExampleClick = (prompt: string) => {
    setPrompt(prompt);
  };

  async function generateImage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (status !== "initial") {
      scrollTo({ delay: 0.5 });
    }

    setStatus("generating");
    setGeneratedImage("");

    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      
      // 假设 API 返回的图片 URL 在 data.images[0] 中
      if (data.images?.[0]) {
        setGeneratedImage(data.images[0].url);
        setStatus("generated");
      } else {
        throw new Error("No image generated");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      // 这里你可能想要添加错误处理的 UI 反馈
      setStatus("initial");
    }
  }

  return (
    <main className="mt-12 flex w-full flex-1 flex-col items-center px-4 text-center sm:mt-1">
      <a
        className="mb-4 inline-flex h-7 shrink-0 items-center gap-[9px] rounded-[50px] border-[0.5px] border-solid border-[#E6E6E6] bg-[rgba(234,238,255,0.65)] bg-gray-100 px-7 py-5 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
        href="https://api-docs.deepseek.com/"
        target="_blank"
      >
        <span className="text-center">
          Powered by <span className="font-medium">DeepSeek Janus-Pro</span>
        </span>
      </a>
      <h1 className="my-6 max-w-3xl text-4xl font-bold text-gray-800 sm:text-6xl">
        DeepSeek <span className="text-blue-600">Image</span>
        <br /> Generator <span className="text-blue-600">(Free)</span>
      </h1>

      <form className="w-full max-w-xl" onSubmit={generateImage}>
        <fieldset disabled={loading} className="disabled:opacity-75">
          <div className="relative mt-5">
            <div className="absolute -inset-2 rounded-[32px] bg-gray-300/50" />
            <div className="relative flex rounded-3xl bg-white shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <textarea
                  rows={3}
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  name="prompt"
                  className="w-full resize-none rounded-l-3xl bg-transparent px-6 py-5 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  placeholder="A beautiful sunset over mountains..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-3xl px-3 py-2 text-sm font-semibold text-blue-500 hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 disabled:text-gray-900"
              >
                {loading ? (
                  <LoadingDots color="black" style="large" />
                ) : (
                  <ArrowLongRightIcon className="-ml-0.5 size-6" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center justify-between gap-3 sm:justify-center">
              <p className="text-gray-500 sm:text-xs">Model:</p>
              <Select.Root
                name="model"
                disabled={loading}
                value={model}
                onValueChange={(value) => setModel(value)}
              >
                <Select.Trigger className="group flex w-60 max-w-xs items-center rounded-2xl border-[6px] border-gray-300 bg-white px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
                  <Select.Value />
                  <Select.Icon className="ml-auto">
                    <ChevronDownIcon className="size-6 text-gray-300 group-focus-visible:text-gray-500 group-enabled:group-hover:text-gray-500" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden rounded-md bg-white shadow-lg">
                    <Select.Viewport className="p-2">
                      {models.map((model) => (
                        <Select.Item
                          key={model.value}
                          value={model.value}
                          className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none"
                        >
                          <Select.ItemText asChild>
                            <span className="inline-flex items-center gap-2 text-gray-500">
                              <div className="size-2 rounded-full bg-green-500" />
                              {model.label}
                            </span>
                          </Select.ItemText>
                          <Select.ItemIndicator className="ml-auto">
                            <CheckIcon className="size-5 text-blue-600" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </fieldset>
      </form>

      <hr className="border-1 mb-20 h-px bg-gray-700 dark:bg-gray-700" />

      {status !== "initial" && (
        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: "auto",
            overflow: "hidden",
            transitionEnd: { overflow: "visible" },
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          className="w-full pb-[25vh] pt-1"
          onAnimationComplete={() => scrollTo()}
          ref={ref}
        >
          <div className="relative mt-8 w-full overflow-hidden">
            {generatedImage && (
              <img
                src={generatedImage}
                alt="Generated image"
                className="mx-auto rounded-lg shadow-lg"
              />
            )}

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.85,
                    delay: 0.5,
                  }}
                  className="absolute inset-0 flex items-center justify-center rounded-lg border border-gray-400 bg-gradient-to-br from-gray-100 to-gray-300"
                >
                  <p className="animate-pulse text-3xl font-bold">
                    Generating your image...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
      <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">Try these examples:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {examplePrompts.map((examplePrompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(examplePrompt)}
                className="p-4 text-left text-sm border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
              >
                {examplePrompt}
              </button>
            ))}
          </div>
        </div>

      {/* 介绍和FAQ部分 */}
      <div className="w-full max-w-4xl mx-auto mt-20 px-4 text-left">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            About DeepSeek Image Generator (100% Free)
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            DeepSeek Image Generator is a <span className="font-semibold">completely free</span> AI-powered tool that transforms your text descriptions into stunning visual creations. Using DeepSeek&apos;s cutting-edge image generation technology, this free tool creates high-quality images from your prompts.
          </p>
          <p className="text-lg text-gray-600">
            Experience the power of DeepSeek Image Generator at no cost - create anything from artistic concepts to realistic visualizations, all completely <span className="font-semibold">free of charge</span>.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            DeepSeek Image Generator FAQ
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                What is DeepSeek Image Generator?
              </h3>
              <p className="text-gray-600">
                DeepSeek Image Generator is a <span className="font-semibold">free</span> AI tool that creates images from text descriptions. It uses DeepSeek&apos;s advanced AI models to generate high-quality, creative images based on your prompts.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                Is DeepSeek Image Generator really free?
              </h3>
              <p className="text-gray-600">
                Yes! DeepSeek Image Generator is completely free to use. You can generate as many images as you want without any cost or subscription fees.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                What types of images can DeepSeek generate?
              </h3>
              <p className="text-gray-600">
                DeepSeek Image Generator can create a wide variety of images, including artistic illustrations, realistic scenes, abstract concepts, and more. The free tool supports diverse styles and subjects.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                How good is the image quality?
              </h3>
              <p className="text-gray-600">
                The free DeepSeek Image Generator produces high-resolution, detailed images. Our advanced AI models ensure professional-quality results for every generation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 