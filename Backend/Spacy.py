import spacy
import selenium

from spacy import displacy

nlp = spacy.load('en_core_web_lg')
text = input("Enter text here: ")
doc = nlp(text)
entities = doc.ents
print(entities)

# displacy.serve(doc, style="dep")
#displacy.serve(doc, style='ent', port=8654, host="127.0.0.1")


# This function gets the input text from the user and returns potential topics related to it
def get_topics():
    pass
