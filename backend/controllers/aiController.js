import { GoogleGenAI } from "@google/genai";
import {
  conceptExplanationPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";

let ai;

const getAI = () => {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("Gemini API key missing");
    ai = new GoogleGenAI({ apiKey: key });
  }
  return ai;
};

// @desc   Generate interview questions and answers using Gemini
// @route  POST /api/ai/generate-interview-questions
// @access Private
export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    );

    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let rawText = response.text;

    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/^```$/, "") // remove ending ```
      .trim(); // remove extra spaces

    //   Now safe to parse
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    let aiMessage = "AI error";

    // Case 1: Gemini error object
    if (error?.error?.message) {
      aiMessage = error.error.message;
    }

    // Case 2: Gemini stringified JSON error
    else if (typeof error?.message === "string") {
      try {
        const parsed = JSON.parse(error.message);
        aiMessage = parsed?.error?.message || error.message;
      } catch {
        aiMessage = error.message;
      }
    }

    const statusCode = error?.status === 429 ? 429 : 500;

    // console.error("AI ERROR:", {
    //   status: statusCode,
    //   message: aiMessage,
    // });

    return res.status(statusCode).json({
      message: aiMessage,
    });
  }
};

// @desc    Generate concept explanation
// @route   POST /api/ai/generate-concept-explanation
// @access  Private
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplanationPrompt(question);

    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let rawText = response.text;

    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/^```$/, "") // remove ending ```
      .trim(); // remove extra spaces

    //   Now safe to parse
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to generate questions", error: error.message });
  }
};
