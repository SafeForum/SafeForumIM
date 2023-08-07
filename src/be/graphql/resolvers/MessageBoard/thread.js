const Comment = require("../../../models/MessageBoard/comment");
const Thread = require("../../../models/MessageBoard/thread");
const User = require("../../../models/user");
const MBoard = require("../../../models/MessageBoard/messageBoard");



module.exports = {
  getThreads: async (args, req) => {
    try {
      const findThread = await Thread.findById(args.threadId);
      if (!findThread) {
        throw new Error("Thread does not Exist");
      }
      return findThread;
    } catch (err) {
      throw err;
    }
  },
  addThread: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }
    //check if user exists
    try {
      const userExists = await User.findById(args.userId);
      if (!userExists) {
        throw new Error("user does not exist");
      }
    } catch (err) {
      throw err;
    }
    const thread = new Thread({
      creator: args.userId,
      subject: args.threadInput.subject,
      body: args.threadInput.body,
      messageBoard: args.messageBoardId,
    });
    let newThread;
    try {
      const messageBoard = await MBoard.findById(args.messageBoardId);
      if (!messageBoard) {
        throw new Error("City Portal does not exist!");
      }
      const result = await thread.save();
      newThread = await Thread.findById(result);
      console.log("This is the result: ", messageBoard);
      messageBoard.threads.push(newThread);
      messageBoard.save();
    } catch (err) {
      throw err;
    }
    return newThread;
  },

  deleteThread: async args => {
    try {
      const foundThread = await Thread.findById(args.threadId);
      if (!foundThread) {
        throw new Error("Thread not found!");
      }
      const messageBoard = await MBoard.findById(foundThread.messageBoard);
      if (!messageBoard) {
        throw new Error("Message Board not found!");
      }
      //check that the user deleting the thread is the same one who created it
      const isThreadAuthor = args.userId == foundThread.creator;
      if (!isThreadAuthor) {
        throw new Error("User attempting to delete the thread is not the author!");
      }
      try {
        const index = messageBoard.threads.indexOf(foundThread, 0);
        if (index !== -1) {
          throw new Error("Thread does not exist");
        }
        const x = messageBoard.threads.splice(index, 1);
        console.log("This just got deleted: ", x);
        messageBoard.save();
      } catch (error) {
        throw(error)
      }
      await Thread.deleteOne(foundThread)
      return foundThread;
    } catch (err) {
      throw err;
    }
  },
};


