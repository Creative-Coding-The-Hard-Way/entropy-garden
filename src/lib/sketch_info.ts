/**
 * Metadata for a sketch, used to construct listings, links, and tag-based
 * collections.
 **/
export default interface SketchInfo {
  // The display name for the sketch.
  name: string;

  // Any tags to associate with this sketch.
  tags: string[];

  // A short (one-sentence) description for the sketch.
  description: string;

  // The date the sketch was authored.
  date: string;
}
