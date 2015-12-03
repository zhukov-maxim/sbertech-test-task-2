import React from 'react';
import classNames from 'classnames';

const CustomersEditor = React.createClass({
  displayName: 'CustomersEditor',

  propTypes: {
    customers: React.PropTypes.arrayOf(React.PropTypes.object),
    groups: React.PropTypes.arrayOf(React.PropTypes.object)
  },

  getInitialState: function() {
    return {
      expandedCustomerId: null,
      selectedCustomersIds: []
    };
  },

  handleToggleAll: function() {
    const areAllCustomersSelected =
      this.props.customers.length === this.state.selectedCustomersIds.length;

    if (areAllCustomersSelected) {
      this.setState({
        selectedCustomersIds: []
      });
    } else {
      const allCustomersIds = this.props.customers.map((element) =>
        parseInt(element.id, 10)
      );

      this.setState({
        selectedCustomersIds: allCustomersIds
      });
    }
  },

  handleToggleOne: function(id, event) {
    event.stopPropagation();

    const currentId = parseInt(id, 10);
    let selectedCustomersIds = this.state.selectedCustomersIds.slice();

    if (this.isSelected(id)) {
      selectedCustomersIds.splice(selectedCustomersIds.indexOf(currentId), 1);
    } else {
      selectedCustomersIds.push(currentId);
    }

    this.setState({
      selectedCustomersIds: selectedCustomersIds
    });
  },

  handleExpand: function(id) {
    this.setState({
      expandedCustomerId: id
    });
  },

  handleCollapse: function(event) {
    event.stopPropagation();

    this.setState({
      expandedCustomerId: null
    });
  },

  renderControlsBar: function() {
    const areAllCustomersSelected =
      this.props.customers.length === this.state.selectedCustomersIds.length;

    return (
      <div className='b-controls-bar'>
        <div className='b-page-wrapper'>
          <form className='b-controls-bar__form'>
            <div className='b-controls-bar__main'>
              <input
                className='b-controls-bar__toggle-all'
                type='checkbox'
                checked={areAllCustomersSelected}
                onChange={this.handleToggleAll}
              />
              <button className='b-btn b-btn_add' type='button'>
                Создать плательщика
              </button>
            </div>
            <input
              className='b-controls-bar__search'
              placeholder='Поиск'
              type='text'
            />
          </form>
        </div>
      </div>
    );
  },

  renderHeader: function() {
    return (
      <div className='b-customers__header'>
        <div className='b-customers__column b-customers__column_customer'>
          Плательщик
        </div>
        <div className='b-customers__column b-customers__column_email'>
          Электронная почта
        </div>
        <div className='b-customers__column b-customers__column_phone'>
          Телефон
        </div>
        <div className='b-customers__column b-customers__column_groups'>
          Группы
        </div>
      </div>
    );
  },

  renderCustomerControls: function() {
    return (
      <div className='b-customers__item-controls'>
        <button
          className='b-btn b-btn_edit b-customers__button'
          type='button'
        >
          Редактировать
        </button>
        <button
          className='b-btn b-btn_delete b-customers__button'
          type='button'
        >
          Удалить
        </button>
        <button
          className='b-btn b-btn_groups b-customers__button'
          type='button'
        >
          Группы
        </button>
      </div>
    );
  },

  renderCloseButton: function() {
    return (
      <div
        className='b-btn b-btn_close b-customers__item-close'
        onClick={this.handleCollapse}
      >
      </div>
    );
  },

  renderAddress: function(address) {
    return (
      <div className='b-customers__item-field'>
        <span className='b-customers__item-field-name'>Адрес: </span>
        {address}
      </div>
    );
  },

  renderTin: function(tin) {
    return (
      <div className='b-customers__item-field'>
        <span className='b-customers__item-field-name'>ИНН </span>
        {tin}
      </div>
    );
  },

  findGroupTitle: function(id) {
    return this.props.groups.find(element => element.id === id).title;
  },

  isSelected: function(id) {
    const index = this.state.selectedCustomersIds.findIndex(element =>
      element === parseInt(id)
    );

    if (index === -1) {
      return false;
    }

    return true;
  },

  renderCustomer: function(item) {
    const groupIndexes = item.groups;
    let groupTitlesList = '';

    if (groupIndexes) {
      const groupTitles = groupIndexes.map(this.findGroupTitle);
      groupTitlesList = groupTitles.join(', ');
    }

    const isExpanded = this.state.expandedCustomerId === item.id;
    const isChecked = this.isSelected(item.id);

    const classList = classNames({
      'b-customers__item': true,
      'b-customers__item_expanded': isExpanded
    });

    return (
      <div
        className={classList}
        key={item.id}
        onClick={this.handleExpand.bind(this, item.id)}
      >
        <div className='b-customers__column b-customers__column_checkbox'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={this.handleToggleOne.bind(this, item.id)}
          />
        </div>
        <div className='b-customers__column b-customers__column_customer'>
          {item.lastname} {item.firstname} {item.middlename}
          {isExpanded && item.address ? this.renderAddress(item.address) : null}
        </div>
        <div className='b-customers__column b-customers__column_email'>
          <span className='b-customers__item-email'>
            {item.email}
          </span>
          {isExpanded && item.tin ? this.renderTin(item.tin) : null}
        </div>
        <div className='b-customers__column b-customers__column_phone'>
          {item.phone}
        </div>
        <div className='b-customers__column b-customers__column_groups'>
          {groupTitlesList}
        </div>
        {isExpanded ? this.renderCustomerControls() : null}
        {isExpanded ? this.renderCloseButton() : null}
      </div>
    );
  },

  render: function() {
    return (
      <div className='b-customers-editor'>
        {this.renderControlsBar()}
        <div className='b-customers'>
          <div className='b-page-wrapper'>
            {this.renderHeader()}
            <div className='b-customers__content'>
              {this.props.customers.map(this.renderCustomer)}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default CustomersEditor;
