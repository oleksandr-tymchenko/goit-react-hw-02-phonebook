import { nanoid } from 'nanoid';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        {
          /* const id = nanoid(); */
        }
        return (
          <li key={id}>
            <p>
              {name}: {number}
              <button onClick={() => onDeleteContact(id)}>Delete</button>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
