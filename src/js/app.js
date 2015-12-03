import React from 'react';
import { render } from 'react-dom';
import CustomersEditor from './components/CustomersEditor';

const outlet = document.getElementById('outlet');

if (outlet !== null) {
  const customersJSON = $.getJSON('json/customers.json');
  const customersGroupsJSON = $.getJSON('json/customers-groups.json');

  $.when(customersJSON, customersGroupsJSON).done(function() {
    const customers = customersJSON.responseJSON;
    const customersGroups = customersGroupsJSON.responseJSON;

    render(
      <CustomersEditor customers={customers} groups={customersGroups} />,
      outlet
    );
  });
}
