import Session from "../models/Session.js";
import Question from "../models/Question.js";

// @desc    Create a new session
// @route   POST /api/sessions/create
// @access  Private
export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;

    const session = new Session({});
    session.user = req.user._id;
    session.role = role;
    session.experience = experience;
    session.topicsToFocus = topicsToFocus;
    session.description = description;

    const createdSession = await session.save();

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: createdSession._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      }),
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session: createdSession });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get sessions of logged-in user
// @route   GET /api/sessions/my-sessions
// @access  Private
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get session by ID
// @route   GET /api/sessions/:id
// @access  Private
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: -1 } },
      })
      .exec();
    if (session) {
      return res.status(200).json(session);
    } else {
      return res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete session by ID
// @route   DELETE /api/sessions/:id
// @access  Private
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (session) {
      // check if the logged-in user is the owner of the session
      if (session.user.toString() !== req.user._id.toString()) {
        return res
          .status(401)
          .json({ message: "Not authorized to delete this session" });
      }
      // Also delete associated questions
      await Question.deleteMany({ session: session._id });
      //   then delete the session
      await session.deleteOne();

      res.status(200).json({ message: "Session deleted successfully" });
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
