"""This file finds the most significant phrases from the input text."""
import spacy
from collections import Counter

nlp = spacy.load("en_core_web_sm")


# This function checks if a noun chunk is significant by excluding filler words
def is_significant(noun_chunk):
    # Do not take words such as "the", "and", "a", etc., no punctuation marks, and ensure words are larger than 2 chars
    return (not noun_chunk.root.is_stop and
            not noun_chunk.root.is_punct and
            len(noun_chunk.text) > 2 and
            not any(token.pos_ == 'ADP' for token in noun_chunk))


# This function extracts the significant phrases from the input text
def extract_significant_phrases(text):
    # Make the text an NLP-iterable object
    doc = nlp(text)
    noun_chunks = list(doc.noun_chunks)
    significant_phrases = []
    # Iterate from the noun chunks since they are the most significant in a sentence
    for chunk in noun_chunks:
        # Ensure the chunk is significant first
        if is_significant(chunk):
            # Remove any unwanted words from the chunk such as determinants and pronouns
            chunk_text = ' '.join(token.text for token in chunk if token.pos_ not in ['DET', 'PRON'])
            significant_phrases.append(chunk_text.lower())
    # Return the 5 most significant phrases
    return Counter(significant_phrases).most_common(5)


# This function returns the terms used to surf the web
def get_search_terms(text):
    # Extract important phrases
    significant_terms = extract_significant_phrases(text)
    web_terms = ""
    # Put all terms together
    if significant_terms:
        for term, _ in significant_terms:
            web_terms += str(term) + " "
    # Remove trailing space
    web_terms = web_terms.strip()
    return web_terms
