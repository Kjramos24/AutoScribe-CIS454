"""This file scrapes the Google Scholar search engine to find scholarly articles, create citations, and
suggest related sources"""
from serpapi import GoogleSearch


# Define global variables
curr_topic = "The pyramids in Egypt"
api_key = "6696788fb28f43e1b60c14e4e37d1ae7311969d61b34a34c4b25ffca339442bf"


# This function makes a query request on Google Scholar and returns a JSON data object associated with it
def get_results(topic):
    # Set up the search parameters
    params = {
        "engine": "google_scholar",
        "q": f"{topic}",
        "api_key": f"{api_key}"
    }
    # Send the search request to SerpApi using the GoogleScholarResults class
    search = GoogleSearch(params)
    results = search.get_dict()
    return results


# This function returns the necessary information of every website found from the main search query
def get_main_sources_info(inputText):
    results = get_results(inputText)
    organic_results = results["organic_results"]
    page_results = []
    # Extract the titles, links, summaries, and IDs of the related articles
    for source_info in organic_results:
        title = source_info["title"]
        link = source_info["link"]
        summary = source_info["snippet"]
        result_id = source_info["result_id"]
        page_results.append((title, link, summary, result_id))
    return page_results


# This function returns the sources related to the main search topic (this can be used as a button)
def get_main_related_sources(results):
    related_searches = results["related_searches"]
    related_sources = []
    for search in related_searches:
        # Pair the query with the corresponding link
        related_sources.append((search["query"]))
    return related_sources

# This function returns related articles based on the URL of a previous article
def get_related_articles(url):
    # Set up the search parameters
    params = {
        "engine": "google_scholar",
        "api_key": f"{api_key}",
        "q": f"related:{url}",
    }
    # Send the search request to SerpApi using the GoogleScholarResults class
    search = GoogleSearch(params)
    results = search.get_dict()
    # Extract the titles, links, summaries, and IDs of the related articles
    related_articles = []
    for result in results["organic_results"]:
        title = result["title"]
        link = result["link"]
        summary = result["snippet"]
        result_id = result["result_id"]
        related_articles.append((title, link, summary, result_id))
    return related_articles

# This function returns the citations for a selected source
def get_source_citation(source_id):
    # Set up the search parameters
    params = {
        "engine": "google_scholar_cite",
        "q": f"{source_id}",
        "api_key": f"{api_key}"
    }
    # Send the search request to SerpApi using the GoogleScholarResults class
    search = GoogleSearch(params)
    results = search.get_dict()
    citations = results["citations"]
    # Array of different types of citation styles
    styles = ["APA", "MLA", "Vancouver", "Harvard", "Chicago"]
    # Citation options need to be displayed first before a user gets them
    final_citation = ""
    # Iterate through the available formats for this article
    for citation in citations:
        # If a format matches, return it (this will be updated later on for specifics)
        if citation["title"] in styles:
            final_citation = citation["snippet"]
    return final_citation


# if __name__ == "__main__":
#     # Get the data for the main query
#     curr_res = get_results(curr_topic, api_key)
#     # Get website information for the main query
#     main_sources_info = get_main_sources_info(curr_res)
#     print(f"These are the search results for \"{curr_topic}\":\n")
#     for source in main_sources_info:
#         print(f"    Title:   {source}.\n")
#         print(f"    Link:    {main_sources_info[source][0]}.\n")
#         print(f"    Summary: {main_sources_info[source][1]}.\n")
#         print("\n")
#     # Get sources related to the main query
#     main_related_sources = get_main_related_sources(curr_res)
#     print(f"These are some searches related to \"{curr_topic}\":\n")
#     for source in main_related_sources:
#         print(f"    Query:   {source}.\n")
#         print(f"    Link:    {main_related_sources[source]}.\n")
#         print("\n")
#     # Get the citation for the selected source
#     curr_citation = get_source_citation(main_sources_info, "Egypt in the Age of the Pyramids", api_key, "MLA")
#     print(curr_citation)
