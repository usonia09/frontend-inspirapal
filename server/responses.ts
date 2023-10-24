import { Post, User } from "./app";
import { CategoryDoc } from "./concepts/category";
import { CommentDoc } from "./concepts/comment";
import { ConnectSpaceDoc } from "./concepts/connectSpace";
import { AlreadyFriendsError, FriendNotFoundError, FriendRequestAlreadyExistsError, FriendRequestDoc, FriendRequestNotFoundError } from "./concepts/friend";
import { PostAuthorNotMatchError, PostDoc } from "./concepts/post";
import { ScheduleEventDoc } from "./concepts/scheduleEvent";
import { UpvoteDoc } from "./concepts/upvote";
import { Router } from "./framework/router";

/**
 * This class does useful conversions for the frontend.
 * For example, it converts a {@link PostDoc} into a more readable format for the frontend.
 */
export default class Responses {
  /**
   * Convert ConnectSpaceDoc into more readable format for frontend by converting organizer and
   * participants into usernames and making messages more readable.
   */
  static async connectSpace(connectSpace: ConnectSpaceDoc | null) {
    if (!connectSpace) {
      return connectSpace;
    }
    const organizer = await User.getUserById(connectSpace.organizer);
    const participants = await User.idsToUsernames(connectSpace.participants);
    const messages = await Post.getPostsByIds(connectSpace.messages);
    return { ...connectSpace, organizer: organizer.username, participants: participants, messages: messages };
  }

  /**
   *  Same as {@link connectSpace} but for an array of ConnectSpaceDoc for improved performance.
   */
  static async connectSpaces(spaces: ConnectSpaceDoc[]) {
    const organizers = await User.idsToUsernames(spaces.map((space) => space.organizer));
    const participants = spaces.map(async (space) => await User.idsToUsernames(space.participants));
    const messages = spaces.map(async (space) => await Post.getPostsByIds(space.messages));
    return spaces.map((space, i) => ({ ...space, organizer: organizers[i], participants: participants[i], messages: messages[i] }));
  }

  /**
   * Convert ScheduleDoc into more readable format for frontend by converting scheduler into username.
   */
  static async event(event: ScheduleEventDoc | null) {
    if (!event) {
      return event;
    }
    const scheduler = await User.getUserById(event.scheduler);
    return { ...event, scheduler: scheduler.username };
  }

  /**
   * Same as {@link event} but for an array of ScheduleEventDoc for improved performance.
   */
  static async events(events: ScheduleEventDoc[]) {
    const schedulers = await User.idsToUsernames(events.map((event) => event.scheduler));
    return events.map((event, i) => ({ ...event, scheduler: schedulers[i] }));
  }

  /**
   * Convert CommentDoc into more readable format for frontend by converting author into username.
   */
  static async comment(comment: CommentDoc | null) {
    if (!comment) {
      return comment;
    }
    const author = await User.getUserById(comment.author);
    return { ...comment, author: author.username };
  }

  /**
   * Same as {@link Comment} but for an array of CommentDoc for improved performance.
   */
  static async comments(comments: CommentDoc[]) {
    const authors = await User.idsToUsernames(comments.map((comment) => comment.author));
    return comments.map((comment, i) => ({ ...comment, author: authors[i] }));
  }

  /**
   * Convert an array of UpvoteDoc to upvoter usernames.
   */
  static async upvoters(upvotes: UpvoteDoc[]) {
    const upvoters = await User.idsToUsernames(upvotes.map((upvote) => upvote.upvoter));
    const upvote_ids = upvotes.map((upvote) => upvote._id);
    return upvoters.map((upvoter, i) => ({ upvoter, upvote_id: upvote_ids[i] }));
  }

  /**
   * Convert an array of CategoryDoc into category names and list of posts.
   */
  static async categories(categories: CategoryDoc[]) {
    const all_category_posts = categories.map((category) => category.items);
    const category_posts: PostDoc[][] = [];
    for (const posts_ids of all_category_posts) {
      const posts = await Post.getPostsByIds(posts_ids);
      category_posts.push(posts);
    }
    return categories.map((category, i) => ({ ...category, items: category_posts[i] }));
  }

  /**
   * Convert PostDoc into more readable format for the frontend by converting the author id into a username.
   */
  static async post(post: PostDoc | null) {
    if (!post) {
      return post;
    }
    const author = await User.getUserById(post.author);
    return { ...post, author: author.username };
  }

  /**
   * Same as {@link post} but for an array of PostDoc for improved performance.
   */
  static async posts(posts: PostDoc[]) {
    const authors = await User.idsToUsernames(posts.map((post) => post.author));
    return posts.map((post, i) => ({ ...post, author: authors[i] }));
  }

  /**
   * Convert FriendRequestDoc into more readable format for the frontend
   * by converting the ids into usernames.
   */
  static async friendRequests(requests: FriendRequestDoc[]) {
    const from = requests.map((request) => request.from);
    const to = requests.map((request) => request.to);
    const usernames = await User.idsToUsernames(from.concat(to));
    return requests.map((request, i) => ({ ...request, from: usernames[i], to: usernames[i + requests.length] }));
  }
}

Router.registerError(PostAuthorNotMatchError, async (e) => {
  const username = (await User.getUserById(e.author)).username;
  return e.formatWith(username, e._id);
});

Router.registerError(FriendRequestAlreadyExistsError, async (e) => {
  const [user1, user2] = await Promise.all([User.getUserById(e.from), User.getUserById(e.to)]);
  return e.formatWith(user1.username, user2.username);
});

Router.registerError(FriendNotFoundError, async (e) => {
  const [user1, user2] = await Promise.all([User.getUserById(e.user1), User.getUserById(e.user2)]);
  return e.formatWith(user1.username, user2.username);
});

Router.registerError(FriendRequestNotFoundError, async (e) => {
  const [user1, user2] = await Promise.all([User.getUserById(e.from), User.getUserById(e.to)]);
  return e.formatWith(user1.username, user2.username);
});

Router.registerError(AlreadyFriendsError, async (e) => {
  const [user1, user2] = await Promise.all([User.getUserById(e.user1), User.getUserById(e.user2)]);
  return e.formatWith(user1.username, user2.username);
});
