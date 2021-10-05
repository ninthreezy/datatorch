/**
 * Abstraction of any type of article: either a discussion, question, or classified.
 * @property projectOwnerId: ID of who created it
 * @property createdAt: When it was first saved either as a draft or published post
 * @property isPublished: If false and also contains replacementID, this means it was published then modified.
 * @property content: Store slate js data here
 * @property projectId: Only populated when the discussion originates from within a project
 */
export interface Draft {
  draftID: string
  projectOwnerID: string
  projectID?: string
  isPublished: boolean
  readonly publishedAt?: Date
  replacementID?: string
  title?: string
  content?: string
  readonly createdAt: Date
  readonly lastSaved: Date
}

/**
 * The physical manifestation of a draft, shown after the draft is published
 */
export interface FeedPost {
  postID: string
  fromDraftID: string
  inPublication: string
  readonly createdAt: Date
  readonly lastActivity: Date
  comments?: number
  upvotes?: number
  downvotes?: number
}

export interface Discussion extends FeedPost {
  postType: 'discussion'
}
export interface Question extends FeedPost {
  postType: 'question'
}
export interface Classified extends FeedPost {
  postType: 'classified'
}

export interface DiscussionPageContext {
  currentPublication: string
  visiblePostTypes: Array<string>
  discussionFilter: 'activity' | 'created' | 'upvotes'
  discussionFilterDescending: boolean
}

const defaultContext: DiscussionPageContext = {
  currentPublication: 'all',
  visiblePostTypes: ['discussion', 'question', 'classified'],
  discussionFilter: 'activity',
  discussionFilterDescending: true
}

export const discussionContext = createContext(defaultContext)

export const useDiscussionContext = () => {
  return useContext(discussionContext)
}
