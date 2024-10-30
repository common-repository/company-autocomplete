<?php

/**
 * Plugin Name:       Company Autocomplete by LEI Register
 * Description:       Company search autocomplete for WooCommerce using LEI data from GLEIF
 * Version:           1.0
 * Requires at least: 4.7
 * Requires PHP:      5.6
 * Author:            LEI Register
 * Author URI:        https://www.legalentityidentifier.co.uk/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       company-autocomplete
 */

defined('ABSPATH') or die('No script kiddies please!');


/**
 * Enqueue the script for the company autofill
 */
function company_autocomplete_scripts() {
  // Make sure that jQuery is also added
  wp_enqueue_script('jquery');
  // TODO: Add only for the checkout page
  wp_enqueue_script('company-autocomplete-js', plugin_dir_url(__FILE__) . 'js/company-autocomplete.js');
  wp_enqueue_style('company-autocomplete-css', plugin_dir_url(__FILE__) . 'css/company-autocomplete.css');
}
add_action('wp_enqueue_scripts', 'company_autocomplete_scripts');
