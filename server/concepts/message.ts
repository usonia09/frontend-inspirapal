import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface MessageDoc extends BaseDoc {
  author: ObjectId;
  content: string;
}

export default class MessageConcept {
  public readonly messages = new DocCollection<MessageDoc>("messages");

  async createMessage(author: ObjectId, content: string) {
    const _id = await this.messages.createOne({ author, content });
    return { msg: "Message successfully created!", id: _id, message: await this.messages.readOne({ _id }) };
  }

  async getMessagesByIds(ids: ObjectId[]) {
    const messages: MessageDoc[] = [];
    for (const id of ids) {
      const message = await this.getMessageById(id);
      if (message) {
        messages.push(message);
      }
    }
    return messages;
  }

  async getMessages(query: Filter<MessageDoc>) {
    const messages = await this.messages.readMany(query, {
      sort: { dateUpdated: -1 },
    });
    return messages;
  }

  async isAuthor(user: ObjectId, _id: ObjectId) {
    const message = await this.messages.readOne({ _id });
    if (!message) {
      throw new NotFoundError(`Message ${_id} does not exist!`);
    }
    if (message.author.toString() !== user.toString()) {
      throw new MessageAuthorNotMatchError(user, _id);
    }
  }

  async getMessageById(_id: ObjectId) {
    return await this.messages.readOne({ _id });
  }

  async getMessagebyIds(ids: ObjectId[]) {
    const messages: MessageDoc[] = [];
    for (const id of ids) {
      const message = await this.getMessageById(id);
      if (message) {
        messages.push(message);
      }
    }
    return messages;
  }

  async update(_id: ObjectId, update: Partial<MessageDoc>) {
    this.sanitizeUpdate(update);
    await this.messages.updateOne({ _id }, update);
    return { msg: "Message successfully updated!" };
  }

  async delete(_id: ObjectId) {
    await this.messages.deleteOne({ _id });
    return { msg: "Message deleted successfully!" };
  }

  private sanitizeUpdate(update: Partial<MessageDoc>) {
    // Make sure the update cannot change the author.
    for (const key in update) {
      if (key !== "content") {
        throw new NotAllowedError(`Cannot update '${key}' field!`);
      }
    }
  }
}

export class MessageAuthorNotMatchError extends NotAllowedError {
  constructor(
    public readonly author: ObjectId,
    public readonly _id: ObjectId,
  ) {
    super("{0} is not the author of message {1}!", author, _id);
  }
}
