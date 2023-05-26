import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';

// import { Formik, Form, Field, ErrorMessage } from 'formik';

import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

let updateContacts = [];
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = (values, { resetForm }) => {
    const id = nanoid();
    values.id = id;
    updateContacts.push(values);

    this.setState({ contacts: updateContacts });
    console.log(this.state.contacts);
    resetForm();
  };

  onSearchValue = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = contactId => {
    this.setState(prewState => ({
      contacts: prewState.contacts.filter(contact => contact.id !== contactId),
    }));
    // updateContacts = this.state.contacts;
    // console.log(updateContacts);
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div className="Container">
        <h1>Phonebook</h1>
        <ContactForm data={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onSearch={this.onSearchValue} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };

export default App;
