# Life Task Manager

## Hot-reloading
This app is done with vanilla TS using an express server without any build tool like Vite.
We need 4 commands to for hot-reloading so it watch all the changes including the server.

The dist folders contains the final result.

- watch:ts is for compile from ts to js
- watch:html watches any change in the html files and with a shell script it
updates the html files in dist
- start:dev is for rerun the server
- browser-sync help us refresh the page automatically