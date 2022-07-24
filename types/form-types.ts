export interface FormState {
  id: string;
  address: string;
  radius: string;
  keywords: string;
}

export type PlaceArray = PlaceObject[]

export interface PlaceObject {
  description: string
  matched_substrings: MatchedSubstring[]
  place_id: string
  reference: string
  structured_formatting: StructuredFormatting
  terms: Term[]
  types: string[]
}

export interface MatchedSubstring {
  length: number
  offset: number
}

export interface StructuredFormatting {
  main_text: string
  main_text_matched_substrings: MainTextMatchedSubstring[]
  secondary_text: string
}

export interface MainTextMatchedSubstring {
  length: number
  offset: number
}

export interface Term {
  offset: number
  value: string
}

