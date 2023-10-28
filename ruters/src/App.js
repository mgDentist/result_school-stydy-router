import { Routes, Route, Link, NavLink, Outlet, useParams, useMatch } from 'react-router-dom';
import styles from './app.module.css';

const fetchContactList = () => [
  { id: 1, name: 'Office' },
  { id: 2, name: 'Storage' },
  { id: 3, name: 'Fabric' },
];

const fetchContact = (id) =>
({
  1: { id: 1, name: 'Office', address: 'tverskaya, 1', hours: '9-18' },
  2: { id: 2, name: 'Storage', address: 'Khimki, 245', hours: '10-17' },
  3: { id: 3, name: 'Fabric', address: 'Kislovodsk, 3a', hours: '24' },
}[id]);

const ExtendedLink = ({ to, children }) => (
  <NavLink to={to}>
    {
      ({ isActive }) => isActive ?
        <>
          <span>{children}</span>
          <span>-- you are here"</span>
        </>
        : children
    }
  </NavLink>
);

const MainPage = () => <div>Main Page</div>;

const AboutPage = () => <div>About Page</div>;

const ContactsPage = () => (
  <div>
    <h2>Contact Page</h2>
    <ul>
      {fetchContactList().map(({ id, name }) => (
        <li key={id}>
          <Link to={`contact/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
    <Outlet />
  </div>);

const ContactNotFound = () => <div>This contact doesn't exist</div>;

const Contact = () => {
  const params = useParams();
  const urlMatchData = useMatch('/contacts/:type/:id');
  console.log(urlMatchData);
  console.log(urlMatchData.params.type);

  const contact = fetchContact(params.id);

  if (!contact) {
    return <ContactNotFound />
  }

  const { name, address, hours } = contact;

  return (
    <div>
      <h3>{name}</h3>
      <p>{address}</p>
      <p>{hours}</p>
    </div>
  );
};

const NotFound404 = () => <div>Page not found</div>;


export const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h3>Menu</h3>
        <ul>
          <li><ExtendedLink to="/">Home</ExtendedLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contacts">Contacts</NavLink></li>
        </ul>
      </header>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contacts' element={<ContactsPage />}>
          <Route path='contact/:id' element={<Contact />} />
          <Route path='service/:id' element={<Contact />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
}
