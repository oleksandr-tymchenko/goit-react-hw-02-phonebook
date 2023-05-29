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

  existedContact = ({ contacts }, values) => {
    contacts.find(contact => contact.name === values.name);
  };

  handleSubmit = (values, { resetForm }) => {
  
    const { contacts } = this.state;
    values.id = nanoid();

    if (this.existedContact({ contacts }, values)) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    this.setState(prewState => ({
      contacts: [...contacts, values],
    }));

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

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  // /----------------------
  componentDidMount() {
    console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('App componentUpdateMount');

    if (this.state.contacts !== prevState.contacts) {
      console.log('update contacts');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //  --------------------------------
  render() {
    // ------------------------
    console.log('App render');
    // ------------------------------
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

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
