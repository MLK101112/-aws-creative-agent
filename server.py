"""
NovaChronicles - Local Development & Preview Server
Runs on Python 3 built-in http.server to serve the frontend web app on http://localhost:3000
"""

import http.server
import socketserver
import os
import webbrowser
import sys

PORT = 3000
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        print(f"[NovaChronicles Server] {args[0]} - {args[1]}")

def start_server():
    ports = [3001, 8080, 8000, 8888, 5000]
    httpd = None
    selected_port = None
    
    socketserver.TCPServer.allow_reuse_address = True
    
    for port in ports:
        try:
            httpd = socketserver.TCPServer(("", port), Handler)
            selected_port = port
            break
        except OSError:
            continue
            
    if not httpd:
        print("[ERROR] Could not find an open port.")
        sys.exit(1)
        
    os.chdir(DIRECTORY)
    url = f"http://localhost:{selected_port}"
    print("=" * 60)
    print(f"[*] NovaChronicles Web Studio running at: {url}")
    print(f"[*] Serving directory: {DIRECTORY}")
    print("[*] Press Ctrl+C to stop the server.")
    print("=" * 60)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down NovaChronicles server. Goodbye!")
        sys.exit(0)

if __name__ == "__main__":
    start_server()
