
export interface SignDetail {
  word: string;
  description: string;
  handshape: string;
  movement: string;
  location: string;
  tips: string[];
  youtubeId?: string;
}

export interface SearchResult {
  word: string;
  category?: string;
}
