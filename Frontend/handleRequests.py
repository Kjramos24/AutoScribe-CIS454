import json
import GoogleSearch
import sys

from http.server import BaseHTTPRequestHandler, HTTPServer
import cgi

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        length = int(self.headers['Content-length'])
        data = self.rfile.read(length).decode('utf-8')
        print(data) # Print the data to the console for testing
        self.wfile.write(b'Response from server')

server = HTTPServer(('localhost', 5500), RequestHandler)
server.serve_forever()

# This function receives HTTP requests and calls the appropriate function to process
def execute_function():
    # Read the JSON file from the HTTP request
    data = json.loads(sys.stdin.read())
    # Get the function and the arguments from the JSON object
    function_name = data["function_name"]
    args = data["args"]
    # Call the function
    curr_result = GoogleSearch.get_results(*args)
    print(json.dumps({'result': curr_result}))