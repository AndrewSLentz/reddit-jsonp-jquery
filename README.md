This website is an example of loading JSON data from an outside source and displaying  
it on my own page using JSONP.  
The problem with JSONP is it presents a security risk if either the site serving it is  
malicious, or if you are using http rather than https and someone instigates a man in  
the middle attack. In these cases, whatever scripts are returned by your request are run  
and can do whatever a local script could.
