import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';

// import { Formik, Form, Field, ErrorMessage } from 'formik';

import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container, Title1, Title2 } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = (values, { resetForm }) => {
    const { contacts } = this.state;
    values.id = nanoid();

    if (contacts.find(contact => contact.name === values.name)) {
      alert(`${values.name} is already in contacts`);
    } else {
      this.setState(prewState => ({
        contacts: [...contacts, values],
      }));
    }

    resetForm();
  };

  onSearchValue = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = contactId => {
    this.setState(prewState => ({
      contacts: prewState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Container>
        <Title1>Phonebook</Title1>
        <ContactForm data={this.handleSubmit} />
        <Title2>Contacts</Title2>
        <Filter value={filter} onSearch={this.onSearchValue} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
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
