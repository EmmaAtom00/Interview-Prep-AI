import Question from "../models/Question.js";
import Session from "../models/Session.js";

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (
      !sessionId ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      })),
    );
    // Update session with new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    return res
      .status(201)
      .json({ message: "Questions added successfully", createdQuestions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// @desc pin or unpin a question
// @route POST /api/questions/:id/pin
// @access Private
export const togglePinQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    // const { isPinned } = req.body;
    // if (!isPinned)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "incomplete request" });

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(200).json({
      success: true,
      message: "Question pinned status updated",
      question,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// @desc update note for a question
// @route POST /api/questions/:id/note
// @access Private
export const updateQuestionNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.notes = note || "";
    await question.save();

    return res
      .status(200)
      .json({ success: true, message: "Question note updated", question });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
