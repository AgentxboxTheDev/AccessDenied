import http.server
import socketserver
import os

PORT = 4545
DIRECTORY = "/storage/emulated/0/AccessDenied"  # Change to your folder path

os.chdir(DIRECTORY)

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    print(f"Open your browser and go to http://localhost:{PORT}/matrix_rain.html")
    httpd.serve_forever()