=== Company Autocomplete by LEI Register ===
Contributors: leiregister
Donate link: https://www.legalentityidentifier.co.uk/
Tags: search, address, autocomplete, autofill, e-commerce, woocommerce, woo
Requires at least: 4.7
Tested up to: 5.6
Stable tag: 1.0
Requires PHP: 5.6
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Company search autocomplete for WooCommerce using LEI data from GLEIF. Provided by LEI Register.

== Description ==

Simply enabling this plugin will add autocomplete function to the company name field in your standard Woocommerce checkout form.
There are currently around **2 million companies** in the GLEIF database from all over the world, which are all searchable with this plugin.
Typing in the company name field will automatically trigger a search with AJAX to the free to use GLEIF public database ([GLEIF LEI data terms of use](https://www.gleif.org/en/meta/lei-data-terms-of-use/)).
It will then use this data to show a list of matching companies to the keywords.
When clicking on a specific company in the list, it will hide the list and prefill the correct data to the following fields:

* company name (completing the searchable field)
* address
* city
* postal code
* country

Some variables are currently editable by modifying the beginning of the plugin JS file. The variables include:

* Custom field selectors for custom woocommerce implementations
* Keyup delay when triggering the search
* Minimum keyword length

Currently there are no shown errors in case of no search results etc.
The idea is that the plugin is minimal and doesn't confuse the user in case there are no matches found for the inserted company name.

If you want to know more about LEI codes or help your customers obtain it, then we would recommend directing them to [https://www.leinumber.com/](https://www.leinumber.com/)

== Frequently Asked Questions ==

= What do I need to do? =

Simply enable the plugin in Wordpress

= Does it work if I don't have Woocommerce? =

If you're clever, you can edit field selectors in the plugins JS file to match with the selectors on your custom Wordpress form. There are plans to make these editable in the Wordpress admin.

= Why is it not working? How to debug? =

* Is the plugin enabled?
* Does the js/company-autocomplete.js appear in the site head where scripts are included?
* Check if there are any errors in the "console" tab in the web browser element inspector.
* Check if there are any faulty requests in the "network" tab in the web browser element inspector.
* Are there any PHP errors shown on the site or in the error log?
* GLEIF might be temporarily unavailable or you are being rate limited to 60 requests per minute (enforced by the GLEIF API).

== Screenshots ==

1. The user starts typing the company name and gets a list of matches.
2. The fields are automatically filled after the user has clicked on the correct company name.

== Changelog ==

= 1.0 =
* Functional plugin with the company data autocomplete using GLEIF data

== Upgrade Notice ==

= 1.0 =
Initial release