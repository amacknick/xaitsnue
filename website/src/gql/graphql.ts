/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A scalar that can represent any JSON value. */
  JSON: { input: any; output: any; }
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: { input: any; output: any; }
};

export type AnnotatedDoc = {
  __typename?: 'AnnotatedDoc';
  /** The audio recording resource for this entire document */
  audioRecording?: Maybe<AudioSlice>;
  /** When the document was bookmarked by the current user, if it was. */
  bookmarkedOn?: Maybe<Date>;
  /** Collection chapters that contain this document. */
  chapters?: Maybe<Array<CollectionChapter>>;
  /** Where the source document came from, maybe the name of a collection */
  collection?: Maybe<DocumentCollection>;
  /**
   * The people involved in producing this document, including the original
   * author, translators, and annotators
   */
  contributors: Array<Contributor>;
  /** Date and time this document was written or created */
  date?: Maybe<Date>;
  formCount: Scalars['Int']['output'];
  /**
   * All the words contained in this document, dropping structural formatting
   * like line and page breaks.
   */
  forms: Array<AnnotatedForm>;
  /** The genre of the document, used to group similar ones */
  genre?: Maybe<Scalars['String']['output']>;
  /** Official short identifier for this document */
  id: Scalars['UUID']['output'];
  /**
   * Is this document a reference source (unstructured list of words)?
   * Otherwise, it is considered a structured document with a translation.
   */
  isReference: Scalars['Boolean']['output'];
  /**
   * Arbitrary number used for manually ordering documents in a collection.
   * For collections without manual ordering, use zero here.
   */
  orderIndex: Scalars['Int']['output'];
  /** Images of each source document page, in order */
  pageImages?: Maybe<IiifImages>;
  /** URL-ready slug for this document, generated from the title */
  slug: Scalars['String']['output'];
  /** The original source(s) of this document, the most important first. */
  sources: Array<SourceAttribution>;
  /** Full title of the document */
  title: Scalars['String']['output'];
  /** Segments of the document paired with their respective rough translations */
  translatedPages?: Maybe<Array<DocumentPage>>;
  /**
   * All words in the document that have unanalyzed or unfamiliar parts.
   * These words need to be corrected or reviewed further.
   */
  unresolvedForms: Array<AnnotatedForm>;
};


export type AnnotatedDocFormsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * A single word in an annotated document.
 * One word contains several layers of interpretation, including the original
 * source text, multiple layers of linguistic annotation, and annotator notes.
 * TODO Split into two types, one for migration and one for SQL + GraphQL
 */
export type AnnotatedForm = {
  __typename?: 'AnnotatedForm';
  /** Further details about the annotation layers, including uncertainty */
  commentary?: Maybe<Scalars['String']['output']>;
  /** Get comments on this word */
  comments: Array<Comment>;
  /** The date and time this form was recorded */
  dateRecorded?: Maybe<Date>;
  /** The document that contains this word. */
  document?: Maybe<AnnotatedDoc>;
  /** Unique identifier of the containing document */
  documentId: Scalars['UUID']['output'];
  /**
   * A slices of audio associated with this word in the context of a document.
   * This audio has been selected by an editor from contributions, or is the
   * same as the ingested audio track, if one is available.
   */
  editedAudio: Array<AudioSlice>;
  /** English gloss for the whole word */
  englishGloss: Array<Scalars['String']['output']>;
  /** Unique identifier of this form */
  id: Scalars['UUID']['output'];
  /** Number of words preceding this one in the containing document */
  index: Scalars['Int']['output'];
  /** The audio for this word that was ingested from GoogleSheets, if there is any. */
  ingestedAudioTrack?: Maybe<AudioSlice>;
  /** The character index of a mid-word line break, if there is one */
  lineBreak?: Maybe<Scalars['Int']['output']>;
  /** A normalized version of the word */
  normalizedSource?: Maybe<Scalars['String']['output']>;
  /** The character index of a mid-word page break, if there is one */
  pageBreak?: Maybe<Scalars['Int']['output']>;
  /** Underlying phonemic representation of this word */
  phonemic?: Maybe<Scalars['String']['output']>;
  /** Position of the form within the context of its parent document */
  position: PositionInDocument;
  romanizedSource?: Maybe<Scalars['String']['output']>;
  /**
   * The root morpheme of the word.
   * For example, a verb form glossed as "he catches" might have a root morpheme
   * corresponding to "catch."
   */
  root?: Maybe<WordSegment>;
  segments: Array<WordSegment>;
  /** All other observed words with the same root morpheme as this word. */
  similarForms: Array<AnnotatedForm>;
  /** Original source text */
  source: Scalars['String']['output'];
  /**
   * Audio for this word that has been recorded by community members. Will be
   * empty if user does not have access to uncurated contributions.
   * TODO! User guard for contributors only
   */
  userContributedAudio: Array<AudioSlice>;
};


/**
 * A single word in an annotated document.
 * One word contains several layers of interpretation, including the original
 * source text, multiple layers of linguistic annotation, and annotator notes.
 * TODO Split into two types, one for migration and one for SQL + GraphQL
 */
export type AnnotatedFormRomanizedSourceArgs = {
  system: CherokeeOrthography;
};


/**
 * A single word in an annotated document.
 * One word contains several layers of interpretation, including the original
 * source text, multiple layers of linguistic annotation, and annotator notes.
 * TODO Split into two types, one for migration and one for SQL + GraphQL
 */
export type AnnotatedFormSegmentsArgs = {
  system: CherokeeOrthography;
};

/**
 * A single word in an annotated document that can be edited.
 * All fields except id are optional.
 */
export type AnnotatedFormUpdate = {
  /** Possible update to commentary */
  commentary?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the form */
  id: Scalars['UUID']['input'];
  /** Updated segments */
  segments?: InputMaybe<Array<MorphemeSegmentUpdate>>;
  /** Possible update to source content */
  source?: InputMaybe<Scalars['String']['input']>;
};

/** Element within a spreadsheet before being transformed into a full document. */
export type AnnotatedSeg = AnnotatedForm | LineBreak;

/** Request to attach user-recorded audio to a word */
export type AttachAudioToWordInput = {
  /**
   * A URL to a Cloudfront-proxied user-recorded pronunciation of a word.
   * A new resource will be created to represent the recording if one does not exist already
   */
  contributorAudioUrl: Scalars['String']['input'];
  /** Word to bind audio to */
  wordId: Scalars['UUID']['input'];
};

/**
 * A segment of audio representing a document, word, phrase,
 * or other audio unit
 */
export type AudioSlice = {
  __typename?: 'AudioSlice';
  /** Last Editor to decide if audio should be included in edited collection. */
  editedBy?: Maybe<User>;
  /** The time (in seconds) in the parent track where this slice ends. */
  endTime?: Maybe<Scalars['Int']['output']>;
  /** True if audio should be shown to Readers. */
  includeInEditedCollection: Scalars['Boolean']['output'];
  /** This slice's relative position to other slices within an audio resource */
  index: Scalars['Int']['output'];
  /** An audio slice this slice is a subunit of, if there is one */
  parentTrack?: Maybe<Scalars['String']['output']>;
  /** When the track was recorded, if available */
  recordedAt?: Maybe<Date>;
  /** Which user recorded the tracked, if uploaded by a user */
  recordedBy?: Maybe<User>;
  /** The audio resource this audio slice is taken from, generally pulled from the DRS API */
  resourceUrl: Scalars['String']['output'];
  /** The unique id for this audio slice. Will not be present if audio has not been inserted */
  sliceId?: Maybe<Scalars['String']['output']>;
  /** The time (in seconds) in the parent track where this slice begins. */
  startTime?: Maybe<Scalars['Int']['output']>;
};

/**
 * One representation of Cherokee phonology.
 * There are several different writing systems for Cherokee phonology and we
 * want to convert between them.
 * This type enumerates all of the systems that we support and provides
 * conversion from our internal orthography into any of these.
 */
export enum CherokeeOrthography {
  /**
   * The d/t system for transcribing the Cherokee syllabary.
   * This orthography is favored by speakers.
   * TODO Option for /ts/ instead of /j/
   * TODO Option for /qu/ instead of /gw/ or /kw/
   */
  Crg = 'CRG',
  /**
   * Simplified system that uses d/t without tones, a compromise intended for
   * language learners. qu and ts
   */
  Learner = 'LEARNER',
  /**
   * The t/th system for transcribing the Cherokee syllabary.
   * This orthography is favored by linguists as it is segmentally more accurate.
   */
  Taoc = 'TAOC'
}

/** Structure to represent a single chapter. Used to send data to the front end. */
export type CollectionChapter = {
  __typename?: 'CollectionChapter';
  /** Breadcrumbs from the top-level archive down to where this document lives. */
  breadcrumbs: Array<DocumentCollection>;
  document?: Maybe<AnnotatedDoc>;
  /** UUID for the chapter */
  id: Scalars['UUID']['output'];
  /** Order within the parent chapter or collection */
  indexInParent: Scalars['Int']['output'];
  /** Full path of the chapter */
  path: Array<Scalars['String']['output']>;
  /** Whether the chapter is an "Intro" or "Body" chapter */
  section: CollectionSection;
  slug: Scalars['String']['output'];
  /** Full title of the chapter */
  title: Scalars['String']['output'];
  /** ID of WordPress page with text of the chapter */
  wordpressId?: Maybe<Scalars['Int']['output']>;
};

/** Enum to represent the sections in an edited collection */
export enum CollectionSection {
  /** Body chapter */
  Body = 'BODY',
  /** Credit */
  Credit = 'CREDIT',
  /** Intro chapter */
  Intro = 'INTRO'
}

/** A comment a user has made on some piece of a document. */
export type Comment = {
  __typename?: 'Comment';
  /** An optional classification of the comment's content */
  commentType?: Maybe<CommentType>;
  /** Unique identifier of this comment */
  id: Scalars['UUID']['output'];
  /** When the comment was posted */
  postedAt: DateTime;
  /** Who posted the comment */
  postedBy: User;
  /** The text of the comment */
  textContent: Scalars['String']['output'];
};

/** Type representing the object that a comment is attached to */
export type CommentParent = AnnotatedForm | DocumentParagraph;

/** An enum listing the possible types that a comment could be attached to */
export enum CommentParentType {
  /** A comment attached to a paragraph */
  Paragraph = 'PARAGRAPH',
  /** A comment attached to a word */
  Word = 'WORD'
}

/** A type describing the kind of comment being made */
export enum CommentType {
  /** A comment asking a question about our information regarding the parent object */
  Question = 'QUESTION',
  /** A comment sharing a story or similar information related to the parent object */
  Story = 'STORY',
  /** A comment with a suggestion to improve the information shown about the parent object */
  Suggestion = 'SUGGESTION'
}

/**
 * A block of content, which may be one of several types.
 * Each page contains several blocks.
 *
 * This type is intended to enable a custom page builder on the front-end for
 * content editors.
 */
export type ContentBlock = Gallery | Markdown;

/**
 * An individual or organization that contributed to the creation or analysis
 * of a particular document or source. Each contributor has a name and a role
 * that specifies the type of their contributions.
 */
export type Contributor = {
  __typename?: 'Contributor';
  details?: Maybe<ContributorDetails>;
  /** Full name of the contributor */
  name: Scalars['String']['output'];
  /** The role that defines most of their contributions to the associated item */
  role: Scalars['String']['output'];
};

/**
 * Basic personal details of an individual contributor, which can be retrieved
 * from a particular instance of [`Contributor`].
 *
 * They may have transcribed a handwritten manuscript, translated it into
 * English, or analyzed it for linguistic information.
 * This information can be used to track who contributed to the development of
 * each individual document, and track contributions to the archive as a whole.
 */
export type ContributorDetails = {
  __typename?: 'ContributorDetails';
  /**
   * Alternate name of this person, may be in a different language or writing
   * system. Used only for descriptive purposes.
   */
  alternateName?: Maybe<Scalars['String']['output']>;
  /** The optional date that this contributor was born on. */
  birthDate?: Maybe<Date>;
  /**
   * Full name of this person, this exact string must be used to identify
   * them elsewhere, like in the attribution for a particular document.
   */
  fullName: Scalars['String']['output'];
};

/** Request to update if a piece of audio should be included in an edited collection */
export type CurateWordAudioInput = {
  /** Audio to include/exclude */
  audioSliceId: Scalars['UUID']['input'];
  /** New value */
  includeInEditedCollection: Scalars['Boolean']['input'];
  /** Word audio is attached to */
  wordId: Scalars['UUID']['input'];
};

export type Date = {
  __typename?: 'Date';
  /** The day of this date */
  day: Scalars['Int']['output'];
  /** Formatted version of the date for humans to read */
  formattedDate: Scalars['String']['output'];
  /** The month of this date */
  month: Scalars['Int']['output'];
  /** The year of this date */
  year: Scalars['Int']['output'];
};

export type DateInput = {
  day: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type DateTime = {
  __typename?: 'DateTime';
  /** Just the Date component of this DateTime, useful for user-facing display */
  date: Date;
  /** UNIX timestamp of the datetime, useful for sorting */
  timestamp: Scalars['Int']['output'];
};

/** Input object for deleting an existing comment */
export type DeleteCommentInput = {
  /** ID of the comment to delete */
  commentId: Scalars['UUID']['input'];
};

/** Delete a contributor attribution for a document based on the two ids */
export type DeleteContributorAttribution = {
  contributorId: Scalars['UUID']['input'];
  documentId: Scalars['UUID']['input'];
};

export type DocumentCollection = {
  __typename?: 'DocumentCollection';
  /**
   * All documents that are part of this collection
   * TODO Try to unify this return type into AnnotatedDoc
   * This probably requires adding a document_ids field so that we can just
   * pass that to the dataloader below.
   */
  documents: Array<DocumentReference>;
  /** Full name of this collection */
  name: Scalars['String']['output'];
  /** URL-ready slug for this collection, generated from the name */
  slug: Scalars['String']['output'];
};

/**
 * Used for updating document metadata.
 * All fields except id are optional.
 */
export type DocumentMetadataUpdate = {
  id: Scalars['UUID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  writtenAt?: InputMaybe<DateInput>;
};

export type DocumentPage = {
  __typename?: 'DocumentPage';
  /** Scan of this page as a IIIF resource, if there is one */
  image?: Maybe<PageImage>;
  /** One-indexed page number */
  pageNumber: Scalars['String']['output'];
  /** Contents of this page as a list of paragraphs */
  paragraphs: Array<DocumentParagraph>;
};

/** One paragraph within a [`DocumentPage`] */
export type DocumentParagraph = {
  __typename?: 'DocumentParagraph';
  /** Get comments on this paragraph */
  comments: Array<Comment>;
  /** Unique identifier for this paragraph */
  id: Scalars['UUID']['output'];
  /** 1-indexed position of this paragraph in a document */
  index: Scalars['Int']['output'];
  /** Source text of the paragraph broken down into words */
  source: Array<AnnotatedSeg>;
  /** English translation of the whole paragraph */
  translation: Scalars['String']['output'];
};

/**
 * Reference to a document with a limited subset of fields, namely no contents
 * of the document.
 */
export type DocumentReference = {
  __typename?: 'DocumentReference';
  /** Date the document was produced (or `None` if unknown) */
  date?: Maybe<Date>;
  /** Database ID for the document */
  id: Scalars['UUID']['output'];
  /** Index of the document within its group, used purely for ordering */
  orderIndex: Scalars['Int']['output'];
  /** Unique short name */
  shortName: Scalars['String']['output'];
  /** URL slug for this document */
  slug: Scalars['String']['output'];
  /** Long title of the document */
  title: Scalars['String']['output'];
};

/**
 * The kind of a document in terms of what body it lives within. A reference
 * document is a dictionary or grammar for example, while a corpus document
 * might be a letter, journal, or notice.
 */
export enum DocumentType {
  /** Corpus text: a letter, journal, book, story, meeting minutes, etc. */
  Corpus = 'CORPUS',
  /** Reference document, like a dictionary or grammar */
  Reference = 'REFERENCE'
}

/**
 * Structure to represent an edited collection. Missing certain fields and chapters in it.
 * Used for sending data to the front end
 */
export type EditedCollection = {
  __typename?: 'EditedCollection';
  chapters?: Maybe<Array<CollectionChapter>>;
  /** UUID for the collection */
  id: Scalars['UUID']['output'];
  /** URL slug for the collection, like "cwkw" */
  slug: Scalars['String']['output'];
  /** Full title of the collection */
  title: Scalars['String']['output'];
  /** ID of WordPress menu for navigating the collection */
  wordpressMenuId?: Maybe<Scalars['Int']['output']>;
};

export type FormsInTime = {
  __typename?: 'FormsInTime';
  end?: Maybe<Date>;
  forms: Array<AnnotatedForm>;
  start?: Maybe<Date>;
};

/** A gallery of images, which may be rendered as a slideshow or lightbox. */
export type Gallery = {
  __typename?: 'Gallery';
  mediaUrls: Array<Scalars['String']['output']>;
};

/**
 * A rectangle slice of something, usually a large document image.
 *
 * Units are a percentage of the containing document.
 * This is more useful than pixels because we can more easily compare
 * geometries between images of different resolutions. For example, we could identify
 * all items in any bottom-right corner with Geometry(90%, 90%, 100%, 100%).
 * Physical units would be better, but IIIF only allows pixels and percentages.
 *
 * Potential use case:
 * Each document is represented by an ordered list of [AnnotatedForm]s. Each
 * form has some geometry on the source image. There are a bunch of other
 * annotations on the source image that are unordered. These may be specific
 * syllabary characters, notes about the handwriting, etc. Using MongoDB
 * comparison queries, we can request a list of all spatial annotations
 * on the same document that lie within or around the geometry of this specific word.
 */
export type Geometry = {
  __typename?: 'Geometry';
  xMax: Scalars['Float']['output'];
  xMin: Scalars['Float']['output'];
  yMax: Scalars['Float']['output'];
  yMin: Scalars['Float']['output'];
};

export type IiifImages = {
  __typename?: 'IiifImages';
  /** Information about the data source for this set of images */
  source: ImageSource;
  /** List of urls for all the images in this collection */
  urls: Array<Scalars['String']['output']>;
};

export type ImageSource = {
  __typename?: 'ImageSource';
  /** Base URL for the IIIF server */
  url: Scalars['String']['output'];
};

/** Start of a new line */
export type LineBreak = {
  __typename?: 'LineBreak';
  /**
   * Index of this line break within the document. i.e. Indicates the start
   * of line X.
   */
  index: Scalars['Int']['output'];
};

/** A block of prose content, formatted with [Markdown](https://commonmark.org/). */
export type Markdown = {
  __typename?: 'Markdown';
  content: Scalars['String']['output'];
};

/** One particular morpheme and all the known words that contain that exact morpheme. */
export type MorphemeReference = {
  __typename?: 'MorphemeReference';
  /** List of words that contain this morpheme. */
  forms: Array<AnnotatedForm>;
  /** Phonemic shape of the morpheme. */
  morpheme: Scalars['String']['output'];
};

/** A single unit of meaning and its gloss which can be edited. */
export type MorphemeSegmentUpdate = {
  /** Target language representation of this segment. */
  gloss: Scalars['String']['input'];
  /** Source language representation of this segment. */
  morpheme: Scalars['String']['input'];
  /**
   * This field determines what character should separate this segment from
   * the next one when reconstituting the full segmentation string.
   */
  role: WordSegmentRole;
  /** Which Cherokee representation system is this segment written with? */
  system?: InputMaybe<CherokeeOrthography>;
};

/** A concrete representation of a particular functional morpheme. */
export type MorphemeTag = {
  __typename?: 'MorphemeTag';
  /**
   * A prose description of what this morpheme means and how it works in
   * context.
   */
  definition: Scalars['String']['output'];
  /** URL to an external page with more details about this morpheme. */
  detailsUrl?: Maybe<Scalars['String']['output']>;
  /**
   * Internal representation of this functional item, which may be one or
   * more word parts in the raw annotation. For example, ["X", "Y"] could map
   * to "Z" in a particular display format.
   */
  internalTags: Array<Scalars['String']['output']>;
  /**
   * What kind of morpheme is this? Examples are "Prepronominal Prefix" or
   * "Aspectual Suffix"
   */
  morphemeType: Scalars['String']['output'];
  /** Overrides the segment type of instances of this tag. */
  roleOverride?: Maybe<WordSegmentRole>;
  /** How this morpheme looks in original language data */
  shape?: Maybe<Scalars['String']['output']>;
  /** How this morpheme is represented in a gloss */
  tag: Scalars['String']['output'];
  /** Plain English title of the morpheme tag */
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a bookmark to the user's list of bookmarks. */
  addBookmark: AnnotatedDoc;
  /**
   * Mutation must have at least one visible field for introspection to work
   * correctly, so we just provide an API version which might be useful in
   * the future.
   */
  apiVersion: Scalars['String']['output'];
  /**
   * Attach audio that has already been uploaded to S3 to a particular word
   * Assumes user requesting mutation recoreded the audio
   */
  attachAudioToWord: AnnotatedForm;
  /** Decide if a piece audio should be included in edited collection */
  curateWordAudio: AnnotatedForm;
  /**
   * Delete a comment.
   * Will fail if the user making the request is not the poster.
   */
  deleteComment: CommentParent;
  /** Mutation for deleting contributor attributions */
  deleteContributorAttribution: Scalars['UUID']['output'];
  /** Post a new comment on a given object */
  postComment: CommentParent;
  /** Removes a bookmark from a user's list of bookmarks */
  removeBookmark: AnnotatedDoc;
  updateAnnotation: Scalars['Boolean']['output'];
  /** Mutation for adding/changing contributor attributions */
  updateContributorAttribution: Scalars['UUID']['output'];
  updateDocumentMetadata: Scalars['UUID']['output'];
  updatePage: Scalars['Boolean']['output'];
  /** Mutation for paragraph and translation editing */
  updateParagraph: DocumentParagraph;
  updateWord: AnnotatedForm;
};


export type MutationAddBookmarkArgs = {
  documentId: Scalars['UUID']['input'];
};


export type MutationAttachAudioToWordArgs = {
  input: AttachAudioToWordInput;
};


export type MutationCurateWordAudioArgs = {
  input: CurateWordAudioInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteContributorAttributionArgs = {
  contribution: DeleteContributorAttribution;
};


export type MutationPostCommentArgs = {
  input: PostCommentInput;
};


export type MutationRemoveBookmarkArgs = {
  documentId: Scalars['UUID']['input'];
};


export type MutationUpdateAnnotationArgs = {
  data: Scalars['JSON']['input'];
};


export type MutationUpdateContributorAttributionArgs = {
  contribution: UpdateContributorAttribution;
};


export type MutationUpdateDocumentMetadataArgs = {
  document: DocumentMetadataUpdate;
};


export type MutationUpdatePageArgs = {
  data: Scalars['JSON']['input'];
};


export type MutationUpdateParagraphArgs = {
  paragraph: ParagraphUpdate;
};


export type MutationUpdateWordArgs = {
  word: AnnotatedFormUpdate;
};

/**
 * A website page which lives at a specific URL and has a list of blocks that
 * define its content.
 */
export type Page = {
  __typename?: 'Page';
  body: Array<ContentBlock>;
  /**
   * The path that this page lives at, which also uniquely identifies it.
   * For example, "/our-team"
   */
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type PageImage = {
  __typename?: 'PageImage';
  /** The IIIF source this page image comes from */
  source: ImageSource;
  /** The full IIIF url for this image resource */
  url: Scalars['String']['output'];
};

/** A paragraph in an annotated document that can be edited. */
export type ParagraphUpdate = {
  /** Unique identifier of the form */
  id: Scalars['UUID']['input'];
  /** English translation of the paragraph */
  translation?: InputMaybe<Scalars['String']['input']>;
};

/** The reference position within a document of one specific form */
export type PositionInDocument = {
  __typename?: 'PositionInDocument';
  /** What document is this item within? */
  documentId: Scalars['UUID']['output'];
  /** What section of the document image corresponds to this item? */
  geometry?: Maybe<Geometry>;
  iiifUrl?: Maybe<Scalars['String']['output']>;
  /**
   * How many items come before this one in the whole document?
   *
   * 1-indexed position indicating where the form sits in the ordering of all
   * forms in the document. Used for relative ordering of forms from the
   * same document.
   */
  index: Scalars['Int']['output'];
  /**
   * Index reference for this position, more specific than `page_reference`.
   * Generally used in corpus documents where there are few pages containing
   * many forms each. Example: "WJ23:#21"
   */
  indexReference: Scalars['String']['output'];
  /** What page is it on (starting from 1)? May be a single page or range of pages. */
  pageNumber: Scalars['String']['output'];
  /**
   * Standard page reference for this position, which can be used in citation.
   * Generally formatted like ID:PAGE, i.e "DF2018:55"
   */
  pageReference: Scalars['String']['output'];
};

/** Input object for posting a new comment on some object */
export type PostCommentInput = {
  /** A classifcation for the comment (optional) */
  commentType?: InputMaybe<CommentType>;
  /** ID of the object that is being commented on */
  parentId: Scalars['UUID']['input'];
  /** Type of the object being commented on */
  parentType: CommentParentType;
  /** Content of the comment */
  textContent: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** List of all the document collections available. */
  allCollections: Array<DocumentCollection>;
  /** Listing of all documents excluding their contents by default */
  allDocuments: Array<AnnotatedDoc>;
  allEditedCollections: Array<EditedCollection>;
  /** List of all content pages */
  allPages: Array<Page>;
  /** List of all the functional morpheme tags available */
  allTags: Array<MorphemeTag>;
  /** Retrieves all documents that are bookmarked by the current user. */
  bookmarkedDocuments: Array<AnnotatedDoc>;
  /** Retrieves a chapter and its contents by its collection and chapter slug. */
  chapter?: Maybe<CollectionChapter>;
  collection: DocumentCollection;
  /** Retrieves a full document from its unique name. */
  document?: Maybe<AnnotatedDoc>;
  /** Retrieves a full document from its unique identifier. */
  documentByUuid?: Maybe<AnnotatedDoc>;
  editedCollection?: Maybe<EditedCollection>;
  /**
   * Retrieve information for the morpheme that corresponds to the given tag
   * string. For example, "3PL.B" is the standard string referring to a 3rd
   * person plural prefix.
   */
  morphemeTag?: Maybe<MorphemeTag>;
  /** Forms containing the given morpheme gloss or related ones clustered over time. */
  morphemeTimeClusters: Array<FormsInTime>;
  /**
   * Lists all words containing a morpheme with the given gloss.
   * Groups these words by the document containing them.
   */
  morphemesByDocument: Array<WordsInDocument>;
  /**
   * Lists all forms containing a morpheme with the given gloss.
   * Groups these words by the phonemic shape of the target morpheme.
   */
  morphemesByShape: Array<MorphemeReference>;
  /** Retrieves a full document from its unique identifier. */
  page?: Maybe<Page>;
  /** Get a single paragraph given the paragraph ID */
  paragraphById: DocumentParagraph;
  /**
   * Search for words with the exact same syllabary string, or with very
   * similar looking characters.
   */
  syllabarySearch: Array<AnnotatedForm>;
  /** Basic information about the currently authenticated user, if any. */
  userInfo?: Maybe<UserInfo>;
  /** Get a single word given the word ID */
  wordById: AnnotatedForm;
  /**
   * Search for words that match any one of the given queries.
   * Each query may match against multiple fields of a word.
   */
  wordSearch: Array<AnnotatedForm>;
};


export type QueryAllTagsArgs = {
  system: CherokeeOrthography;
};


export type QueryChapterArgs = {
  chapterSlug: Scalars['String']['input'];
  collectionSlug: Scalars['String']['input'];
};


export type QueryCollectionArgs = {
  slug: Scalars['String']['input'];
};


export type QueryDocumentArgs = {
  slug: Scalars['String']['input'];
};


export type QueryDocumentByUuidArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryEditedCollectionArgs = {
  slug: Scalars['String']['input'];
};


export type QueryMorphemeTagArgs = {
  id: Scalars['String']['input'];
  system: CherokeeOrthography;
};


export type QueryMorphemeTimeClustersArgs = {
  clusterYears?: Scalars['Int']['input'];
  gloss: Scalars['String']['input'];
};


export type QueryMorphemesByDocumentArgs = {
  documentId?: InputMaybe<Scalars['UUID']['input']>;
  morphemeGloss: Scalars['String']['input'];
};


export type QueryMorphemesByShapeArgs = {
  compareBy?: InputMaybe<CherokeeOrthography>;
  gloss: Scalars['String']['input'];
};


export type QueryPageArgs = {
  id: Scalars['String']['input'];
};


export type QueryParagraphByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QuerySyllabarySearchArgs = {
  query: Scalars['String']['input'];
};


export type QueryWordByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryWordSearchArgs = {
  query: Scalars['String']['input'];
};

/**
 * Attribution for a particular source, whether an institution or an individual.
 * Most commonly, this will represent the details of a library or archive that
 * houses documents used elsewhere.
 */
export type SourceAttribution = {
  __typename?: 'SourceAttribution';
  /** URL of this source's homepage, i.e. "https://www.newberry.org/" */
  link: Scalars['String']['output'];
  /** Name of the source, i.e. "The Newberry Library" */
  name: Scalars['String']['output'];
};

/** Update the contributor attribution for a document */
export type UpdateContributorAttribution = {
  contributionRole: Scalars['String']['input'];
  contributorId: Scalars['UUID']['input'];
  documentId: Scalars['UUID']['input'];
};

/** A user record, for a contributor, editor, etc. */
export type User = {
  __typename?: 'User';
  /** User-facing name for this contributor/curator */
  displayName: Scalars['String']['output'];
  /** Id of the user, which must be a AWS Cognito `sub` claim */
  id: Scalars['String']['output'];
};

/** A user belongs to any number of user groups, which give them various permissions. */
export enum UserGroup {
  Contributors = 'CONTRIBUTORS',
  Editors = 'EDITORS'
}

/** Auth metadata on the user making the current request. */
export type UserInfo = {
  __typename?: 'UserInfo';
  email: Scalars['String']['output'];
  groups: Array<UserGroup>;
  /** Unique ID for the User. Should be an AWS Cognito Sub. */
  id: Scalars['UUID']['output'];
};

export type WordSegment = {
  __typename?: 'WordSegment';
  /** English gloss in standard DAILP format that refers to a lexical item */
  gloss: Scalars['String']['output'];
  /**
   * If this morpheme represents a functional tag that we have further
   * information on, this is the corresponding database entry.
   */
  matchingTag?: Maybe<MorphemeTag>;
  /** Phonemic representation of the morpheme */
  morpheme: Scalars['String']['output'];
  /**
   * This field determines what character should separate this segment from
   * the previous one when reconstituting the full segmentation string.
   */
  previousSeparator: Scalars['String']['output'];
  /** What kind of thing is this segment? */
  role: WordSegmentRole;
};

/**
 * The kind of segment that a particular sequence of characters in a morphemic
 * segmentations represent.
 */
export enum WordSegmentRole {
  /** Separated by an equals sign '=' */
  Clitic = 'CLITIC',
  /** Separated by a colon ':' */
  Modifier = 'MODIFIER',
  /** Separated by a hyphen '-' */
  Morpheme = 'MORPHEME'
}

/** A list of words grouped by the document that contains them. */
export type WordsInDocument = {
  __typename?: 'WordsInDocument';
  /** Unique identifier of the containing document */
  documentId?: Maybe<Scalars['UUID']['output']>;
  /** What kind of document contains these words (e.g. manuscript vs dictionary) */
  documentType?: Maybe<DocumentType>;
  /** List of annotated and potentially segmented forms */
  forms: Array<AnnotatedForm>;
};
