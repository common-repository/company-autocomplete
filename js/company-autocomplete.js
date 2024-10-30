(function ($) {

  // Document has loaded
  $(document).ready(function () {

    // Free public API by GLEIF is used to directly fetch the LEI code data.
    // GLEIF LEI data terms of use can be found here:
    // https://www.gleif.org/en/meta/lei-data-terms-of-use/
    const gleifUrl = 'https://api.gleif.org/api/v1/';

    // Variables
    const leiAutocompleteUrl = gleifUrl + 'autocompletions?field=fulltext&q=';
    const leiDataUrl = gleifUrl + 'lei-records/';
    const typingMinCharacters = 4;
    const typingTimeoutMilliseconds = 400;
    const autofillClass = 'lei-company-autofill';

    // Checkout form wrapper
    const $ch = $('.checkout.woocommerce-checkout');

    // Classes and IDs to use for the data prefilling
    // You can change these selectors if you have custom fields on your site
    var fields = {
      'autofill': '#billing_company',
      'street': '#billing_address_1',
      'postcode': '#billing_postcode',
      'city': '#billing_city',
      'country': '#billing_country',
    };


    var typingTimeout = null;
    $(fields.autofill, $ch).keyup(function (e) {
      if ($(this).val().length >= typingMinCharacters) {

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(function () {
          leiAutocomplete(e.target.value);
        }, typingTimeoutMilliseconds);

      }
    });


    /**
     * Search for a list of companies by the keyword,
     * which can be a part the company name, registration number etc.
     */
    function leiAutocomplete(kewyword) {

      // Remove the previous autocomplete list just in case
      $('.lei-company-autofill').remove();

      // Get a list of companies matching the keywords
      $.getJSON(leiAutocompleteUrl + kewyword, function () { })
        .done(function (companyList) {

          if (companyList !== undefined && companyList.data !== undefined && companyList.data[0] !== undefined) {

            $(fields.autofill, $ch).after('<ul class="' + autofillClass + '"></ul>');

            for (var i = 0; i < companyList.data.length; i++) {
              if (companyList.data[i].relationships !== undefined) {
                $('.' + autofillClass, $ch).append('<li data-lei="' + companyList.data[i].relationships['lei-records'].data.id + '">' + companyList.data[i].attributes.value + '</li>');
              }
            }

            $('.' + autofillClass + ' li', $ch).click(function () {
              // Search for the company data with another search
              leiCompanySearchAndFill($(this).attr('data-lei'));
              $('.lei-company-autofill').remove();
            });
          }

        });

    }


    /**
     * Search for a company by the LEI code
     */
    function leiCompanySearchAndFill(leiCode) {

      // Do the API GET request to fetch the company data
      $.getJSON(leiDataUrl + leiCode, function () { })
        .done(function (leiData) {
          // Check that the data exists and is in the correct format
          if (leiData !== undefined && leiData.data !== undefined && leiData.data.attributes !== undefined && leiData.data.attributes.entity.legalAddress !== undefined) {

            var address = leiData.data.attributes.entity.legalAddress;

            // Fill the Comapany name to the search field
            if (leiData.data.attributes.entity.legalName.name !== undefined) {
              $(fields.autofill, $ch).val(leiData.data.attributes.entity.legalName.name);
            }

            // Street address
            if (address.addressLines !== undefined) {
              $(fields.street, $ch).val(address.addressLines.join(', '));
            }

            // Postal code
            if (address.postalCode !== undefined) {
              $(fields.postcode, $ch).val(address.postalCode);
            }

            // City
            if (address.city !== undefined) {
              $(fields.city, $ch).val(address.city);
            }

            // Country selection
            if (address.country !== undefined) {
              // The country value might also include other information like state, so get the first two characters
              var countryOption = $(fields.country, $ch).find('option[value="' + address.country.substr(0, 2) + '"]');
              // Check that the found country is in the list of supported countries
              if (countryOption.length > 0) {
                // Select the new value
                countryOption.prop('selected', true);
                // This is needed to refresh the selected option
                $(fields.country, $ch).trigger('change');
              }
            }

          }
        });
    }


  });

})(jQuery);
