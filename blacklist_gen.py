import requests
from bs4 import BeautifulSoup
import json

def get_links():
	site = requests.get("http://www.tblop.com/")
	soup = BeautifulSoup(site.content)
	links = []
	for link in soup.find_all('a'):
		l = link.get('href')
		if "?" in l:
			l  = l.split("?")[0]
		links.append(l[:-1])
	parsed = json.dumps(links);
	return parsed

if __name__ == "__main__":
	print "var blacklist = " + get_links()
