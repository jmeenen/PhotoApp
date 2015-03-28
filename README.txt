The part of my solution that is reusable is the PhotoSearch.js javascript file/class.  This class takes three parameters - an ID for a form field containing
the search substring (or any value to search by), an ID for a DOM object to receive HTML from the server, and a URL to use for the HTTP GET method.  A user
can use any form field to contain the query value (substring in this case), can specify any DOM element on the document to alter, and can specify any URL
of the application to determine which controller method to invoke for the search.  An example of a different application of this would be if you wanted to
display comments that contain the search term "on the fly" instead of photos.