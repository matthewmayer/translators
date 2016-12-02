{
	"translatorID": "77573f2e-de47-41cb-8de0-7739168771d2",
	"label": "Bangkok Post",
	"creator": "Matt Mayer",
	"target": "http://(?:www\\.)bangkokpost.com/news/",
	"minVersion": "1.0.0b4.r5",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "g",
	"lastUpdated": "2016-12-02 14:46:08"
}

function detectWeb(doc, url) {
	return "newspaperArticle";
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function parseDate(date) {
	// convert from "2 Dec 2016 at 15:33" to JS date
  // do we need to worry about timezones?
	var pieces = date.trim().split(" ");
	var day = parseInt(pieces[0]);
	var monthStr = pieces[1];
	var year = parseInt(pieces[2]);
	var hhmm = pieces[4];
	var hour = parseInt(hhmm.split(":")[0]);
	var minute = parseInt(hhmm.split(":")[1]);
	var arrayMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec");
	var month = arrayMonth.indexOf(monthStr);
	return new Date(year, month, day, hour , minute).toISOString();
}
function doWeb(doc, url) {
	var headline = ZU.xpathText(doc, '//h1[@itemprop="headline"]');
	var date = parseDate(ZU.xpathText(doc, '//span[@itemprop="datePublished"]')); 
	var author = ZU.xpathText(doc, '//a[starts-with(@href, "http://search.bangkokpost.com/search/result_advanced?category=news&columnistName=")]')
	if (author) {
		author=toTitleCase(author);
	}
	
	// create Zotero item
	var newArticle = new Zotero.Item("newspaperArticle");
	newArticle.title = headline;
	newArticle.publicationTitle = "Bangkok Post";
	newArticle.place = "Bangkok"
	if (author) {
		newArticle.creators.push(Zotero.Utilities.cleanAuthor(author, "author"));
	}
	if (date) {
		newArticle.date = date
	}
	// save Zotero item
	newArticle.complete();
}
