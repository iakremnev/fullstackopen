sequenceDiagram
  participant browser
  participant server
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: 200 OK / HTML document
  deactivate server
  
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server-->>browser: 302 Found / Location: https://studies.cs.helsinki.fi/exampleapp/notes
  deactivate server 
  
  Note right of browser: The browser automatically redirects to the given location
  
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: 200 OK / HTML document
  deactivate server
